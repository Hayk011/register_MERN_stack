import * as React from "react";
import {IAllCursessClient} from "../../../../routs/interfaces/interfaces";
import {Link} from "react-router-dom";

const Courses = () => {
    const [curses, setCurses] = React.useState<IAllCursessClient[]>([]);

    React.useEffect(() => {
        fetch("http://localhost:5000/user/curses", {
            method: "GET"
        })
            .then((info) => info.json())
            .then((data) => setCurses(data.curses))
            .catch((err: Error) => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1>Curses</h1>
            <div className="items-container">
                {curses.map((list: IAllCursessClient) => (
                    <div key={list._id} className="row">
                        <div className="col s12 m6">
                            <div className="card">
                                <div className="card-image">
                                    <img src={list.image} alt="img"/>
                                </div>
                                <div className="card-content">
                                    <p>{list.name}</p>
                                    <p>{list.price} AMD</p>
                                </div>
                                <div className="card-action cart-action-container">
                                    <Link to={`curses/${list._id}`}>Detals  {list.name}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
