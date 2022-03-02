import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGetAPI } from "../../utils/useAPI";
import { NotFound } from "../NotFound";
import "./Posts.css";

type PostsProps = {
  name: string;
  is_my_page: boolean;
};

export const Posts: React.FC<{ data: PostsProps }> = (props) => {
  const [selected, setSelected] = useState("posts");
  const history = useHistory();
  const name = props.data.name;
  const dateToString = (date: Date) => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  const links: 404 | undefined | any[] = useGetAPI(
    "/users/" + name + "/" + "posts" //selected
  );

  if (!links) return <NotFound />;
  if (links === 404) return <NotFound />;

  const linkComponents = links.map((post: any, index: number) => {
    const date = new Date(post.created_at * 1000);
    return (
      <Link
        key={index}
        className="posts_list_item"
        to={`/users/${name}/posts/${post.id}`}
      >
        <p className="posts_list_item__date">{dateToString(date) + "に投稿"}</p>
        <p className="posts_list_item__title">{post.title}</p>
      </Link>
    );
  });

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
              checked={selected === "posts"}
              onChange={() => {
                setSelected("posts");
              }}
            ></Radio>
            <span>POSTS</span>
          </label>
          <label>
            <Radio
              checked={selected === "book_marks"}
              onChange={() => {
                setSelected("book_marks");
              }}
            ></Radio>
            <span>BOOK_MARKS</span>
          </label>
        </Div>
        <div className="contents__posts_list">{linkComponents}</div>
      </Container>
    </div>
  );
};
