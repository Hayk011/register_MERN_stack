import * as Joi from "@hapi/joi";

export interface Iorder {
    userId: string;
    courseId: string;
    count: number;
}
export const  orderSchema = Joi.object({
  token: Joi.string().required()
});