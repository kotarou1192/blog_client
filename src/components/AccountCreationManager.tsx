import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type AccountCreationProps = {
  recaptchaToken: string;
};

export const AccountCreationManager: React.FC<{}> = () => {
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

  return <AccountCreation recaptchaToken={token}></AccountCreation>;
};

const AccountCreation: React.FC<AccountCreationProps> = (
  props: AccountCreationProps
) => {
  const url = "https://api.takashiii-hq.com/account/want_to_create";
  const [email, setEmail] = useState<string>("");
  const [err, setErr] = useState<string>("");

  return (
    <div>
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      ></input>
      <input
        type="submit"
        onClick={() => {
          axios
            .post(url, {
              value: { email: email, recaptchaToken: props.recaptchaToken }
            })
            .catch((err) => {
              console.log(err.response.data.message);
              setErr(err.message);
            });
        }}
        value="作成"
      ></input>
      <p>{err}</p>
    </div>
  );
};
