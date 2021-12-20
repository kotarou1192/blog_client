import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useHistory } from "react-router-dom";
import "./LoginProps.css";
import { useQuery } from "../../utils/network/QueryStringGetter";

type LoginProps = {
  setToken: any;
};

type LoginInputContainerProps = {
  recaptchaToken: string;
};

export const LoginInputs: React.FC<LoginProps> = (props) => {
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

  return (
    <LoginInputContainer
      setToken={props.setToken}
      recaptchaToken={token}
    ></LoginInputContainer>
  );
};

const LoginInputContainer: React.FC<LoginInputContainerProps & LoginProps> = (
  props
) => {
  const url = "https://api.takashiii-hq.com/auth";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const history = useHistory();
  const loginFailed = useQuery().get("failed");

  return (
    <div className={loginFailed ? "login__failed" : "login"}>
      <div hidden={!loginFailed}></div>
      <div hidden={!loginFailed}>ログインに失敗しました</div>
      <div hidden={!loginFailed}></div>

      <div></div>
      <input
        className="login__mail_input"
        type="email"
        placeholder="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      ></input>
      <div></div>

      <div></div>
      <input
        className="login__password_input"
        type="password"
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <div></div>

      <div></div>
      <input
        type="submit"
        className={"login__submit_button"}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setDisabled(true);
          axios
            .post(url, {
              value: {
                email: email,
                password: password,
                recaptchaToken: props.recaptchaToken
              }
            })
            .then((res) => {
              if (res.status === 200) {
                props.setToken(res.data.token);
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
        value="Login"
      ></input>
      <div></div>
    </div>
  );
};
