import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";
import { login, rememberLogin } from "../../utils/network/AxiosWrapper";
import { useQuery } from "../../utils/network/QueryStringGetter";
import { useHistory, Link as RLink } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/kotarou1192">
        GitHub@kotarou1192
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const SignIn: React.FC<{}> = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState("");

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (executeRecaptcha == null) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("Login");
    setToken(token);
  }, [executeRecaptcha, setToken]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return <SignInField recaptchaToken={token}></SignInField>;
};

type SignInFieldProps = {
  recaptchaToken: string;
};

const SignInField: React.FC<SignInFieldProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const history = useHistory();
  const loginFailed = useQuery().get("failed") ? true : false;

  const handleRemember = () => {
    setRemember(!remember);
  };

  const handleLogin = async (
    email: string,
    password: string,
    recaptchaToken: string
  ) => {
    if (remember) return await rememberLogin(email, password, recaptchaToken);
    return await login(email, password, recaptchaToken);
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fafafa" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            padding: "10px",
            pr: "30px",
            pl: "30px",
            bgcolor: "white",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form" // 消してもいい？
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={loginFailed}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              error={loginFailed}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={handleRemember}
                />
              }
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if (disabled) return;
                setDisabled(true);
                handleLogin(email, password, props.recaptchaToken)
                  .then((res) => {
                    if (res.status === 200) {
                      history.push("/");
                    }
                  })
                  .catch((err) => {
                    console.log(err.response.data.message);
                    if (err.response.request.status == 401) {
                      history.push("/login?failed=true");
                      history.go(0);
                      return;
                    }
                  });
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <RLink to="/404" style={{ fontSize: "small" }}>
                  Forgot password?
                </RLink>
              </Grid>
              <Grid item>
                <RLink
                  to="/account/want_to_create"
                  style={{ fontSize: "small" }}
                >
                  {"Don't have an account? Sign Up"}
                </RLink>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </Container>
  );
};
