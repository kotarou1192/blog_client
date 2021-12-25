/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./PostEditor.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { Link, useHistory } from "react-router-dom";
import { getUserName, logout } from "../utils/CookiesWrapper";
import { AxiosResponse } from "axios";

type PostEdirotProps = {
  post: {
    title: string;
    body: string;
  };
  setPost: any;
  handlePostToAPI: any;
  buttonDisabled: boolean;
  setDisabled: any;
};

export const PostEditor: React.FC<PostEdirotProps> = (props) => {
  const [isPreview, setPreview] = useState(false);
  const history = useHistory();
  const name = getUserName();

  const buttonDisableWhenRequest = () => {
    props.setDisabled(true);
    props
      .handlePostToAPI()
      .then((res: AxiosResponse) => {
        console.log("success");
        console.log(res.status);
        if (res.status === 200) history.push("/users/" + name);
      })
      .catch(() => {
        console.error("error");
        logout();
      });
  };

  return (
    <div className="editor_base">
      <div></div>
      <div className="editor">
        <div className="editor__button_area">
          <input
            type="submit"
            disabled={props.buttonDisabled}
            className="editor__preview_button"
            onClick={() => setPreview(!isPreview)}
            value={isPreview ? "編集に戻る" : "プレビューを見る"}
          ></input>
          <input
            type="submit"
            disabled={props.buttonDisabled}
            className="editor__submit_button"
            value="投稿"
            onClick={buttonDisableWhenRequest}
          ></input>
        </div>
        {isPreview ? (
          <Preview title={props.post.title} body={props.post.body} />
        ) : (
          <Editor post={props.post} setPost={props.setPost} />
        )}
      </div>
      <div></div>
    </div>
  );
};

const Preview: React.FC<{ title: string; body: string }> = ({
  title,
  body
}) => {
  const dateToString = (date: Date): string => {
    return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  title = title === "" ? "NoTitle" : title;

  return (
    <div className="post_item">
      <div className="post_item__head">
        <div className="head__base">
          <Link to={"/users/" + name} className="head__user_name">
            {getUserName()}
          </Link>
        </div>
        <div className="head__base head__date">
          <p className="head__base date__created_at">
            投稿: {dateToString(new Date())}
          </p>
          <p className="head__base date__updated_at">
            最終更新: {dateToString(new Date())}
          </p>
        </div>
        <p className="head__base head__title">{title}</p>
      </div>
      <ReactMarkdown
        className="post_item__body"
        components={{ code: CodeBlock }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
};

const Editor: React.FC<{
  post: {
    title: string;
    body: string;
  };
  setPost: any;
}> = (props) => {
  return (
    <div className="editor">
      <input
        type="text"
        className="editor__title_input"
        placeholder="NoTitle"
        value={props.post.title}
        onChange={(el) =>
          props.setPost({ body: props.post.body, title: el.target.value })
        }
      ></input>
      <div className="editor__body_input">
        <textarea
          className="editor__body_textarea"
          value={props.post.body}
          onChange={(el) =>
            props.setPost({ title: props.post.title, body: el.target.value })
          }
        ></textarea>
      </div>
    </div>
  );
};

const CodeBlock: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
  ...props
}: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={darcula}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
