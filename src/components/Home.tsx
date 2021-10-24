import React from "react";
import { AccountCreate } from "./Account/AccountCreate";
import { Link, Route, Switch } from "react-router-dom";
import { AccountCreationManager } from "./Account/AccountCreationManager";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as network from "../utils/network";

const sitekey = "6LfbaiscAAAAAE1AUTOJKd7GY-aoVrfTc7E8AIEC";
export const Home: React.FC<{}> = () => {
  const query = network.useQuery();
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
      <Route path="/account/create">
        <AccountCreate></AccountCreate>
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
