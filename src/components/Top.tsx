import { Card, Grid, CardContent, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { LatestPosts } from "./LatestPosts";

export const Top: React.FC<{}> = () => {
  const [latestPosts, setLatestPosts] = useState();

  return (
    <Box
      sx={{
        padding: 0,
        margin: 0,
        pt: "10px",
        width: "100%",
        height: "100%"
      }}
    >
      <Card
        sx={{
          width: "75%",
          marginRight: "auto",
          marginLeft: "auto",
          boxShadow: "",
          mt: "20px",
          mb: "20px"
        }}
      >
        <CardContent>
          <Typography variant="h5" mb="5px">
            お知らせ
          </Typography>
          <Typography variant="h6" mb="5px">
            このサイトはβ版です。
          </Typography>
          <Typography variant="body2">
            2022.3.7 トップページのデザインを更新しました
          </Typography>
        </CardContent>
      </Card>
      <Grid container marginRight="auto" marginLeft="auto">
        <Grid item md={2} sm={2}></Grid>
        <Grid item md={8} sm={8}>
          <Grid container spacing={3}>
            <LatestPosts
              latestPosts={latestPosts}
              setLatestPosts={setLatestPosts}
            />
          </Grid>
        </Grid>
        <Grid item md={2} sm={2}></Grid>
      </Grid>
    </Box>
  );
};
