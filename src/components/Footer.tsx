import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { headerLogoURL } from "../utils/Constants";
import { Grid } from "@mui/material";
import { Link as RLink } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/kotarou1192">
        kotarou1192@GitHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#5d88b2", pb: 6, mt: "12px" }}>
      <Box textAlign="center" sx={{ bgcolor: "#ffe200", height: "30px" }}>
        <KeyboardDoubleArrowDownIcon />
      </Box>
      <Grid container pr="20px" pl="20px">
        <Grid item md={4}>
          <Container maxWidth="lg">
            <RLink to="/">
              <img
                src={headerLogoURL}
                style={{ width: "480px", height: "240px" }}
              />
            </RLink>
            <Copyright />
          </Container>
        </Grid>
        <Grid item md={2}></Grid>
        <Grid
          item
          md={6}
          sx={{
            mt: "20px"
          }}
        >
          <Grid container spacing={3}>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <ul style={{ color: "white", listStyle: "none" }}>
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "3px",
                    borderBottom: "1px solid #ffe200"
                  }}
                >
                  {"Guide & Help"}
                </p>
                <li style={listStyle}>
                  <RLink to="/guide/about" style={rLinkStyle}>
                    About
                  </RLink>
                </li>
                <li style={listStyle}>
                  <RLink to="/guide/community-guideline" style={rLinkStyle}>
                    ガイドライン
                  </RLink>
                </li>
                <li style={listStyle}>
                  <RLink to="/guide/privacy" style={rLinkStyle}>
                    プライバシーポリシー
                  </RLink>
                </li>
                <li style={listStyle}>
                  <RLink to="/guide/feedback" style={rLinkStyle}>
                    ご意見
                  </RLink>
                </li>
                <li style={listStyle}>
                  <RLink to="/guide/help" style={rLinkStyle}>
                    ヘルプ
                  </RLink>
                </li>
              </ul>
            </Grid>
            <Grid item md={4}>
              <ul style={{ color: "white", listStyle: "none" }}>
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "3px",
                    borderBottom: "1px solid #ffe200"
                  }}
                >
                  {"運営情報"}
                </p>
                <li style={listStyle}>
                  <RLink to="/product/contact-me" style={rLinkStyle}>
                    Contact Me
                  </RLink>
                </li>
                <li style={listStyle}>
                  <RLink to="/product/sources" style={rLinkStyle}>
                    Sources
                  </RLink>
                </li>
                <li style={listStyle}>
                  <RLink to="/product/author" style={rLinkStyle}>
                    作者について
                  </RLink>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const listStyle = { marginBottom: "2px", paddingLeft: "15px" };
const rLinkStyle = { textDecoration: "none", color: "white", fontSize: "15px" };
