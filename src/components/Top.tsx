import {
  Card,
  Grid,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  alpha
} from "@mui/material";
import React, { useState } from "react";
import { useGetAPI } from "../utils/useAPI";
import { LatestPosts } from "./LatestPosts";

export const Top: React.FC<{}> = () => {
  const [latestPosts, setLatestPosts] = useState();
  const categories = useGetAPI("/categories") as
    | { [key: string]: any }
    | undefined;
  const [currentCategory, setCurrentCategory] = useState<{
    name: string;
    id: number;
  }>({ name: "すべてのカテゴリ", id: 0 });

  const handleChange = (elem: any) => {
    if (categories == null) return;
    Object.keys(categories).forEach((name, index) => {
      const categoryID = elem.target.value as number;
      if (categoryID === 0)
        return setCurrentCategory({ name: "すべてのカテゴリ", id: 0 });
      if (index + 1 !== categoryID) return;
      setCurrentCategory({ name: name, id: categoryID });
    });
  };

  const baseCategories = () => {
    if (categories == null) return <span></span>;
    return Object.keys(categories).map((name, index) => {
      const categoryID = categories[name].category_id;
      return (
        <MenuItem key={index} value={categoryID}>
          {name}
        </MenuItem>
      );
    });
  };

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
      <Select
        value={currentCategory.id}
        defaultValue={0}
        onChange={handleChange}
        sx={{
          width: "180px",
          borderBottom: "none",
          position: "absolute",
          left: 30,
          top: 200,
          borderRadius: "15px",
          bgcolor: alpha("#0096ff", 0.5)
        }}
      >
        <MenuItem value={0}>すべてのカテゴリ</MenuItem>
        {baseCategories()}
      </Select>
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
              targetCategory={currentCategory}
            />
          </Grid>
        </Grid>
        <Grid item md={2} sm={2}></Grid>
      </Grid>
    </Box>
  );
};
