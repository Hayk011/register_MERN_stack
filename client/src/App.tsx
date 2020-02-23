import React from "react";
import "materialize-css";
import Nav from "./components/nav/nav";
import "./App.css";
import { PromiseProvider } from "mongoose";

interface Iprops {
  children: React.ReactNode;
}
function App(props: Iprops) {
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
}

export default App;
