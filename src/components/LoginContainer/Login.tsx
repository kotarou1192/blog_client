import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { sitekey } from "../../utils/Constants";
import { LoginInputs } from "./LoginInputs";

export const Login: React.FC<{}> = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={sitekey} language="ja">
      <LoginInputs></LoginInputs>
    </GoogleReCaptchaProvider>
  );
};
