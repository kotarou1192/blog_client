import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useHistory } from "react-router-dom";
import "./AccountCreation.css";

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
  const url = "https://api.takashiii-hq.com/account/want_to_create";
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const history = useHistory();

  return (
    <div className="account_creation">
      <div className="account_creation__exp_txt">
        <p>
          メールアドレスを入力してください。アカウント作成リンクが送られます。
          <br />
          有効期限は24時間です。
        </p>
        <p
          className="accoutn_creation__failed_txt"
          hidden={success || !props.creationFailed}
        >
          失敗しました。もう一度入力してください。
        </p>
        <p className="account_creation__success_txt" hidden={!success}>
          メールが送信されました。
        </p>
      </div>
      <div className="account_creation__mail_input_box">
        <input
          className="account_creation__mail_input"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          type="submit"
          className={"account_creation__submit_button"}
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
          title="作成"
        ></input>
      </div>
    </div>
  );
};
