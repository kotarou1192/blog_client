import React from "react";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

type UserProps = {
  name: string;
  is_my_page: boolean;
};

export const User: React.FC<{ data: UserProps }> = (props) => {
  const { name } = props.data;

  return (
    <Card
      sx={{
        mr: 2,
        borderStyle: "inherit",
        minHeight: "400px",
        textAlign: "center"
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom mt="10px">
        {name}
      </Typography>
      <Typography>description is here</Typography>
    </Card>
  );
};
