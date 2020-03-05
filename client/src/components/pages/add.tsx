import * as React from "react";
import curseAddHandler from "../../service/AddService";

interface ICreateForm {
    name: string;
    image: string;
    price: string;
}

const Add = () => {
    const [createCurse, setCreateCurse] = React.useState<ICreateForm>({
        name: "",
        image: "",
        price: "",
    });
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateCurse({...createCurse, [event.target.name]: event.target.value});
    };
    const sendHandler = () => {
        curseAddHandler(createCurse.name, createCurse.price, createCurse.image);
        setCreateCurse({
            name: "",
            price: "",
            image: ""
        });
    };
    return (
        <div className="container">
            <h1>Add Curse</h1>
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="text" className="validate" name="name"
                           onChange={(event) => changeHandler(event)}
                           value={createCurse.name}
                    />
                    <label>Curse Name</label>
                </div>
                <div className="input-field col s12">
                    <input id="email" type="text" className="validate" name="price"
                           onChange={(event) => changeHandler(event)}
                           value={createCurse.price}
                    />
                    <label>Curse Price</label>
                </div>
                <div className="input-field col s12">
                    <input id="email" type="text" className="validate" name="image"
                           onChange={(event) => changeHandler(event)}
                           value={createCurse.image}
                    />
                    <label>Curse Img URL</label>
                </div>
            </div>
            <button onClick={() => sendHandler()}
                    className="btn primry add-button"> Send
            </button>
        </div>
    );
};
export default Add;
