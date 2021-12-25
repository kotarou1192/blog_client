import React, { useState } from "react";
import { AccountCreate } from "./Account/AccountCreate";
import { Link, Route, Switch } from "react-router-dom";
import { AccountCreationManager } from "./Account/AccountCreationManager";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as network from "../utils/network";
import { Top } from "./Top";
import { MenuBar } from "./MenuBar";
import { Login } from "./LoginContainer/Login";
import { sitekey } from "../utils/Constants";
import { UserPage } from "./UserPage";
import { MyPage } from "./MyPage";
import { SearchResults } from "./SearchResults";
import { PostItem } from "./PostItem";
import { CreatePost } from "./CreatePost";

export const Router: React.FC<{}> = () => {
  const query = network.useQuery();
  const [keywords, setKeywords] = useState<string>("");
  const [results, setResults] = useState([]);
  return (
    <div>
      <MenuBar keywords={keywords} setKeywords={setKeywords} />
      <Switch>
        <Route exact path="/">
          <Link to="/users/takashiii/posts/new">here</Link>
          <Link to="/users/takashiii"> [me]</Link>
          <Top />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/users/:name" component={UserPage}></Route>
        <Route path="/me">
          <MyPage />
        </Route>
        <Route
          exact
          path="/users/:name/posts/new"
          component={CreatePost}
        ></Route>
        <Route path="/users/:name/posts/:id" component={PostItem}></Route>
        <Route path="/search/users">
          <SearchResults
            results={results}
            setResults={setResults}
            setKeywords={setKeywords}
          />
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
