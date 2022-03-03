import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa0, fa4 } from "@fortawesome/free-solid-svg-icons";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { Container, Typography } from "@mui/material";

export const NotFound: React.FC<{}> = () => {
  return (
    <Container sx={{ textAlign: "center", mt: "70px" }}>
      <FontAwesomeIcon icon={fa4} fontSize="60px" />
      <FontAwesomeIcon icon={fa0} fontSize="60px" />
      <FontAwesomeIcon icon={fa4} fontSize="60px" />
      <p>
        <FontAwesomeIcon icon={faFaceSadTear} fontSize="80px" />
      </p>
      <Typography mt={5}>This is not what you are searching for.</Typography>
    </Container>
  );
};
