import * as React from "react";
// function print() { }
// interface IContext {
//     isAuth: Boolean;
//     login: (token: string, id: string) => void;
//     token: string;
//     logOuth: (token: null, is: null) => void;
//     userId: string;
// }
export const AuthContext = React.createContext({
    isAuth: !!localStorage.getItem("token"),
    userId: null,
    setAuth: (isAuth: boolean) => {}
});