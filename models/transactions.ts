import {Schema, model, Types} from "mongoose";

const transaction = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    tptalPrice: {
        type: Number,
        required: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            count: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            id: {
                type: Types.ObjectId,
                required: true
            }
        }
    ]
});

export default model("Transactions", transaction);