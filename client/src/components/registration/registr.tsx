import React from "react";
import "./register.css";
interface IForm {
  name: string;
  email: string;
  password: string;
}
const Register = () => {
  const [form, setForm] = React.useState<IForm>({
    name: "",
    email: "",
    password: ""
  });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const sendHandler = async () => {
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    });
    setForm({ name: "", email: "", password: "" });
  };
  return (
    <div className="container">
      <div className="registration-container">
        <h3>Sign Up</h3>
        <div className="row">
          <div className="input-field offset m6">
            <input
              id="first_name1"
              type="text"
              className="validate"
              name="name"
              value={form.name}
              onChange={changeHandler}
            />
            <label className="active">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field offset m6">
            <input
              id="first_name2"
              type="email"
              className="validate"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
            <label className="active">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field offset m6">
            <input
              id="first_name3"
              type="password"
              className="validate"
              name="password"
              value={form.password}
              onChange={changeHandler}
            />
            <label className="active">Password</label>
          </div>
        </div>
        <div className="button-container">
          <button onClick={sendHandler} className="btn primry">
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
