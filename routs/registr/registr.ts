import {Router, Request, Response, response} from "express";
import User, {IUser} from "../../models/user";
import * as Joi from "@hapi/joi";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {IRegisterVakidation} from "../interfaces/interfaces";

const router = Router();

// registration

router.post("/register", async (req: Request, res: Response) => {
    const {email, password, name} = req.body;
    console.log(req.body);
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

    let VAlidationResult: Joi.ValidationResult<IRegisterVakidation> = schema.validate(req.body);

    if (VAlidationResult.error) {
        return res.status(400).json({errorMessage: VAlidationResult.error.message}).end();
    } else {
        const candidate: IUser = await User.findOne({email});

        if (candidate) {
            return res.status(500).json({message: "user already exists"}).end();
        }

        const hashPassword: string = await bcrypt.hash(password, 12);

        const newUser: IUser = new User({name, email, password: hashPassword, cart: {items: []}});

        newUser.save((err: Error, data: {}) => {
            if (err) {
                res.status(400).json({message: err.message}).end();
            } else {
                res.status(200).json({message: "successed"}).end();
            }
        });
    }
});

// auth

router.post("/auth", async (req: Request, res: Response) => {
    const {email, password} = req.body;
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
    let ValidationResult: Joi.ValidationResult<{ email: string, password: string }> = schema.validate(req.body);

    if (ValidationResult.error) {
        res.status(400).json({errorMessage: ValidationResult.error.message}).end();
    } else {
        const user: IUser = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "wrong password or email"}).end();
        }

        const candidate: boolean = await bcrypt.compare(password, user.password);
        if (!candidate) {
            return res.status(400).json({message: "Password is wrong try again"}).end();
        }
        const token: string = jwt.sign({userId: user.id}, "envision", {
            expiresIn: "1h"
        });
        res.json({token, userId: user.id});
    }
});

export default router;
