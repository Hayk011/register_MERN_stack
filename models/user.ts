import {Schema, model, Document} from "mongoose";

export interface IUser extends Document, IuserVo {
    _id: any;
}

interface IuserVo {
    _id?: any;
    name?: string;
    password?: string;
    email?: string;
    balance?: number;
    cart?: {items: Icart[]};
}

export interface Icart {
    id?: any;
    curse?: string;
    price?: string;
    count?: number;
}

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    balance: {
      type: Number,
      default: 30000
    },
    cart: {
        items: [
            {
                curse: {
                    type: String
                },
                price: {
                    type: String
                },
                count: {
                    type: Number,
                    default: 0,
                    required: true
                },
                id: {
                    type: String
                }
            },
        ]
    }
});
export default model("User", schema);
