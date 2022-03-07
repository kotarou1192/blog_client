import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa0, fa4 } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, Typography } from "@mui/material";
import { sadReo } from "../utils/Constants";

export const NotFound: React.FC<{}> = () => {
  return (
    <Container sx={{ textAlign: "center", pt: "70px" }}>
      <FontAwesomeIcon icon={fa4} fontSize="60px" />
      <FontAwesomeIcon icon={fa0} fontSize="60px" />
      <FontAwesomeIcon icon={fa4} fontSize="60px" />
      <div style={{ textAlign: "center" }}>
        <img src={sadReo} style={{ height: "150px", width: "150px" }} />
      </div>
      <Typography mt={0}>This is not what you are searching for.</Typography>
    </Container>
  );
};
