import React from "react";
import { UserPage } from "./UserPage/UserPage";
import { getUserName } from "../utils/CookiesWrapper";

export const MyPage: React.FC<{}> = () => {
  return (
    <UserPage match={{ params: { name: getUserName(), is_my_page: true } }} />
  );
};
