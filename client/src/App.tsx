import React from "react";
import Nav from "./components/nav/nav";
import useAuth from "./components/hookss/auth";
import useRouts from "./components/hookss/rout";
import {AuthContext} from "./components/context/context";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import "materialize-css";

function App() {
    const {login, logOut, userId} = useAuth();
    const isAuth = !!localStorage.getItem("userData");
    const rout = useRouts(isAuth);
    // const nav = Nav(isAuth);
    return (
        <>
            <AuthContext.Provider value={{
                login, logOut, userId, isAuth
            }}>
                <BrowserRouter>
                    <Nav isAuth={isAuth}></Nav>
                    {rout}
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    );
}

export default App;
