import * as React from "react";
import {Switch, Route} from "react-router-dom";
import Register from "../../components/registration/registr";
import Auth from "../../components/authification/auth";
import Curses from "../pages/curses";
import Add from "../pages/add";
import User from "../pages/userpage";
import CurseDetals from "../pages/curseDetals";

const useRouts = (isAuth: boolean) => {
    if (!isAuth) {
        return (
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/auth" component={Auth}/>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route exact  path="/user/curses"  component={Curses}/>
            <Route path="/user/curses/:id" component={CurseDetals}/>
            <Route path="/user/add" component={Add}/>
            <Route exact path="/user"  component={User}/>
        </Switch>
    );
};
export default useRouts;
