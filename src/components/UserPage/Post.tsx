import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Box,
  ListItem,
  List,
  ListItemText,
  Typography
} from "@mui/material";
import React from "react";
import { useGetAPI } from "../../utils/useAPI";
import { NotFound } from "../NotFound";
import "../hideScrollbar.css";
import { Link as RLink } from "react-router-dom";

type PostsProps = {
  name: string;
  is_my_page: boolean;
};

export const Posts: React.FC<{ data: PostsProps }> = (props) => {
  const name = props.data.name;
  const dateToString = (date: Date) => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  const links: 404 | undefined | any[] = useGetAPI(
    "/users/" + name + "/" + "posts" //selected
  );

  if (!links) return <div></div>;
  if (links === 404) return <NotFound />;

  const linkComponents = links.map((post: any, index) => {
    const date = new Date(post.created_at * 1000);
    return (
      <ListItem key={index} alignItems="flex-start">
        <ListItemText
          sx={{
            height: "80px",
            overflowX: "hidden",
            boxShadow: "0px 0px 1px 0px gray"
          }}
          primary={
            <Typography
              sx={{
                mt: "5px",
                ml: "8px",
                color: "gray",
                fontSize: "small"
              }}
            >
              {dateToString(date) + "に投稿"}
            </Typography>
          }
          secondary={
            <RLink
              to={`/users/${name}/posts/${post.id}`}
              style={{
                textDecoration: "none",
                marginTop: "10px",
                marginLeft: "8px",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              {post.title}
            </RLink>
          }
        ></ListItemText>
      </ListItem>
    );
  });

  return (
    <Box sx={{ textAlign: "center" }}>
      {props.data.is_my_page ? (
        <Button
          startIcon={<FontAwesomeIcon icon={faPen} />}
          variant="outlined"
          href={"/users/" + name + "/posts/new"}
          sx={{ mt: "5px", mb: "5px" }}
        >
          新規投稿
        </Button>
      ) : (
        <div></div>
      )}
      <List
        className="scrollbar__hide"
        sx={{
          overflowY: "scroll",
          mr: "2px",
          borderRadius: "4px",
          scrollbarWidth: "none",
          border: "inherit 1",
          boxShadow: "0px 0px 1px 0px gray",
          height: "540px"
        }}
      >
        {linkComponents}
      </List>
    </Box>
  );
};
