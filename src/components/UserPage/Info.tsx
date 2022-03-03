import { Link, Card } from "@mui/material";
import React from "react";

export const Info = () => {
  return (
    <Card
      sx={{
        p: 2,
        bgcolor: "#48524d",
        textAlign: "center",
        minHeight: "100px"
      }}
    >
      <Link
        underline="hover"
        color="yellow"
        href="https://commonmark.org/help/"
        target="_blank"
        rel="noreferrer"
      >
        このブログで使えるmarkdownの記法
      </Link>
    </Card>
  );
};
