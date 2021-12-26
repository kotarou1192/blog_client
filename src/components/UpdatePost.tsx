import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getWithAuthenticate,
  putWithAuthenticate
} from "../utils/network/AxiosWrapper";
import { PostEditor } from "./PostEditor";

type UpdatePostProps = {
  match: {
    params: {
      name: string;
      id: number;
    };
  };
};

export const UpdatePost: React.FC<UpdatePostProps> = (props) => {
  const [post, setPost] = useState<{ title: string; body: string }>({
    title: "",
    body: ""
  });
  const [buttonDisabled, setDisabled] = useState(false);
  const name = props.match.params.name;
  const id = props.match.params.id;
  const history = useHistory();

  useMemo(async () => {
    setPost(
      await getWithAuthenticate("/users/" + name + "/posts/" + id)
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
          return { title: "", body: "" };
        })
    );
  }, []);

  const handlePostToAPI = async () => {
    await putWithAuthenticate("/users/" + name + "/posts/" + id, post)
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
