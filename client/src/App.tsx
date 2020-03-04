import React from "react";
import Nav from "./components/nav/nav";
import useRouts from "./components/hookss/rout";
import {AuthContext} from "./components/context/context";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import "materialize-css";

function App() {
    const [isAuth, setIsAuth] = React.useState<any>(!!localStorage.getItem("token"));
    const [userId, setUserId] = React.useState<any>(null);
    const setAuth = (isAuth: boolean, id: any) => {
        setIsAuth(isAuth);
        setUserId(id);
    };
    const rout = useRouts(isAuth);
    console.log("id", userId);
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
