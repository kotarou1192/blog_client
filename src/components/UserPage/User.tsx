import React from "react";
import { Container } from "../../dot_style_generic_conponents/doms";
import "./User.css";

type UserProps = {
  name: string;
  is_my_page: boolean;
};

export const User: React.FC<{ data: UserProps }> = (props) => {
  return (
    <div className="user_info">
      <p className="space"></p>
      <Container className="with-title user" isRounded>
        <p className="ps2p_text title">{props.data.name}</p>
        <div className="user__image"></div>
        <div className="user__info_text">something</div>
      </Container>
    </div>
  );
};
