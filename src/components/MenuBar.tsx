import React from "react";
import "./MenuBar.css";
import { Link, useHistory } from "react-router-dom";
import { LoggedIn, logout } from "../utils/CookiesWrapper";

type MenuBarProps = {
  keywords: string;
  setKeywords: any;
};

export const MenuBar: React.FC<MenuBarProps> = (props) => {
  const loggedIn = LoggedIn();
  const history = useHistory();

  const keywordSpliter = (keywords: string | undefined) => {
    const keys = new Map<string, boolean>();
    return (keywords || props.keywords)
      .split(/\s/)
      .map((key) => {
        if (keys.get(key) == null) {
          keys.set(key, true);
          return key;
        }
      })
      .filter(Boolean);
  };

  return (
    <div className="MenuBar">
      <Link className="MenuBar__titleText" to="/">
        Technology-Comunity
      </Link>

      <input
        type="text"
        className="MenuBar__input"
        value={props.keywords}
        onChange={(e) => {
          props.setKeywords(e.target.value);
        }}
      ></input>
      <input
        type="submit"
        value="Search"
        className="MenuBar__search_button"
        onClick={() => {
          const keywords = keywordSpliter(props.keywords).join(" ");
          history.push("/search/users?keywords=" + keywords);
        }}
      ></input>
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
