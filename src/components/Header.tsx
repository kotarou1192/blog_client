import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { ButtonGroup, Button, Typography } from "@mui/material";
import { logout, LoggedIn } from "../utils/CookiesWrapper";
import { useHistory } from "react-router-dom";
import { headerLogoURL } from "../utils/Constants";

type MenuBarProps = {
  keywords: string;
  setKeywords: any;
};

export const Header: React.FC<MenuBarProps> = (props) => {
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
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          width: "100hv",
          borderColor: "divider",
          backgroundColor: "#5d88b2"
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          color="inherit"
          align="center"
          noWrap
          sx={{
            flex: 1
          }}
        >
          <Link href="/" align="center">
            <img
              src={headerLogoURL}
              style={{
                width: "160px",
                height: "80px"
              }}
            />
          </Link>
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e: any) => {
              props.setKeywords((e.target as HTMLInputElement).value);
            }}
            onKeyPress={(e) => {
              if (e.key !== "Enter") return;
              const keywords = keywordSpliter(props.keywords).join(" ");
              history.push("/search/users?keywords=" + keywords);
            }}
          />
        </Search>
        <AccountContainer />
      </Toolbar>
    </React.Fragment>
  );
};

const AccountContainer = () => {
  const history = useHistory();
  const loggedIn = LoggedIn();
  const jumpTo = (addr: string) => {
    history.push(addr);
  };
  return (
    <ButtonGroup variant="contained" aria-label="account actions">
      <Button onClick={() => jumpTo(loggedIn ? "/me" : "/login")}>
        {loggedIn ? "MyPage" : "Sign In"}
      </Button>
      <Button
        onClick={() => {
          if (loggedIn) {
            logout();
            return history.push("/");
          }
          history.push("/account/want_to_create");
        }}
      >
        {loggedIn ? "Log Out" : "Sign Up"}
      </Button>
    </ButtonGroup>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch"
    }
  }
}));
