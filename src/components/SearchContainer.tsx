import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, Toolbar } from "@mui/material";
import { SearchResults } from "./SearchResults";
import { SearchProps } from "../@types/global";
import { useQuery } from "../utils/network";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type SearchContainerProps = {
  keywords: string;
  setKeywords: any;
  searchTarget: "posts" | "users";
  setSearchTarget: any;
  topRef: React.RefObject<HTMLDivElement> | undefined;
};

export const SearchContainer: React.FC<SearchContainerProps> = ({
  keywords,
  searchTarget,
  setSearchTarget,
  topRef
}) => {
  const query = useQuery();
  const page = Number(query.get("page")) || 1;
  const [results, setResults] = useState([]);
  const [searchProps, setSearchProps] = useState<SearchProps>({
    page: page,
    order_type: "matched",
    max_contents: 50
  });
  const history = useHistory();
  const handleSearchTargetChange = (target: "posts" | "users") => {
    setSearchTarget(target);
    setResults([]);
    history.push("/search?keywords=" + keywords + "&page=1");
  };

  const returnTop = () => {
    topRef?.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <Box mt="10px" ref={topRef}>
      <Toolbar
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          mb: "20px"
        }}
      >
        <ButtonGroup sx={{ mr: "auto", ml: "auto" }}>
          <Button
            variant={searchTarget === "posts" ? "contained" : "outlined"}
            disabled={searchTarget === "posts"}
            onClick={() => {
              handleSearchTargetChange("posts");
            }}
            sx={{ width: "100px" }}
          >
            記事
          </Button>
          <Button
            variant={searchTarget === "users" ? "contained" : "outlined"}
            disabled={searchTarget === "users"}
            onClick={() => {
              handleSearchTargetChange("users");
            }}
            sx={{ width: "100px" }}
          >
            ユーザー
          </Button>
        </ButtonGroup>
      </Toolbar>
      <Grid container spacing={3}>
        <SearchResults
          results={results}
          setResults={setResults}
          searchProps={searchProps}
          setSearchProps={setSearchProps}
          searchType={searchTarget}
          keywords={keywords}
        />
      </Grid>
      <Toolbar
        sx={{
          borderTop: 2,
          mt: "10px",
          borderColor: "divider",
          pb: "10px"
        }}
      >
        <ButtonGroup variant="text" sx={{ ml: "auto", mr: "auto" }}>
          <span hidden={page <= 1}>
            <Button
              startIcon={<ArrowBackIosIcon />}
              onClick={() => {
                returnTop();
                setSearchProps({ ...searchProps, page: page - 1 });
                history.push(
                  "/search/" +
                    searchTarget +
                    "?keywords=" +
                    keywords +
                    "&page=" +
                    (page - 1)
                );
              }}
            >
              prev
            </Button>
          </span>
          <span hidden={results.length < searchProps.max_contents}>
            <Button
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                returnTop();
                setSearchProps({ ...searchProps, page: page + 1 });
                history.push(
                  "/search/" +
                    searchTarget +
                    "?keywords=" +
                    keywords +
                    "&page=" +
                    (page + 1)
                );
              }}
            >
              next
            </Button>
          </span>
        </ButtonGroup>
      </Toolbar>
    </Box>
  );
};
