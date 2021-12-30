import React, { useMemo } from "react";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";
import { Link } from "react-router-dom";

type SearchResultsProps = {
  results: any[];
  keywords: string;
  setResults: any;
  setKeywords: any;
};
export const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const searchUsers = async () => {
    await getWithAuthenticate("/search/users", {
      keywords: props.keywords
    })
      .then((res) => {
        props.setResults(res.data);
      })
      .catch((e) => console.log(e));
  };
  const keywordSpliter = () => {
    const keys = new Map<string, boolean>();
    return props.keywords
      .split(/\s/)
      .map((key) => {
        if (keys.get(key) == null) {
          keys.set(key, true);
          return key;
        }
      })
      .filter(Boolean);
  };

  useMemo(searchUsers, [keywordSpliter().join("")]);
  return (
    <ul>
      {props.results.map((result, index) => (
        <SearchResult key={index} name={result.name} />
      ))}
    </ul>
  );
};

type ResultData = {
  name: string;
};

const SearchResult: React.FC<ResultData> = (props) => {
  return (
    <li>
      <Link to={"/users/" + props.name}>UserName: {props.name}</Link>
    </li>
  );
};
