import { Grid } from "@mui/material";
import React from "react";
import { useGetAPI } from "../../utils/useAPI";
import { NotFound } from "../NotFound";
import { Info } from "./Info";
import { Posts } from "./Post";
import { User } from "./User";

type UserProps = {
  match: {
    params: UserParams;
  };
};

type UserParams = {
  name: string;
  is_my_page: boolean;
};

export const UserPage: React.FC<UserProps> = (props) => {
  const name = props.match.params.name;

  const userData: 404 | undefined | UserParams = useGetAPI("/users/" + name);

  if (!userData) return <div></div>;
  if (userData === 404) return <NotFound></NotFound>;
  return (
    <Grid container padding={10} spacing={2} sx={{ pt: 3 }}>
      <Grid item xs={4}>
        <User data={userData} />
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Info />
          </Grid>
          <Grid item xs={12}>
            <Posts data={userData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
