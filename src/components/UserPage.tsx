import React, { useState } from "react";
import axios from "axios";

type UserProps = {
  match: {
    params: UserParams;
  };
};

type UserParams = {
  name: string;
};

export const UserPage: React.FC<UserProps> = (props) => {
  const [userData, setUserData] = useState({});
  const name = props.match.params.name;
  axios
    .get("https://api.takashiii-hq.com/users/" + name)
    .then((res) => setUserData(res.data))
    .catch((e) => console.log(e));
  return <div>{userData}</div>;
};
