import React, { useState } from "react";
import * as network from "../../utils/network";
import { useHistory } from "react-router-dom";

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
    <div>
      <div></div>
      <div>
        <span hidden={submited}>
          <ErrorMessageList messages={errorMessages}></ErrorMessageList>
        </span>
        <p>
          <input
            type="text"
            placeholder="nickname"
            onChange={(el) => setName(el.target.value)}
            value={name}
          ></input>
        </p>
        <p>
          <input
            type="password"
            placeholder="password"
            onChange={(el) => setPassword(el.target.value)}
            value={password}
          ></input>
        </p>
        <p>
          <input
            type="password"
            placeholder="passowrd確認"
            onChange={(el) => setPasswordConfirm(el.target.value)}
            value={passwordConfirm}
          ></input>
        </p>
        <input
          type="submit"
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
    <ul>
      {props.messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};
