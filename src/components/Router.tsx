import React, { useState } from "react";
import { AccountCreate } from "./Account/AccountCreate";
import { Route, Switch } from "react-router-dom";
import { AccountCreationManager } from "./Account/AccountCreationManager";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as network from "../utils/network";
import { Top } from "./Top";
import { Login } from "./LoginContainer/Login";
import { sitekey } from "../utils/Constants";
import { UserPage } from "./UserPage/UserPage";
import { MyPage } from "./MyPage";
import { SearchResults } from "./SearchResults";
import { PostItem } from "./PostItem";
import { CreatePost } from "./CreatePost";
import { UpdatePost } from "./UpdatePost";
import { NotFound } from "./NotFound";
import { Header } from "./Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import "./hideScrollbar.css";

const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: "content-box",
          padding: 3,
          fontSize: "1.125rem"
        }
      }
    }
  }
});

export const Router: React.FC<{}> = () => {
  const query = network.useQuery();
  const [keywords, setKeywords] = useState<string>(query.get("keywords") || "");
  const [results, setResults] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="scrollbar__hide" style={{ backgroundColor: "#fafafa" }}>
        <Header keywords={keywords} setKeywords={setKeywords} />
        <Container maxWidth="xl" sx={{ bgcolor: "white" }}>
          <Switch>
            <Route exact path="/">
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
            <Route
              exact
              path="/users/:name/posts/:id/edit"
              component={UpdatePost}
            ></Route>
            <Route path="/users/:name/posts/:id" component={PostItem}></Route>
            <Route path="/search/users">
              <SearchResults
                results={results}
                keywords={keywords}
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
            <Route>
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
};
