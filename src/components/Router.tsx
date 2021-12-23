import React from "react";
import { AccountCreate } from "./Account/AccountCreate";
import { Route, Switch } from "react-router-dom";
import { AccountCreationManager } from "./Account/AccountCreationManager";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as network from "../utils/network";
import { Top } from "./Top";
import { MenuBar } from "./MenuBar";
import { Login } from "./LoginContainer/Login";
import { sitekey } from "../utils/Constants";
import { UserPage } from "./UserPage";
import { MyPage } from "./MyPage";

export const Router: React.FC<{}> = () => {
  const query = network.useQuery();
  return (
    <div>
      <MenuBar />
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/users/:name" component={UserPage}></Route>
        <Route path="/me">
          <MyPage />
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
    </div>
  );
};
