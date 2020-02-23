import React from "react";
import "./nav.css";
import { NavLink } from "react-router-dom";
const Nav = () => {
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
};
export default Nav;
