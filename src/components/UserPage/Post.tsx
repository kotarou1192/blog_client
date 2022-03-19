import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Grid } from "@mui/material";
import React from "react";
import { useGetAPI } from "../../utils/useAPI";
import { NotFound } from "../NotFound";
import "../hideScrollbar.css";
import { Link as RLink } from "react-router-dom";
import { SmallPostItemCard } from "../SmallPostItemCard";

type PostsProps = {
  name: string;
  is_my_page: boolean;
};

export const Posts: React.FC<{ data: PostsProps }> = (props) => {
  const name = props.data.name;

  const links: 404 | undefined | any[] = useGetAPI(
    "/users/" + name + "/" + "posts" //selected
  );

  if (!links) return <div></div>;
  if (links === 404) return <NotFound />;

  const linkComponents = links.map((post: any, index) => {
    return (
      <SmallPostItemCard
        key={index}
        userName={post.user_name}
        avatarURL={post.user_avatar}
        postID={post.id}
        title={post.title}
        categories={post.categories}
        body={post.body}
        created_at={post.created_at}
      />
    );
  });

  return (
    <div style={{ height: "70vh" }}>
      {props.data.is_my_page ? (
        <div style={{ textAlign: "center", height: "10vh" }}>
          <RLink to={"/users/" + name + "/posts/new"}>
            <Button
              startIcon={<FontAwesomeIcon icon={faPen} />}
              component="span"
              variant="outlined"
              sx={{ mt: "5px", mb: "5px" }}
            >
              新規投稿
            </Button>
          </RLink>
        </div>
      ) : (
        <div style={{ height: "10vh" }}></div>
      )}
      <Grid
        container
        spacing={2}
        sx={{
          overflowY: "scroll",
          mr: "2px",
          borderRadius: "4px",
          scrollbarWidth: "none",
          border: "inherit 1",
          boxShadow: "0px 0px 1px 0px gray",
          height: "60vh"
        }}
      >
        {linkComponents}
      </Grid>
    </div>
  );
};
