import React, { useMemo, useState } from "react";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";

type UserProps = {
  match: {
    params: UserParams;
  };
};

type UserParams = {
  name: string;
};

export const UserPage: React.FC<UserProps> = (props) => {
  const [userData, setUserData] = useState<UserParams>({ name: "" });
  const name = props.match.params.name;
  console.log("loading");
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
  return (
    <div>
      {userData.name === ""
        ? "loading"
        : Object.entries(userData).map((val, id) => (
            <p key={id}>{val[0] + ": " + val[1]}</p>
          ))}
    </div>
  );
};
