import React from "react";
import "./Readme.css";

export const AccountCreateReadme: React.FC<{}> = () => {
  return (
    <div className="readme">
      <h3 className="readme__title">本サイトを利用する際の注意</h3>
      <p className="readme__line"></p>
      <h4 className="readme__subtitle">クッキーやデータの取扱い</h4>
      <ul className="readme__text_list_box">
        <li className="readme__text_list">
          本サイトではユーザーの識別にクッキーやGoogleの提供するユーザー保護機能並びにメールアドレス、パスワード、その他情報を使用します。
        </li>
        <li className="readme__text_list">
          これらの情報は以下の目的で利用されます。同意された方のみ利用できます。
        </li>
        <ul className="readme__text_list_box__nested">
          <li className="readme__text_list__nested">ユーザー識別のため。</li>
          <li className="readme__text_list__nested">
            ユーザーのプライバシー保護のため。
          </li>
        </ul>
        <li className="readme__text_list">
          これらの情報は適切に取り扱います。不明な点は管理者へお問い合わせください。
        </li>
      </ul>
    </div>
  );
};
