import {Schema, model , Document} from "mongoose";
interface Icurse extends IcurseVo, Document  {
    _id: any;
}
interface IcurseVo {
    _id: any;
    name: string;
    image: string;
    price: number;
}

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});
export default model("curses", schema);