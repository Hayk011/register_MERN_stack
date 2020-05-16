import {Schema, model, Types} from "mongoose";

const transaction = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    items: [
        {
            count: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            courseId: {
                type: String,
                required: true
            }
        }
    ]
});

export default model("Transaction", transaction);