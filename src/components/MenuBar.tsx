import React from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";
import { LoggedIn, logout } from "../utils/CookiesWrapper";

export const MenuBar: React.FC<{}> = () => {
  const loggedIn = LoggedIn();
  return (
    <div className="MenuBar">
      <div className="MenuBar__titleText">Technology-Comunity</div>
      <input type="text" className="MenuBar__input"></input>
      <div></div>
      <Link
        className={loggedIn ? "MenuBar__myPageButton" : "MenuBar__loginButton"}
        to={loggedIn ? "/me" : "/login"}
      >
        {loggedIn ? "MyPage" : "Login"}
      </Link>
      <Link
        className={loggedIn ? "MenuBar__logout" : "MenuBar__signUp"}
        to={loggedIn ? "/" : "/account/want_to_create"}
        onClick={() => {
          if (loggedIn) logout();
        }}
      >
        {loggedIn ? "logout" : "signUp"}
      </Link>
    </div>
  );
};
