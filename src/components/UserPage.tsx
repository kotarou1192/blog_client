import React, { useMemo, useState } from "react";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";
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
  const [userData, setUserData] = useState<UserParams>({
    name: "",
    is_my_page: false
  });
  const name = props.match.params.name;
  useMemo(async () => {
    setUserData(
      await getWithAuthenticate("/users/" + name)
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
          return { name: "" };
        })
    );
  }, []);
  if (userData.name === "") return <div>loading</div>;
  return (
    <div className="user_page">
      <User data={userData} />
      <Posts data={userData} />
    </div>
  );
};
