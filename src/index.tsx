import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import "./dot_style_generic_conponents/nes.css";

ReactDOM.render(
  <Router>
    <App></App>
  </Router>,
  document.getElementById("root")
);
