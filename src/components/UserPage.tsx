import React, { useMemo, useState } from "react";
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
  const [userData, setUserData] = useState<UserParams>({ name: "" });
  const name = props.match.params.name;
  console.log("1");
  useMemo(async () => {
    setUserData(
      await axios
        .get("https://api.takashiii-hq.com/users/" + name)
        .then((res) => res.data)
        .catch((e) => console.log(e))
    );
  }, []);
  return (
    <div>
      {Object.entries(userData).map((val, id) => (
        <p key={id}>{val[0] + ": " + val[1]}</p>
      ))}
    </div>
  );
};
