import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { sitekey } from "../../utils/Constants";
import { SignIn } from "./SignIn";

export const Login: React.FC<{}> = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={sitekey} language="ja">
      <SignIn></SignIn>
    </GoogleReCaptchaProvider>
  );
};
