import {
  Avatar,
  Button,
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  Link
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { BaseURL } from "../../utils/network/Constants";

type AccountCreationManagerProps = {
  creationFailed: boolean;
};

type AccountCreationProps = {
  recaptchaToken: string;
};

export const AccountCreationManager: React.FC<AccountCreationManagerProps> = (
  props
) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState("");

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (executeRecaptcha == null) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("AccountCreation");
    setToken(token);
  }, [executeRecaptcha, setToken]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <AccountCreation
      creationFailed={props.creationFailed}
      recaptchaToken={token}
    ></AccountCreation>
  );
};

const AccountCreation: React.FC<
  AccountCreationProps & AccountCreationManagerProps
> = (props) => {
  const url = BaseURL + "/account/want_to_create";
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const history = useHistory();

  console.log(props.creationFailed);

  if (success)
    return (
      <Container>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginTop: 8,
            display: "flex",
            bgcolor: "white",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          メールが送信されました。メールアドレスをご確認ください。
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fafafa" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "#fafafa" }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            bgcolor: "white",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography
            variant="body2"
            sx={{
              margin: "5px",
              fontSize: "small",
              textAlign: "center",
              mr: "10%",
              ml: "10%"
            }}
          >
            メールアドレスを入力してください。アカウント作成リンクが送られます。
            <br />
            有効期限は24時間です。
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ textAlign: "center", width: "90%" }}>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                error={props.creationFailed === true}
                sx={{ width: "90%" }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              setDisabled(true);
              axios
                .post(url, {
                  value: { email: email, recaptchaToken: props.recaptchaToken }
                })
                .then((res) => {
                  if (res.status === 200) {
                    setSuccess(true);
                  }
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                  if (err.response.request.status == 400) {
                    history.push("/account/want_to_create?failed=true");
                    history.go(0);
                    return;
                  }
                });
            }}
            sx={{ width: "90%", mt: 3, mb: 2 }}
          >
            Send Email
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" mr="10px">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5, mb: 5 }} />
        </Box>
      </Container>
    </Container>
  );
};

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
