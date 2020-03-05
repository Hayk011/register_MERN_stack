import * as React from "react";
export const AuthContext = React.createContext({
    isAuth: !!localStorage.getItem("token"),
    userId: null,
    setAuth: (isAuth: boolean) => {},
});