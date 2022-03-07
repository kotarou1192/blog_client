import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";

type UserProps = {
  name: string;
};

export const UserCard: React.FC<UserProps> = ({ name }) => {
  return (
    <Link to={"/users/" + name}>
      <Card sx={{ height: "50px" }}>
        <CardHeader avatar={"@" + name} sx={{ pb: "2px" }} />
      </Card>
    </Link>
  );
};
