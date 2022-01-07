import React from "react";
import "./MenuBar.css";
import { Link, useHistory } from "react-router-dom";
import { LoggedIn, logout } from "../utils/CookiesWrapper";
import { Button, Input } from "../dot_style_generic_conponents/doms";

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
      <div className="Logo">
        <Link className="MenuBar__titleText ps2p_text" to="/">
          BLOG.md
        </Link>
      </div>

      <div className="Search">
        <Input.Text
          value={props.keywords}
          onChange={(e: any) => {
            props.setKeywords((e.target as HTMLInputElement).value);
          }}
        />
        <Button
          value="Search"
          onClick={() => {
            const keywords = keywordSpliter(props.keywords).join(" ");
            history.push("/search/users?keywords=" + keywords);
          }}
        />
      </div>

      <div className="Account">
        <Link
          className={
            loggedIn
              ? "ps2p_text nes-btn is-primary"
              : "ps2p_text nes-btn is-success"
          }
          to={loggedIn ? "/me" : "/login"}
        >
          {loggedIn ? "MyPage" : "Login"}
        </Link>
        <Link
          className={
            loggedIn ? "MenuBar__logout ps2p_text" : "MenuBar__signUp ps2p_text"
          }
          to={loggedIn ? "/" : "/account/want_to_create"}
          onClick={() => {
            if (loggedIn) logout();
          }}
        >
          {loggedIn ? "logout" : "signUp"}
        </Link>
      </div>
    </div>
  );
};
