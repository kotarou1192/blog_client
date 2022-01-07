import React from "react";
import { useGetAPI } from "../../utils/useAPI";
import { NotFound } from "../NotFound";
import { Posts } from "./Posts";
import { User } from "./User";
import "./UserPage.css";

type UserProps = {
  match: {
    params: UserParams;
  };
};

type UserParams = {
  name: string;
  is_my_page: boolean;
};

export const UserPage: React.FC<UserProps> = (props) => {
  const name = props.match.params.name;

  const userData: 404 | undefined | UserParams = useGetAPI("/users/" + name);

  if (!userData) return <div>loading</div>;
  if (userData === 404) return <NotFound></NotFound>;
  return (
    <div className="user_page">
      <User data={userData} />
      <Posts data={userData} />
    </div>
  );
};
