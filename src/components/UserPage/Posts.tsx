import React, { useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Div
} from "../../dot_style_generic_conponents/doms";
import { Radio } from "../../dot_style_generic_conponents/doms/input";
import { getWithAuthenticate } from "../../utils/network/AxiosWrapper";
import "./Posts.css";

type PostsProps = {
  name: string;
  is_my_page: boolean;
};

export const Posts: React.FC<{ data: PostsProps }> = (props) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [selected, setSelected] = useState("POSTS");
  const history = useHistory();
  const name = props.data.name;
  const dateToString = (date: Date) => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  // TODO: use custom hooks
  useMemo(async () => {
    setLinks(
      await getWithAuthenticate("/users/" + name + "/posts")
        .then((res) =>
          res.data.map((post: any, index: number) => {
            const date = new Date(post.created_at * 1000);
            return (
              <Link
                key={index}
                className="posts_list_item"
                to={`/users/${name}/posts/${post.id}`}
              >
                <p className="posts_list_item__date">
                  {dateToString(date) + "に投稿"}
                </p>
                <p className="posts_list_item__title">{post.title}</p>
              </Link>
            );
          })
        )
        .catch((e) => {
          console.log(e);
          return [];
        })
    );
  }, []);
  return (
    <div className="contents">
      <div className="contents__info">
        <Container>
          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noreferrer"
          >
            このブログで使えるmarkdownの記法
          </a>
        </Container>
      </div>
      {props.data.is_my_page ? (
        <span className="contents__post_button_area">
          <Button
            className="contents__post_button"
            domState="primary"
            value="新規投稿"
            onClick={() => {
              history.push("/users/" + name + "/posts/new");
            }}
          ></Button>
        </span>
      ) : (
        <div></div>
      )}
      <Container className="with-title">
        <Div className="title ps2p_text">
          <label>
            <Radio
              checked={selected === "POSTS"}
              onClick={() => {
                setSelected("POSTS");
              }}
            ></Radio>
            <span>POSTS</span>
          </label>
          <label>
            <Radio
              checked={selected === "BOOK_MARKS"}
              onClick={() => {
                setSelected("BOOK_MARKS");
              }}
            ></Radio>
            <span>BOOK_MARKS</span>
          </label>
        </Div>
        <div className="contents__posts_list">{links}</div>
      </Container>
    </div>
  );
};
