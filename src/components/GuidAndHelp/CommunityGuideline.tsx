import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import { ohReo } from "../../utils/Constants";

export const CommunityGuideline = () => {
  return (
    <Box pb="100px">
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
            使う上で気をつけること{" "}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <img src={ohReo} style={{ width: "150px", height: "150px" }} />
        </Grid>
      </Grid>
      <Box>
        <Block
          title="誰に見られても良いことだけを書く"
          lines={[
            "インターネットには様々な人がいます。また、このサイトで公開した記事は誰でも読むことができます。",
            "あなたの書いた何気ない文章や、あなたが何気なく投稿した画像がきっかけで、あなたの大切な情報が悪用されてしまうかも知れません。",
            "住所や電話番号などの個人情報などは書かないようにしましょう。",
            "個人情報を書き込んでしまったり等の理由で知らない人からしつこく付きまとわれてしまった場合はすぐに然るべき機関に通報してください。"
          ]}
        />
        <Block
          title="著作権侵害は犯罪です"
          lines={[
            "日本において文化庁が定めている著作権制度の概要については下記を参照してください"
          ]}
        />
        <Box maxWidth="md" mr="auto" ml="auto">
          <a
            style={{ paddingLeft: "20px" }}
            href="https://www.bunka.go.jp/seisaku/chosakuken/seidokaisetsu/gaiyo/"
          >
            日本における著作権制度の概要
          </a>
        </Box>
        <Block
          title="他の人が不快になるようなことを書かない"
          lines={[
            "画面の向こうにはあなたと同じ人間がいます。様々な思想、考え方、文化に配慮し、特定の個人や団体、出身、性別や民族、宗教などに対する誹謗中傷や差別的な発言はおやめください。",
            "ここは様々な年齢、性別の方が見ている公共の場です。ポルノや性的なコンテンツ、過度に暴力的で残酷な表現やグロテスクな表現は行わず、健全な投稿を心がけてください。"
          ]}
        />
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
