import React from "react";
import {AuthContext} from "../context/context";
import {login} from "../../service/AuthService";

interface IAuth {
    email: string;
    password: string;
}

const Auth = () => {
    const context = React.useContext(AuthContext);
    const [auth, setAuth] = React.useState<IAuth>({
        email: "",
        password: ""
    });
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth({...auth, [event.target.name]: event.target.value});
    };
    // const loginHandler = async () => {
    //     await fetch("http://localhost:5000/auth", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({email: auth.email, password: auth.password})
    //     }).then(res => res.json()).then(data =>
    //         // context.login(data.token, data.userId)
    //         localStorage.setItem("token", data.token)
    //     );
    //     setAuth({email: "", password: ""});
    // };
    // context.login(data.token, data.id)
    // console.log(context);

    const loginHandler = () => {
        login(auth.email, auth.password,  () => {
            context.setAuth(true);
        });
    };

    return (
        <div className="container">
            <div className="registration-container">
                <h3>Sign in</h3>
                <div className="row">
                    <div className="input-field offset m6">
                        <input
                            id="first_name1"
                            type="email"
                            className="validate"
                            name="email"
                            value={auth.email}
                            onChange={changeHandler}
                        />
                        <label className="active">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field offset m6">
                        <input
                            id="first_name1"
                            type="password"
                            className="validate"
                            name="password"
                            value={auth.password}
                            onChange={changeHandler}
                        />
                        <label className="active">Password</label>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={loginHandler} className="btn primry">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Auth;
