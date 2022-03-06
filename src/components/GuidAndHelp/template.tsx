import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import { ohReo } from "../../utils/Constants";

export const temp = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        maxWidth="md"
        mr="auto"
        ml="auto"
        mb="30px"
        sx={{
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        <Grid item md={6} marginTop="70px">
          <Typography
            variant="h4"
            component="h4"
            align="left"
            fontWeight="bold"
          >
            {"ここにタイトル"}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <img src={ohReo} style={{ width: "150px", height: "150px" }} />
        </Grid>
      </Grid>
      <Box>
        <Block title="" lines={[""]} />
        <NBlock title="" lines={[""]} />
      </Box>
    </Box>
  );
};

const Block: React.FC<{ title: string; lines: string[] }> = ({
  title,
  lines
}) => {
  return (
    <Box maxWidth="md" mr="auto" ml="auto" mt="40px">
      <Typography
        align="left"
        pl="20px"
        pb="10px"
        component="h4"
        variant="h4"
        sx={{
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        {title}
      </Typography>
      <Typography
        align="left"
        pl="20px"
        component="div"
        sx={{
          mt: "20px",
          fontSize: "16px",
          fontWeight: "lighter"
        }}
      >
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </Typography>
    </Box>
  );
};

const NBlock: React.FC<{ title: string; lines: string[] }> = ({
  title,
  lines
}) => {
  return (
    <Box maxWidth="md" mr="auto" ml="auto" mt="40px">
      <Typography
        align="left"
        pl="20px"
        pb="10px"
        component="h4"
        variant="h4"
        sx={{
          borderBottom: 1,
          borderColor: "divider"
        }}
      >
        {title}
      </Typography>
      <Typography
        align="left"
        pl="20px"
        component="ol"
        sx={{
          mt: "20px",
          fontSize: "16px",
          fontWeight: "lighter"
        }}
      >
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </Typography>
    </Box>
  );
};
