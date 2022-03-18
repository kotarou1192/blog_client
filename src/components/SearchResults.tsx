import React, { useMemo } from "react";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";
import { PostItemCard } from "./PostItemCard";
import { Grid } from "@mui/material";
import { SearchProps } from "../@types/global";
import { UserCard } from "./UserCard";
import { useQuery } from "../utils/network";

type SearchResultsProps = {
  searchType: "users" | "posts";
  results: any[] | undefined;
  setResults: any;
  keywords: string;
  searchProps: SearchProps;
  setSearchProps: any;
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  setResults,
  keywords,
  searchProps,
  searchType
}) => {
  const query = useQuery();
  const page = Number(query.get("page")) || 1;
  const categoryScope = query.get("category_scope") || "";
  const categoryIDs = query.get("category_ids") || "";
  const search = () => {
    getWithAuthenticate("/search/" + searchType, {
      keywords: keywords,
      order_type: searchProps.order_type,
      page: page,
      max_contents: searchProps.max_contents,
      category_scope: categoryScope,
      category_ids: categoryIDs
    })
      .then((res) => {
        setResults(res.data);
      })
      .catch((e) => console.log(e));
  };
  const keywordSpliter = () => {
    const keys = new Map<string, boolean>();
    return keywords
      .split(/\s/)
      .map((key) => {
        if (keys.get(key) == null) {
          keys.set(key, true);
          return key;
        }
      })
      .filter(Boolean);
  };

  useMemo(search, [keywordSpliter().join(""), searchType, page]);

  if (results == null || results === []) return <span></span>;
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: "10px", mr: "10px", ml: "10px", mb: "10px" }}
    >
      {results.map((result, index) => (
        <Grid item md={6} key={index}>
          <ResultSwitcher result={result} isPost={searchType === "posts"} />
        </Grid>
      ))}
    </Grid>
  );
};

const ResultSwitcher: React.FC<{ isPost: boolean; result: any }> = ({
  isPost,
  result
}) => {
  if (isPost)
    return (
      <PostItemCard
        userName={result.user_name}
        avatarURL={result.user_avatar}
        postID={result.id}
        title={result.title}
        body={result.body}
        created_at={result.created_at}
      />
    );
  return (
    <UserCard
      name={result.name}
      avatar={result.icon}
      explanation={result.explanation}
    />
  );
};
