import React, { useState } from "react";
import * as network from "../../utils/network";
import { useHistory } from "react-router-dom";
import { AccountCreateReadme } from "./AccountCreateReadme";
import "./AccountCreationForm.css";

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

  // フロント側のバリデーションでエラーメッセージを追加したり色々
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
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

  const handleSubmit = () => {
    const errorMessageArray: string[] = [];
    if (
      name === "" ||
      name.length >= NameMaximumChars ||
      !ValidNameRegExp.test(name)
    ) {
      errorMessageArray.push(
        "名前が空か、名前に使えない文字が含まれている、もしくは長すぎます。名前は30文字以内の半角英数字とハイフンで構成してください。"
      );
    }
    if (password != null && password.length < passwordMinumumChars) {
      errorMessageArray.push(
        "パスワードが短すぎます。6文字以上で構成してください。"
      );
    }
    if (
      password == null ||
      passwordConfirm == null ||
      password !== passwordConfirm
    ) {
      errorMessageArray.push("パスワードが一致しません");
    }
    if (sessionID == null) {
      errorMessageArray.push("不正なアクセスです。");
    }
    // バリデーションに引っかかっていたらここでリターン
    if (errorMessageArray.length > 0 || sessionID == null) {
      setErrorMessages(errorMessageArray);
      setSubmited(false);
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
        if (err.response.status === 500)
          setErrorMessages(["サーバー側でエラーが発生しました。"]);
        if (err.response.status === 400)
          setErrorMessages(["メールの有効期限切れです。"]);
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
    <div className="account_creation_base">
      <AccountCreateReadme />
      <div className="account_creation_form">
        <span hidden={submited}>
          <ErrorMessageList messages={errorMessages}></ErrorMessageList>
        </span>
        <div>
          <p className="account_creation_form__nickname_text">
            使用できる文字は半角英数字とハイフンのみです。
          </p>
          <input
            className="account_creation_form__input_nickname"
            type="text"
            placeholder="ニックネーム"
            onChange={(el) => setName(el.target.value)}
            value={name}
          ></input>
        </div>
        <div>
          <p className="account_creation_form__password_text">
            パスワードを決めてください。コピーやペーストはできません。
          </p>
          <input
            className="account_creation_form__input_password"
            type="password"
            placeholder="password"
            onChange={(el) => setPassword(el.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <p className="account_creation_form__confirm_password_text">
            確認のためもう一度パスワードを入力してください。
          </p>
          <input
            className="account_creation_form__input_password_confirm"
            type="password"
            placeholder="確認"
            onChange={(el) => setPasswordConfirm(el.target.value)}
            value={passwordConfirm}
          ></input>
        </div>
        <input
          className="account_creation_form__submit"
          type="submit"
          value="同意して送信"
          disabled={submited}
          onClick={() => {
            setSubmited(true);
            handleSubmit();
          }}
        ></input>
      </div>
    </div>
  );
};

const ErrorMessageList: React.FC<{ messages: string[] }> = (props) => {
  return (
    <ul
      className={
        props.messages.length === 0 ? "hidden" : "account_creation__error_base"
      }
    >
      {props.messages.map((message, index) => (
        <li key={index} className="account_creation__error_text">
          {message}
        </li>
      ))}
    </ul>
  );
};
