import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import "./Readme.css";

export const AccountCreateReadme: React.FC<{}> = () => {
  return (
    <div style={{ margin: "0 auto", width: "780px" }}>
      <Accordion
        sx={{
          fontWeight: "bold",
          bgcolor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ bgcolor: "#1e60b9" }}
        >
          <Typography
            sx={{
              color: "white",
              margin: "0 auto"
            }}
          >
            本サイトを利用する際の注意（必読）
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "white"
          }}
        >
          <Grid
            container
            spacing={1}
            sx={{
              height: "200px",
              bgcolor: "white",
              margin: "0 auto"
            }}
          >
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: "small", fontWeight: "bold" }}
                variant="h6"
                component="div"
              >
                クッキーやデータの取扱い
              </Typography>
              <ul style={{ fontSize: "small", marginTop: "3px" }}>
                <li>本サイトではユーザーの識別にクッキーを利用しています。</li>
                <li>
                  Googleの提供するツール攻撃ブロック機能を使用しています。
                </li>
                <li>
                  登録されたメールアドレス、パスワード等は当サイト管理人が保存し、適切に管理するものとします。
                </li>
              </ul>
              <Typography
                sx={{ fontSize: "small", fontWeight: "bold" }}
                variant="h6"
                component="div"
              >
                これらの情報は以下の目的で利用されます。この注意全てに同意された方のみこのサイトを利用できます。
              </Typography>
              <ul style={{ fontSize: "small", marginTop: "3px" }}>
                <li>ユーザー識別のため。</li>
                <li>ユーザーのプライバシー保護のため。</li>
              </ul>
              <Typography
                sx={{ fontSize: "small", marginTop: "3px" }}
                variant="h6"
                component="div"
              >
                これらの情報は適切に取り扱います。不明な点は管理者へお問い合わせください。
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
