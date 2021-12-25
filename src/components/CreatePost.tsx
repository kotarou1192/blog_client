import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postWithAuthenticate } from "../utils/network/AxiosWrapper";
import { PostEditor } from "./PostEditor";

type CreatePostProps = {
  match: {
    params: {
      name: string;
    };
  };
};

export const CreatePost: React.FC<CreatePostProps> = (props) => {
  const [post, setPost] = useState<{ title: string; body: string }>({
    title: "",
    body: ""
  });
  const name = props.match.params.name;
  const history = useHistory();
  const [buttonDisabled, setDisabled] = useState(false);

  const handlePostToAPI = async () => {
    await postWithAuthenticate("/users/" + name + "/posts", post)
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
