import React from "react";
import Nav from "./components/nav/nav";
import useRouts from "./components/hookss/rout";
import {AuthContext} from "./components/context/context";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import "materialize-css";

function App() {
    const [isAuth, setIsAuth] = React.useState<any>(!!localStorage.getItem("token"));
    const userId = null;
    const setAuth = (isAuth: boolean) => {
        setIsAuth(isAuth);
    };
    const rout = useRouts(isAuth);
    console.log(isAuth)
    return (
        <>
            <AuthContext.Provider value={{
                userId, isAuth, setAuth
            }}>
                <BrowserRouter>
                    <Nav/>
                    {rout}
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    );
}

export default App;
