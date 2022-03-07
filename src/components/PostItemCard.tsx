import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CardContent } from "@mui/material";

type postItemCardProps = {
  title: string;
  body: string;
  userName: string;
  postID: number;
  created_at: number;
};

export const PostItemCard: React.FC<postItemCardProps> = ({
  postID,
  title,
  body,
  userName,
  created_at
}) => {
  const writtenDate = new Date(created_at * 1000);
  return (
    <Card sx={{ height: "200px" }}>
      <CardHeader
        avatar={<Link to={"/users/" + userName}>{"@" + userName}</Link>}
        title={dateToString(writtenDate)}
        sx={{ pb: "2px" }}
      />
      <Link
        to={"/users/" + userName + "/posts/" + postID}
        style={{
          textDecoration: "none"
        }}
      >
        <CardContent sx={{ pt: "3px" }}>
          <Typography
            mb="3px"
            sx={{
              marginTop: "10px",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize="small"
            sx={{ overflowX: "hidden" }}
          >
            {symbolRemoved(body)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

const symbolRemoved = (text: string) => {
  return text.replaceAll(/[`#]+/g, "");
};

const dateToString = (date: Date) => {
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分 に投稿`;
};
