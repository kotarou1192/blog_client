import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Avatar, CardContent, Chip, Box } from "@mui/material";
import { CDN_URL } from "../../utils/network/Constants";
import { Category } from "../../@types/global";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

type postItemCardProps = {
  title: string;
  body: string;
  avatarURL?: string;
  categories: Category[];
  userName: string;
  postID: number;
  created_at: number;
};

export const PostItemCard: React.FC<postItemCardProps> = ({
  postID,
  title,
  avatarURL,
  body,
  categories,
  userName,
  created_at
}) => {
  const writtenDate = new Date(created_at * 1000);
  const avatarSrc = avatarURL ? CDN_URL + "/" + avatarURL : "";

  const hideLinkUnderLine = { textDecoration: "none" };

  const genAvatar = () => {
    return avatarSrc ? (
      <Link to={"/users/" + userName} style={hideLinkUnderLine}>
        <Avatar alt={userName} src={avatarSrc} />
      </Link>
    ) : (
      <Link to={"/users/" + userName} style={hideLinkUnderLine}>
        <Avatar>{userName[0]}</Avatar>
      </Link>
    );
  };

  const genTags = () => {
    return categories.map((category) => {
      return (
        <Link
          key={category.value.id}
          to={
            "/search/posts?category_scope=sub&category_ids=" + category.value.id
          }
          style={{ textDecoration: "none", height: "30px", marginRight: "3px" }}
        >
          <Chip
            size="small"
            icon={<LocalOfferIcon fontSize="small" />}
            onClick={() => {}}
            label={category.value.sub_category_name}
          />
        </Link>
      );
    });
  };

  const CARD_BASE_HEIGHT = 280;

  const tags = genTags();

  return (
    <Card sx={{ height: CARD_BASE_HEIGHT + "px" }}>
      <CardHeader
        avatar={genAvatar()}
        title={<Link to={"/users/" + userName}>{"@" + userName}</Link>}
        subheader={dateToString(writtenDate)}
        sx={{ pb: "2px", height: "60px" }}
      />
      <CardContent
        sx={{
          pt: "3px"
        }}
      >
        <div style={{ height: "100px", overflowY: "hidden" }}>
          <Link
            to={"/users/" + userName + "/posts/" + postID}
            style={{
              textDecoration: "none"
            }}
          >
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
          </Link>
        </div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            borderTop: 1,
            borderColor: "divider",
            pt: "5px",
            pl: "5px",
            pr: "5px"
          }}
        >
          {tags}
        </Box>
      </CardContent>
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
