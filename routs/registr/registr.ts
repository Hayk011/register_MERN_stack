import { Router, Request, Response } from "express";
import User, { IUser } from "../../models/user";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const routr = Router();

// registration

routr.post("/register", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(15)
      .required(),
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
  });
  Joi.validate(req.body, schema, (err: Joi.ValidationError, result: any) => {
    if (err) {
      return res.status(400).json({ messsage: "Something is wrong" });
    }
  });
  const condidate: IUser = await User.findOne({ email });
  if (condidate) {
    return res.status(500).json({ message: "user already exists" });
  }
  const hashPassword: string = await bcrypt.hash(password, 12);
  const newUser: IUser = new User({ name, email, password: hashPassword });
  await newUser.save();
});

// auth

routr.post("/auth", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
  });
  Joi.validate(
    { email, password },
    schema,
    (err: Joi.ValidationError, result: any) => {
      if (err) {
        return res.status(400).json({ message: "Something is wrongg" });
      }
    }
  );
  const user: IUser = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "wrong password or email" });
  }
  const condedate = await bcrypt.compare(password, user.password);
  if (!condedate) {
    res.status(400).json({ message: "Password is wrong try again" });
  }
  const token: string = jwt.sign({ userId: user.id }, "envision", {
    expiresIn: "1h"
  });
  res.json({ token, userId: user.id });
});

export default routr;
