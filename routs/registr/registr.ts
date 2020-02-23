import { Router, Request, Response } from "express";
import User, { IUser } from "../../models/user";
import Joi from "joi";
import bcrypt from "bcryptjs";
const routr = Router();
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
  const condidate = await User.findOne({ email });
  if (condidate) {
    return res.status(500).json({ message: "user already exists" });
  }
  const hashPassword: string = await bcrypt.hash(password, 12);
  const newUser = new User({ name, email, password: hashPassword });
  await newUser.save();
});
export default routr;
