import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../../components/registration/registr";
import Auth from "../../components/authification/auth";
import Curses from "../pages/curses";
import Video from "../pages/video";
import User from "../pages/userpage";
const useRouts = (isAuth: boolean) => {
  if (!isAuth) {
    return (
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/auth" component={Auth} />
      </Switch>
    );
  }
  return (
    <Switch>
        <Route path="/user/id" component={User} />
      <Route path="/curses" component={Curses} />
      <Route path="/add" component={Video} />
    </Switch>
  );
};
export default useRouts;
