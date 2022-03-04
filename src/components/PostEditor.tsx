/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { useHistory } from "react-router-dom";
import { getUserName } from "../utils/CookiesWrapper";
import { AxiosResponse } from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Toolbar,
  TextField,
  Typography,
  Link,
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
    <Container disableGutters fixed sx={{ width: "100hv" }}>
      <Toolbar sx={{ borderBottom: 1, width: "100hv", borderColor: "divider" }}>
        <Link href="#" underline="hover">
          {getUserName()}
        </Link>
        <Typography
          variant="body2"
          align="left"
          sx={{ flexGrow: 1, fontSize: "small", color: "#a0a0a0", ml: "20px" }}
        >
          <span style={{ color: "black" }}>投稿: </span>
          {dateToString(new Date())}
          <span style={{ color: "black" }}>{" 最終更新: "}</span>
          {dateToString(new Date())}
        </Typography>
      </Toolbar>
      <Container
        sx={{
          overflowY: "hidden",
          boxShadow: "0 0 4px gray",
          mt: "10px",
          minHeight: "calc(100vh - 165px)"
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          fontWeight="bold"
          sx={{ pt: "10px", borderBottom: 1, borderColor: "gray" }}
        >
          {title}
        </Typography>
        <ReactMarkdown components={{ code: CodeBlock }}>{body}</ReactMarkdown>
      </Container>
    </Container>
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
