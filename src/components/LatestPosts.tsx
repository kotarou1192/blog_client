import React, { useMemo } from "react";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";
import { PostItemCard } from "./PostItemCard";
import { Grid } from "@mui/material";

type SearchResultsProps = {
  latestPosts: any[] | undefined;
  setLatestPosts: any;
};

export const LatestPosts: React.FC<SearchResultsProps> = ({
  latestPosts,
  setLatestPosts
}) => {
  const searchPosts = async () => {
    await getWithAuthenticate("/search/posts", {
      keywords: "_",
      order_type: "new"
    })
      .then((res) => {
        setLatestPosts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useMemo(searchPosts, []);
  return (
    <Grid container spacing={2} sx={{ mt: "10px" }}>
      {latestPosts == null ? (
        <span></span>
      ) : (
        latestPosts.map((latestPost, index) => (
          <Grid item md={6} key={index}>
            <PostItemCard
              userName={latestPost.user_name}
              postID={latestPost.id}
              title={latestPost.title}
              body={latestPost.body}
              created_at={latestPost.created_at}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};
