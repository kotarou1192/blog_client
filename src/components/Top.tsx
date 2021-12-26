import React from "react";
import { Link } from "react-router-dom";

export const Top: React.FC<{}> = () => {
  return (
    <div>
      <div>
        <h2>このサイトについて</h2>
        <p>
          ブログを書きたいなと思ったので制作しているブログ投稿アプリです。
          <br></br>
          ユーザー登録すればブログをmarkdown記法で書けます。マークダウンについては
          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noreferrer"
          >
            こちら
          </a>
          をお読みください。<br></br>
          このサイトは作成中なので、頻繁に予告無しで仕様を変更します。<br></br>
          個人の趣味のようなものなので利用時になにかあっても自己責任でお願いいたします。
          <br></br>
        </p>
        <h2>サンプルページ</h2>
        <Link to="/users/takashiii">サイト製作者のマイページです</Link>
        <br></br>
        <Link to="/users/takashiii/posts/8">
          こういった記事を書くことが出来ます
        </Link>
        <br></br>
        <p></p>
        プレビュー機能がついており、markdownを書いている途中に表示される見た目を確認できます。
        <Link to="/users/takashiii/posts/new">
          こちらで投稿ページを試すことが出来ます
        </Link>
        <h2>ソースコード</h2>
        <a
          href="https://github.com/kotarou1192/blog_client"
          target="_blank"
          rel="noreferrer"
        >
          クライアントサイドのソースコード
        </a>
        <br></br>
        <a
          href="https://github.com/kotarou1192/blog_api"
          target="_blank"
          rel="noreferrer"
        >
          サーバーサイドのソースコード
        </a>
        <h2>やらないでほしいこと</h2>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>他社や私のサービスを妨害する行為</li>
          <li>暴力的で露骨な表現の掲載</li>
          <li>露骨な宣伝や他サイトへの誘導</li>
        </ul>
        <p>あなたの常識の範囲内で使ってください。</p>
        <p>
          今後は削除依頼などをフォームで受け付ける予定です。<br></br>
          現在このサイトは作成途中で著作権等の規約を掲載出来ていないため、著作権がどうのとか言われても困ります。
          <br></br>
          障害などにより突然記事が消えることもありうるので自己責任でご利用ください。
          <br></br>
        </p>
      </div>
    </div>
  );
};
