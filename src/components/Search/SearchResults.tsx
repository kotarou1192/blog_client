import React, { useMemo, useState } from "react";
import { getWithAuthenticate } from "../../utils/network/AxiosWrapper";
import { PostItemCard } from "./PostItemCard";
import { Chip, Grid, Box } from "@mui/material";
import { SearchProps, SubCategory } from "../../@types/global";
import { UserCard } from "./UserCard";
import { useQuery } from "../../utils/network";
import { useGetAPI } from "../../utils/useAPI";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
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
        history.push(
          "/search?keywords=" +
            keywords +
            (page ? "&page=" + page : "") +
            (categoryIDs !== ""
              ? "&category_scope=sub&category_ids=" + categoryIDs + ""
              : "")
        );
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
  const allCategories = useGetAPI("/categories");
  const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);

  useMemo(() => {
    let result: SubCategory[] = [];
    Object.keys(allCategories == null ? {} : allCategories).forEach(
      (baseName) => {
        result = result.concat(allCategories[baseName].sub_categories);
      }
    );
    setAllSubCategories(result);
  }, [Object.keys(allCategories == null ? {} : allCategories).length]);

  const genTags = () => {
    return categoryIDs
      .split(/\s/)
      .map((idStr) => Number(idStr))
      .map((id) => allSubCategories.find((subCat) => subCat.id === id))
      .filter((item): item is SubCategory => item != null)
      .map((subCategory) => {
        const removedSelf = categoryIDs
          .split(/\s/)
          .map((idStr) => Number(idStr))
          .filter((id) => id !== subCategory.id)
          .join(" ");
        return (
          <Chip
            key={subCategory.id}
            onDelete={() => {
              history.push(
                "/search/posts?keywords=" +
                  (keywords ? keywords : "") +
                  "&page=" +
                  page +
                  (removedSelf !== ""
                    ? "&category_scope=sub&category_ids=" + removedSelf + ""
                    : "")
              );
            }}
            label={subCategory.sub_category_name}
            sx={{ height: "30px" }}
          />
        );
      });
  };

  const countAllCategoryIDs = () => {
    return categoryIDs.split(/\s/).length;
  };

  const sumAllCategoryIDs = () => {
    if (categoryIDs === "") return 0;
    return categoryIDs
      .split(/\s/)
      .map((idStr) => Number(idStr))
      .reduce((acc, id) => acc + id);
  };

  useMemo(search, [
    keywordSpliter().join(""),
    searchType,
    page,
    countAllCategoryIDs(),
    sumAllCategoryIDs()
  ]);

  if (results == null || results === []) return <span></span>;
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: "10px", mr: "10px", ml: "10px", mb: "10px" }}
    >
      <Grid item md={12}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            borderBottom: 1,
            borderColor: "divider",
            pl: "5px",
            pr: "5px",
            pb: "20px"
          }}
        >
          {genTags()}
        </Box>
      </Grid>
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
        categories={result.categories}
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
