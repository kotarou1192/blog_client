import React from "react";
import "./User.css";

type UserProps = {
  name: string;
  is_my_page: boolean;
};

export const User: React.FC<{ data: UserProps }> = (props) => {
  return (
    <div className="user">
      <div className="user__image"></div>
      <p className="user__name">{props.data.name}</p>
      <p className="user__info_text">ここに自己紹介とか</p>
    </div>
  );
};
