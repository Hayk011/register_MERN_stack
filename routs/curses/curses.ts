import {Router, Request, Response} from "express";
import * as Joi from "@hapi/joi";
import Curses, {Icurse} from "../../models/curse";
import User, {IUser, Icart} from "../../models/user";
import * as jwt from "jsonwebtoken";
import {ValidationResult} from "@hapi/joi";
import {ICurseAdd} from "../interfaces/interfaces";

const route = Router();


route.get("/user/curses", async (request: Request, response: Response) => {
    const curses: Icurse[] = await Curses.find({});
    response.json({curses});
});

route.post("/user/curses/:id", (request: Request, response: Response) => {
    let userID: string = "";
    // console.log(request.body);
    jwt.verify(request.body.token, "envision", async (err: any, result: any) => {
        try {
            if (err) {
                response.status(403).json({errMessage: "your token is wrong "}).end();
            } else {
                userID = result.userId;
                const user: IUser = await User.findById(userID);
                const curse: Icurse = await Curses.findById(request.body.curseID);
                const condedate: Icart[] = user.cart.items.filter((curs: Icart) => curs.id === request.params.id);
                if (condedate.length === 0) {
                    user.cart.items.push({curse: curse.name, count: 1, id: curse._id, price: curse.price});
                    user.save();
                    response.status(200).json({message: "successful"}).end();
                } else {
                    condedate[0].count += 1;
                    user.update(condedate[0], {$set: {cart: {items: []}}});
                    user.save((err: Error, result: IUser) => {
                        if (err) {
                            response.status(403).json({errMessage: "something is wrong"}).end();
                        } else {
                            response.status(200).json({message: "data saved successfully"}).end();
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }

    });
});


route.get("/user/curses/:id", async (request: Request, response: Response) => {

    try {
        const onlyCurse: Icurse = await Curses.findById(request.params.id);
        response.json({data: onlyCurse}).end();
    } catch (e) {
        console.log(e);
    }
});


route.post("/user/add", (request: Request, response: Response) => {
    const {name, price, image} = request.body;
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(20).required(),
        price: Joi.string().min(3).max(10).required(),
        image: Joi.string().min(5).max(500).required()
    });

    let validationResult: ValidationResult<ICurseAdd> = schema.validate(request.body);

    if (validationResult.error) {
        response.status(400).json({errorMessage: validationResult.error.message}).end();
    } else {
        const curse: Icurse = new Curses({name, price, image, cart: {items: []}});
        curse.save((err: Error, data: {}) => {
            if (err) {
                response.status(400).json({message: err.message}).end();
            } else {
                response.status(200).json({message: "successful"}).end();
            }
        });
    }
});


route.post("/user/basket", (request: Request, response: Response) => {
    let userID: string = "";
    try {
        jwt.verify(request.body.token, "envision", async (err: Error, result: any) => {

            if (err) {
                response.status(403).json({errMessage: "your token is wrong "}).end();
            } else {
                const user: IUser = await User.findById(result.userId);
                response.status(200).json({cart: user.cart}).end();
            }
        });
    } catch (e) {
        console.log(e);
    }
});


route.delete("/user/basket", (request: Request, response: Response) => {
    jwt.verify(request.body.token, "envision", async (err: Error, result: any) => {
        if (err) {
            response.status(403).json({errMwssage: "tour token is wrong"}).end();
        } else {
            try {
                const user: IUser = await User.findById(result.userId);
                const condidate = user.cart.items.filter((curs: Icart) => curs.id === request.body.curseId);

                if (condidate[0].count > 1) {
                    condidate[0].count -= 1;
                    user.update(condidate[0], {$set: {cart: {items: []}}});
                    user.save((err: Error, result: IUser) => {
                        if (err) {
                            response.status(500).json({errMessage: "something is wrong"}).end();
                        } else {
                            response.status(200).json({message: "successful"}).end();
                        }
                    });
                } else {
                    user.cart.items = user.cart.items.filter((item: Icart) => item.id !== request.body.curseId);
                    user.save((err: Error, result: IUser) => {
                        if (err) {
                            response.status(403).json({errMessage: "something is wrong"}).end();
                        } else {
                            response.status(200).json({message: "changes saved "}).end();
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
});


export default route;
