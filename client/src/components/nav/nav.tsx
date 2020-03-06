import React from "react";
import "./nav.css";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/context";
import {logout} from "../../service/AuthService";
import User from "../pages/userpage";
import {json} from "express";


function Nav() {
    const context = React.useContext(AuthContext);
    const [userName, setUserName] = React.useState<string>("");
    const exitHandler = (event: React.MouseEvent<HTMLLIElement>): void => {
        event.preventDefault();
        logout();
        context.setAuth(false);
    };
    if (!context.isAuth) {
        return (
            <nav>
                <div className="nav-wrapper green">
                    <NavLink to="/" className="brand-logo">
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
                <NavLink to="/user" className="brand-logo">
                    Logo
                </NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/user">User</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user/curses">Curses</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user/add">Add</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user/basket">Basket</NavLink>
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
