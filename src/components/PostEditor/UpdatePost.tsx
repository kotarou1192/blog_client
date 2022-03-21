import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getWithAuthenticate,
  putWithAuthenticate
} from "../../utils/network/AxiosWrapper";
import { PostEditor } from "./PostEditor";

type UpdatePostProps = {
  match: {
    params: {
      name: string;
      id: number;
    };
  };
};

type Category = {
  tag_id: number;
  value: {
    id: number;
    base_category_name: string;
    sub_category_name: string;
  };
};

type PostItemParams = {
  id: number;
  user_id: string;
  user_name: string;
  user_avatar: string;
  categories: Category[];
  sub_category_ids: number[];
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
};

export const UpdatePost: React.FC<UpdatePostProps> = (props) => {
  const [buttonDisabled, setDisabled] = useState(false);
  const name = props.match.params.name;
  const id = props.match.params.id;
  const [post, setPost] = useState<PostItemParams>({
    id: id,
    user_id: "",
    user_name: name,
    user_avatar: "",
    categories: [],
    sub_category_ids: [],
    title: "",
    body: "",
    created_at: 0,
    updated_at: 0
  });
  const history = useHistory();

  useMemo(async () => {
    const res = await getWithAuthenticate("/users/" + name + "/posts/" + id)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
        return {
          id: 0,
          user_id: "",
          user_name: "",
          user_avatar: "",
          categories: [],
          sub_category_ids: [],
          title: "",
          body: "",
          created_at: 0,
          updated_at: 0
        };
      });
    res.sub_category_ids = res.categories.map(
      (category: Category) => category.value.id
    );
    setPost(res);
  }, []);

  const handlePostToAPI = async () => {
    const { title, body, sub_category_ids } = post;
    const postParams = { title, body, sub_category_ids };
    await putWithAuthenticate("/users/" + name + "/posts/" + id, postParams)
      .then(() => {
        console.log("success");
        //TODO: responseでidを返す。
        history.push("/users/" + name + "/posts/" + id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // while loading
  if (post.body == "") return <div></div>;

  return (
    <PostEditor
      post={post}
      setPost={setPost}
      handlePostToAPI={handlePostToAPI}
      buttonDisabled={buttonDisabled}
      setDisabled={setDisabled}
    />
  );
};
