import React from "react";
import { AccountCreationManager } from "./components/AccountCreationManager";
import "./App.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const sitekey = "6LfbaiscAAAAAE1AUTOJKd7GY-aoVrfTc7E8AIEC";

export const App: React.FC<{}> = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={sitekey} language="ja">
      <div className="Content">
        <AccountCreationManager></AccountCreationManager>
      </div>
    </GoogleReCaptchaProvider>
  );
};
