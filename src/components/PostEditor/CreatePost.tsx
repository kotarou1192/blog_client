import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postWithAuthenticate } from "../../utils/network/AxiosWrapper";
import { PostEditor } from "./PostEditor";

type CreatePostProps = {
  match: {
    params: {
      name: string;
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
  user_id?: string;
  user_name: string;
  user_avatar: string;
  categories: Category[];
  sub_category_ids: number[];
  title: string;
  body: string;
  created_at?: number;
  updated_at?: number;
};

export const CreatePost: React.FC<CreatePostProps> = (props) => {
  const name = props.match.params.name;
  const [post, setPost] = useState<PostItemParams>({
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
  const [buttonDisabled, setDisabled] = useState(true);

  const handlePostToAPI = async () => {
    const { title, body, sub_category_ids } = post;
    const postParams = { title, body, sub_category_ids };
    await postWithAuthenticate("/users/" + name + "/posts", postParams)
      .then(() => {
        console.log("success");
        //TODO: responseでidを返す。
        history.push("/users/" + name);
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });
  };

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
