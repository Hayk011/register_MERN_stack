import React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {IAllCursessClient} from "../../../../routs/interfaces/interfaces";

interface IProps extends RouteComponentProps<{ id: string }> {
}

const CurseDetals = (props: IProps) => {
    const [curse, setCurse] = React.useState<IAllCursessClient>({});
    React.useEffect(() => {
        const id = props.match.params.id || "";
        fetch(`http://localhost:5000/user/curses/${id}`)
            .then((info) => info.json())
            .then(data => setCurse(data.data))
            .catch((err) => console.log(err));
    }, []);
    console.log(curse);
    return (
        <div className="container">
            <h1>Curse Detals</h1>
            <div className="row">
                <div className="col s12 m7">
                    <div className="card">
                        <div className="card-image">
                            <img src={curse?.image}/>
                        </div>
                        <div className="card-content">
                            <p>{curse.name}</p>
                            <p>{curse.price} AMD</p>
                        </div>
                        <div className="card-action">
                            <Link to="/user/curses">Back To Curses</Link>
                            <button className="btn primry red">Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CurseDetals;