import * as Joi from "@hapi/joi";

export interface Iorder {
    userId: string;
    courseId: string;
    count: number;
}
export const  orderSchema = Joi.object({
    userId: Joi.string().required(),
    courseId: Joi.string().required(),
    count: Joi.number().required(),
});