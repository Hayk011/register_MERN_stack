import React from "react";
import Nav from "./components/nav/nav";
import useAuth from "./components/hookss/auth";
import useRouts from "./components/hookss/rout";
import {AuthContext} from "./components/context/context";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "materialize-css";
function App() {
    const {token, login, logOut, userId} = useAuth();
    const isAuth = !!token;
  const rout = useRouts(false);
  const nav = Nav(false);
    return (

    <>
        <AuthContext.Provider value = {{
token, login , logOut , userId , isAuth
        }}>
      <BrowserRouter>
        {nav}
        {rout}
      </BrowserRouter>
        </AuthContext.Provider>
    </>
  );
}

export default App;
