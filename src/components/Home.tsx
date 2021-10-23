import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { AccountCreationManager } from "./Account/AccountCreationManager";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const sitekey = "6LfbaiscAAAAAE1AUTOJKd7GY-aoVrfTc7E8AIEC";
export const Home: React.FC<{}> = () => {
  const query = useQuery();
  return (
    <Switch>
      <Route exact path="/">
        <Links />
      </Route>
      <Route path="/account/want_to_create">
        <GoogleReCaptchaProvider reCaptchaKey={sitekey} language="ja">
          <AccountCreationManager
            creationFailed={query.get("failed") === "true"}
          ></AccountCreationManager>
        </GoogleReCaptchaProvider>
      </Route>
    </Switch>
  );
};

const Links: React.FC<{}> = () => {
  return (
    <div>
      <Link to="/account/want_to_create">アカウント作成</Link>
      <Link to="/account/login">ログイン</Link>
    </div>
  );
};
