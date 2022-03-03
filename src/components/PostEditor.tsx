/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { Link, useHistory } from "react-router-dom";
import { getUserName } from "../utils/CookiesWrapper";
import { AxiosResponse } from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Toolbar,
  TextField,
  Button,
  Container,
  TextareaAutosize
} from "@mui/material";
import "./hideScrollbar.css";

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
        props.setDisabled(false);
      });
  };

  return (
    <Container>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button
          variant="outlined"
          disabled={props.buttonDisabled}
          onClick={() => setPreview(!isPreview)}
        >
          {isPreview ? "編集に戻る" : "プレビュー"}
        </Button>
        <Button
          variant="contained"
          disabled={props.buttonDisabled}
          onClick={buttonDisableWhenRequest}
          sx={{ ml: "80%" }}
        >
          投稿
        </Button>
      </Toolbar>
      {isPreview ? (
        <Preview title={props.post.title} body={props.post.body} />
      ) : (
        <Editor post={props.post} setPost={props.setPost} />
      )}
    </Container>
  );
};

const Preview: React.FC<{ title: string; body: string }> = ({
  title,
  body
}) => {
  const dateToString = (date: Date): string => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
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
    <Container maxWidth="lg">
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TextField
          id="standard-basic"
          fullWidth
          label="Title"
          variant="standard"
          value={props.post.title}
          onChange={(el: any) =>
            props.setPost({ body: props.post.body, title: el.target.value })
          }
        />
      </Toolbar>
      <TextareaAutosize
        className="scrollbar__hide"
        value={props.post.body}
        onChange={(el) =>
          props.setPost({ title: props.post.title, body: el.target.value })
        }
        minRows={38}
        maxRows={38}
        style={{
          resize: "none",
          display: "block",
          width: "100%",
          padding: "20px",
          overflowY: "scroll"
        }}
      ></TextareaAutosize>
    </Container>
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
