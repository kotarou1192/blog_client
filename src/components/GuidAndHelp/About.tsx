import { Box, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { smileReo } from "../../utils/Constants";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        maxWidth="md"
        mr="auto"
        ml="auto"
        mb="10px"
        sx={{
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        <Grid item md={8} marginTop="70px">
          <Typography
            variant="h4"
            component="h4"
            align="right"
            fontWeight="bold"
          >
            BLOG.mdってどんなサービス？{" "}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <img src={smileReo} style={{ width: "150px", height: "150px" }} />
        </Grid>
      </Grid>
      <Box>
        <Typography
          align="center"
          component="div"
          sx={{ fontSize: "18px", lineHeight: "10px" }}
        >
          <h4>Markdownという記法で文書を書くことができます。</h4>
          <h4>
            日々の気付きや日記、何かのノウハウ等をここで文字として記録・共有してみませんか？
          </h4>
        </Typography>
      </Box>
      <Box>
        <Typography
          align="center"
          fontWeight="bold"
          component="div"
          variant="h5"
          mt={20}
        >
          書きたいことは決まりましたか？ ここから無料で始めましょう！
        </Typography>
        <Box textAlign="center" mt="50px">
          <Link to="/account/want_to_create" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ mr: "50px" }}>
              新規登録
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ ml: "50px" }}>
              ログイン
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
