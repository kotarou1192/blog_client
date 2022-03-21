import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";
import { Avatar, CardContent, Typography } from "@mui/material";
import { CDN_URL } from "../../utils/network/Constants";

type UserProps = {
  name: string;
  avatar?: string;
  explanation?: string;
};

export const UserCard: React.FC<UserProps> = ({
  name,
  avatar,
  explanation
}) => {
  const avatarSrc = avatar ? CDN_URL + "/" + avatar : "";
  const hideLinkUnderLine = { textDecoration: "none" };

  const genAvatar = () => {
    return avatarSrc ? (
      <Link to={"/users/" + name} style={hideLinkUnderLine}>
        <Avatar alt={name} src={avatarSrc} />
      </Link>
    ) : (
      <Link to={"/users/" + name} style={hideLinkUnderLine}>
        <Avatar>{name[0]}</Avatar>
      </Link>
    );
  };

  return (
    <Card sx={{ height: "100px" }}>
      <CardHeader
        title={
          <Link to={"/users/" + name} style={hideLinkUnderLine}>
            {"@" + name}
          </Link>
        }
        avatar={genAvatar()}
        sx={{ pb: "2px" }}
      />
      <CardContent sx={{ pt: "3px" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          fontSize="small"
          sx={{ overflowX: "hidden" }}
        >
          {explanation}
        </Typography>
      </CardContent>
    </Card>
  );
};
