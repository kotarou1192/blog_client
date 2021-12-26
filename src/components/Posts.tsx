import React, { useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";
import "./Posts.css";

type PostsProps = {
  name: string;
  is_my_page: boolean;
};

export const Posts: React.FC<{ data: PostsProps }> = (props) => {
  const [links, setLinks] = useState<Link[]>([]);
  const history = useHistory();
  const name = props.data.name;
  const dateToString = (date: Date) => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };
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
      <div className="contents__info">something</div>
      {props.data.is_my_page ? (
        <input
          type="submit"
          className="contents__post contents__post_button"
          value="新規投稿"
          onClick={() => {
            history.push("/users/" + name + "/posts/new");
          }}
        ></input>
      ) : (
        <div></div>
      )}
      <p className="contents__posts_list_title">記事</p>
      <div className="contents__posts_list">{links}</div>
    </div>
  );
};
