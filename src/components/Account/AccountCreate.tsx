import React, { useState } from "react";
import * as network from "../../utils/network";
import { useHistory } from "react-router-dom";
import { AccountCreateReadme } from "./AccountCreateReadme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";

type RequestParams = {
  value: {
    session_id: string;
    password: string;
    name: string;
  };
};

export const AccountCreate: React.FC<{}> = () => {
  const passwordMinumumChars = 6;
  const NameMaximumChars = 30;
  const ValidNameRegExp = /^[a-zA-Z0-9-]+[a-zA-Z0-9-]$/;

  const history = useHistory();
  const query = network.useQuery();

  // クエリからセッションIDを取り出す
  const sessionID = query.get("session_id");
  // アカウント作成が成功したら成功画面に切り替えてHOMEに飛ばすためのフラグ
  const [success, setSuccess] = useState(false);
  // 作成ボタンを連打されないためのフラグ
  const [submited, setSubmited] = useState(false);
  // 入力フィールド
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState<{
    nickname: boolean;
    nErrorMessage: string;
    password: boolean;
    pErrorMessage: string;
    cPassword: boolean;
    cPErrorMessage: string;
    invalidAccess: boolean;
    serverError: boolean;
    oldToken: boolean;
  }>({
    nickname: false,
    nErrorMessage: "",
    password: false,
    pErrorMessage: "",
    cPassword: false,
    cPErrorMessage: "",
    invalidAccess: false,
    serverError: false,
    oldToken: false
  });

  const [isTrue, setTrue] = useState(false);
  console.log(isTrue);

  const handleSubmit = () => {
    const errorsCopy = {
      nickname: false,
      nErrorMessage: "",
      password: false,
      pErrorMessage: "",
      cPassword: false,
      cPErrorMessage: "",
      invalidAccess: false,
      serverError: false,
      oldToken: false
    };
    let failedAny = false;
    if (
      name === "" ||
      name.length > NameMaximumChars ||
      !ValidNameRegExp.test(name)
    ) {
      errorsCopy.nickname = true;
      errorsCopy.nErrorMessage = "invalid nickname.";
      failedAny = true;
    }
    if (password != null && password.length < passwordMinumumChars) {
      errorsCopy.password = true;
      errorsCopy.pErrorMessage = "password is too short.";
      failedAny = true;
    }
    if (
      password == null ||
      passwordConfirm == null ||
      password !== passwordConfirm
    ) {
      errorsCopy.cPassword = true;
      errorsCopy.cPErrorMessage = "password confirmation is different.";
      failedAny = true;
    }
    if (sessionID == null) {
      errorsCopy.invalidAccess = true;
      failedAny = true;
    }
    // バリデーションに引っかかっていたらここでリターン
    if (failedAny || sessionID == null) {
      setErrors(errorsCopy);
      setSubmited(false);
      setTrue(true);
      return;
    }

    const requestParams: RequestParams = {
      value: { password, name, session_id: sessionID }
    };

    network
      .postTo("/users", requestParams)
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          const cpErrors = errors;
          cpErrors.serverError = true;
          setErrors(cpErrors);
        }
        if (err.response.status === 400) {
          const cpErrors = errors;
          cpErrors.oldToken = true;
          setErrors(cpErrors);
        }
        setSubmited(false);
      });
  };

  if (success) {
    setTimeout(() => history.push("/"), 3000);
    return (
      <div>
        <p>アカウントが作成されました</p>
        <p>3秒後に移動します。</p>
      </div>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fafafa" }}>
      <AccountCreateReadme />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "#fafafa" }}
      >
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            bgcolor: "white",
            padding: "10px",
            pr: "30px",
            pl: "30px",
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
          <Typography component="h1" variant="h5">
            <p hidden={!errors.oldToken}>
              メールの有効期限切れです。もう一度SignUpから登録ください。
            </p>
            <p hidden={!errors.invalidAccess}>
              登録リンクが古いか、すでに使われた登録リンクです。
            </p>
            <p hidden={!errors.serverError}>
              サーバーにエラーが起きています。暫く待つか、管理者にお問い合わせください。
            </p>
          </Typography>
          <Box component="div" sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <p style={{ fontSize: "small", textAlign: "center" }}>
                  使用できる文字は半角英数字とハイフンのみです。長さは1-30文字です。
                </p>
                <TextField
                  fullWidth
                  label="NickName"
                  autoComplete="nickname"
                  onChange={(el) => setName(el.target.value)}
                  value={name}
                  error={errors.nickname}
                  helperText={errors.nErrorMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <p style={{ fontSize: "small", textAlign: "center" }}>
                  パスワードを決めてください。コピーやペーストはできません。
                </p>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={(el) => setPassword(el.target.value)}
                  value={password}
                  error={errors.password}
                  helperText={errors.pErrorMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  autoComplete="confirm-password"
                  onChange={(el) => setPasswordConfirm(el.target.value)}
                  value={passwordConfirm}
                  error={errors.cPassword}
                  helperText={errors.cPErrorMessage}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={submited}
              onClick={() => {
                setSubmited(true);
                handleSubmit();
              }}
            >
              Accept and Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
