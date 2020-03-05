import {Router, Request, Response} from "express";
import * as Joi from "@hapi/joi";
import Curses, {Icurse} from "../../models/curse";
import {ValidationResult} from "@hapi/joi";
import {ICurseAdd} from "../interfaces/interfaces";

const route = Router();
route.get("/user/curses",  async (request: Request, response: Response) => {
    const curses: Icurse[] = await  Curses.find({});
    response.json({curses});
});

route.get("/user/curses/:id", async (request: Request, response: Response) => {
    const onlyCurse: Icurse = await Curses.findById(request.params.id);
    response.json({data: onlyCurse}).end();
})

route.post("/user/add", (request: Request, response: Response) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(20).required(),
        price: Joi.string().min(3).max(10).required(),
        image: Joi.string().min(5).max(500).required()
    });

    let validationResult: ValidationResult<ICurseAdd> = schema.validate(request.body);

    if (validationResult.error) {
        response.status(400).json({errorMessage: validationResult.error.message}).end();
    } else {
        const curse: Icurse = new Curses(validationResult.value);
        curse.save((err: Error, data: {}) => {
            if (err) {
                response.status(400).json({message: err.message}).end();
            } else {
                response.status(200).json({message: "successful"}).end();
            }
        });
    }
});
export default route;
