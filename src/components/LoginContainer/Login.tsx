import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { sitekey } from "../../utils/Constants";
import { LoginInputs } from "./LoginInputs";

type LoginProps = {
  setToken: any;
};

export const Login: React.FC<LoginProps> = (props) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={sitekey} language="ja">
      <LoginInputs setToken={props.setToken}></LoginInputs>
    </GoogleReCaptchaProvider>
  );
};
