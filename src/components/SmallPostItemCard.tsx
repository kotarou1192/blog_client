import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CardContent, Chip, Box, Grid } from "@mui/material";
import { Category } from "../@types/global";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type postItemCardProps = {
  title: string;
  body: string;
  avatarURL?: string;
  categories: Category[];
  userName: string;
  postID: number;
  created_at: number;
};

export const SmallPostItemCard: React.FC<postItemCardProps> = ({
  postID,
  title,
  body,
  categories,
  userName,
  created_at
}) => {
  const writtenDate = new Date(created_at * 1000);

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

  const CARD_BASE_HEIGHT = 140;

  const tags = genTags();

  return (
    <Grid item md={12}>
      <Card sx={{ height: CARD_BASE_HEIGHT + "px" }}>
        <CardHeader
          title={
            <Link
              to={"/users/" + userName + "/posts/" + postID}
              style={{
                textDecoration: "none"
              }}
            >
              <Typography
                mb="1px"
                sx={{
                  marginTop: "10px",
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              >
                {title}
              </Typography>
            </Link>
          }
          subheader={
            <Link
              to={"/users/" + userName + "/posts/" + postID}
              style={{
                textDecoration: "none",
                fontSize: "small",
                color: "gray"
              }}
            >
              {dateToString(writtenDate)}
            </Link>
          }
          sx={{ pb: "2px", height: "60px" }}
        />
        <CardContent
          sx={{
            pt: "3px"
          }}
        >
          <div style={{ height: "40px", overflowY: "hidden" }}>
            <Link
              to={"/users/" + userName + "/posts/" + postID}
              style={{
                textDecoration: "none"
              }}
            >
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
              pt: "1px",
              pl: "1px",
              pr: "1px"
            }}
          >
            {tags.slice(0, 5)}
            {tags.length > 5 ? (
              <Chip
                size="small"
                icon={<AddCircleOutlineIcon fontSize="small" />}
                onClick={() => {}}
                label={tags.length - 5 + "more..."}
              />
            ) : (
              <span></span>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
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
