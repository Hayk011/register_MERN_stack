import {Schema, model , Document} from "mongoose";
export interface Icurse extends Document, IcurseVo {
    _id: any;
}
interface IcurseVo {
    _id?: any;
    name?: string;
    image?: string;
    price?: string;
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
        type: String,
        require: true
    }
});
export default model("curses", schema);