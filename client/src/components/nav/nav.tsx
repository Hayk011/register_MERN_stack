import React from "react";
import "./nav.css";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/context";
import {logout} from "../../service/AuthService";

// interface INav {
//   isAuth?: boolean;
// }

function Nav() {
    const context = React.useContext(AuthContext);
    let history = useHistory();
    const exitHandler = (event: React.MouseEvent<HTMLLIElement>): void => {
        event.preventDefault();
        logout();
        context.setAuth(false);
    };

    if (!context.isAuth) {
        return (
            <nav>
                <div className="nav-wrapper green">
                    <NavLink to="/1 " className="brand-logo">
                        Logo
                    </NavLink>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <NavLink to="/register">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/auth">Log In</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
    return (
        <nav>
            <div className="nav-wrapper green">
                <NavLink to="/1 " className="brand-logo">
                    Logo
                </NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/curses">Curses</NavLink>
                    </li>
                    <li>
                        <NavLink to="/video">Video</NavLink>
                    </li>
                    <li onClick={(event) => exitHandler(event)}>
                        <a href="/"> Exit </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
