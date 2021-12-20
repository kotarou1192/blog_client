import React from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";

type MenuBarProps = {
  token: string;
  setToken: any;
};

export const MenuBar: React.FC<MenuBarProps> = (props) => {
  return (
    <div className="MenuBar">
      <div className="MenuBar__titleText">Technology-Comunity</div>
      <input type="text" className="MenuBar__input"></input>
      <div></div>
      <Link
        className={
          props.token === "" ? "MenuBar__loginButton" : "MenuBar__myPageButton"
        }
        to={props.token === "" ? "/login" : "/users/me"}
      >
        {props.token === "" ? "Login" : "MyPage"}
      </Link>
      <Link
        className={
          props.token === "" ? "MenuBar__signUp" : "MenuBar__signUp__hidden"
        }
        to={"/account/want_to_create"}
      >
        signUp
      </Link>
    </div>
  );
};
