import { Grid } from "@mui/material";
import React from "react";
import { UserProps } from "../../@types/global";
import { useGetAPI } from "../../utils/useAPI";
import { NotFound } from "../NotFound";
import { Info } from "./Info";
import { Posts } from "./Post";
import { User } from "./User";

type UserPageProps = {
  match: {
    params: UserProps;
  };
};

export const UserPage: React.FC<UserPageProps> = (props) => {
  const name = props.match.params.name;

  const userData: 404 | undefined | UserProps = useGetAPI("/users/" + name);

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
