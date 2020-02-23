import { Schema, model, Document } from "mongoose";
export interface IUser extends Document, IuserVo {
  _id: any;
}
interface IuserVo {
  _id: any;
  name: string;
  password: string;
  email: string;
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
  }
});
export default model("User", schema);
