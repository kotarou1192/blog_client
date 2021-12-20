import React, { useState } from "react";
import axios from "axios";
import { useMemo } from "react-router/node_modules/@types/react";

type UserProps = {
  match: {
    params: UserParams;
  };
};

type UserParams = {
  name: string;
};

export const UserPage: React.FC<UserProps> = (props) => {
  const name = props.match.params.name;
  const userData = useMemo(async () => {
    await axios
      .get("https://api.takashiii-hq.com/users/" + name)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }, []);
  return <div>{userData}</div>;
};
