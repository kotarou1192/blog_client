import React, { useEffect } from "react";
import { getWithAuthenticate } from "../utils/network/AxiosWrapper";
import { useQuery } from "../utils/network/QueryStringGetter";
import { Link } from "react-router-dom";

type SearchResultsProps = {
  results: any[];
  keywords: string;
  setResults: any;
  setKeywords: any;
};
export const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const querry = useQuery();
  const searchUsers = () => {
    getWithAuthenticate("/search/users", {
      keywords: querry.get("keywords")
    }).then((res) => {
      props.setResults(res.data);
    });
  };
  useEffect(searchUsers, [props.results]);
  useEffect(() => props.setKeywords(querry.get("keywords")), [props.keywords]);
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
