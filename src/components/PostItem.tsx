import React, { useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  deleteWithAuthenticate,
  getWithAuthenticate
} from "../utils/network/AxiosWrapper";
import "./PostItem.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { getUserName } from "../utils/CookiesWrapper";

type PostItemProps = {
  match: {
    params: {
      name: string;
      id: number;
    };
  };
};

type PostItemParams = {
  id: number;
  user_id: string;
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
};

export const PostItem: React.FC<PostItemProps> = (props) => {
  const [postItem, setPostItem] = useState<PostItemParams | undefined>();
  const [submitDelete, setSubmitDelete] = useState(false);
  const history = useHistory();
  const name = props.match.params.name;
  const id = props.match.params.id;
  const myName = getUserName();
  const dateToString = (date: Date): string => {
    return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  useMemo(async () => {
    setPostItem(
      await getWithAuthenticate("/users/" + name + "/posts/" + id)
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
          return undefined;
        })
    );
  }, []);

  if (postItem == undefined) return <div></div>;

  return (
    <div className="post_item_base">
      <div></div>
      <div className="post_item">
        <div className="post_item__head">
          <div className="head__oneline">
            <Link to={"/users/" + name} className="head__user_name">
              {name}
            </Link>
            <div className="post_edit__button_area">
              <input
                type="submit"
                className="post_edit__submit_button"
                hidden={name === myName}
                value="編集"
                onClick={() =>
                  history.push("/users/" + name + "/posts/" + id + "/edit")
                }
              ></input>
              <DeleteButton
                name={name}
                setSubmitDelete={setSubmitDelete}
                myName={myName}
                id={id}
                submitDelete={submitDelete}
                history={history}
              />
            </div>
          </div>
          <div className="head__base head__date">
            <p className="head__base date__created_at">
              投稿: {dateToString(new Date(postItem.created_at * 1000))}
            </p>
            <p className="head__base date__updated_at">
              最終更新: {dateToString(new Date(postItem.updated_at * 1000))}
            </p>
          </div>
          <p className="head__base head__title">{postItem.title}</p>
        </div>
        <div className="post_item__body">
          <ReactMarkdown components={{ code: CodeBlock }}>
            {postItem.body}
          </ReactMarkdown>
        </div>
      </div>
      <div></div>
    </div>
  );
};

type ButtonProps = {
  name: string;
  myName: string;
  submitDelete: boolean;
  history: any;
  id: number;
  setSubmitDelete: any;
};

const DeleteButton: React.FC<ButtonProps> = ({
  name,
  myName,
  submitDelete,
  history,
  id,
  setSubmitDelete
}) => {
  return (
    <input
      type="submit"
      className="post_delete__submit_button"
      hidden={name === myName}
      value="削除"
      onClick={() => {
        if (submitDelete) {
          deleteWithAuthenticate("/users/" + name + "/posts/" + id).then(
            (res) => {
              if (res.status === 200) return history.push("/users/" + name);
            }
          );
          return;
        }
        window.alert(
          "本当に削除しますか？\n一度消すと戻せません\n確定する場合はもう一度【削除】を押してください"
        );
        setSubmitDelete(true);
      }}
    ></input>
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
