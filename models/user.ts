import { Schema, model, Document, Types } from "mongoose";
import {array} from "joi";
export interface IUser extends Document, IuserVo {
  _id: any;
}
interface IuserVo {
  _id?: any;
  name?: string;
  password?: string;
  email?: string;
  cart?: Icart[];
}
interface Icart {
  curse: string;
  price: number;
  count: number;
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
  cart: {
    items: [
      {
        curse: {
          type: String,
        },
        price: {
          type: Number
        },
        count: {
          type: Number,
          default: 0
        }
      }
    ]
  }
});
export default model("User", schema);
