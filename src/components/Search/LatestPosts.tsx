import React, { useMemo } from "react";
import { getWithAuthenticate } from "../../utils/network/AxiosWrapper";
import { PostItemCard } from "./PostItemCard";
import { Grid } from "@mui/material";

type SearchResultsProps = {
  latestPosts: any[] | undefined;
  setLatestPosts: any;
  targetCategory: { id: number; name: string };
};

export const LatestPosts: React.FC<SearchResultsProps> = ({
  latestPosts,
  setLatestPosts,
  targetCategory
}) => {
  const searchPosts = async () => {
    await getWithAuthenticate("/search/posts", {
      keywords: "_",
      order_type: "new",
      category_scope: "base",
      category_ids: targetCategory.id === 0 ? "" : targetCategory.id
    })
      .then((res) => {
        setLatestPosts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useMemo(searchPosts, [targetCategory.id, latestPosts?.length]);
  return (
    <Grid container spacing={2} sx={{ mt: "10px" }}>
      {latestPosts == null ? (
        <span></span>
      ) : (
        latestPosts.map((latestPost, index) => (
          <Grid item md={6} key={index}>
            <PostItemCard
              userName={latestPost.user_name}
              avatarURL={latestPost.user_avatar}
              postID={latestPost.id}
              title={latestPost.title}
              categories={latestPost.categories}
              body={latestPost.body}
              created_at={latestPost.created_at}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};
