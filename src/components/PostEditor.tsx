/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { useHistory } from "react-router-dom";
import { getUserName } from "../utils/CookiesWrapper";
import { AxiosResponse } from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./Markdown.css";
import {
  Toolbar,
  TextField,
  Typography,
  Link,
  Button,
  Container,
  TextareaAutosize,
  Select,
  Box,
  Chip,
  MenuItem,
  OutlinedInput
} from "@mui/material";
import "./hideScrollbar.css";
import { useGetAPI } from "../utils/useAPI";

type PostEdirotProps = {
  post: {
    title: string;
    body: string;
  };
  setPost: any;
  handlePostToAPI: any;
  buttonDisabled: boolean;
  setDisabled: any;
};

type SubCategory = {
  id: number;
  base_category_name: string;
  sub_category_name: string;
};

export const PostEditor: React.FC<PostEdirotProps> = (props) => {
  const [isPreview, setPreview] = useState(false);
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const history = useHistory();
  const name = getUserName();
  const allCategories = useGetAPI("/categories");
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);
  const [currentBaseCategoryName, setCurrentBaseCategoryName] =
    useState<string>("");

  useMemo(() => {
    let result: SubCategory[] = [];
    Object.keys(allCategories == null ? {} : allCategories).forEach(
      (baseName) => {
        result = result.concat(allCategories[baseName].sub_categories);
      }
    );
    setAllSubCategories(result);
  }, [Object.keys(allCategories == null ? {} : allCategories).length]);

  useEffect(() => {
    const filteredSubCategories = allSubCategories.filter((subCategory) =>
      selectedIDs.some((id) => subCategory.id === id)
    );
    setCategories(filteredSubCategories);
  }, [
    Object.keys(allCategories == null ? {} : allCategories).length,
    categories.length,
    selectedIDs.length
  ]);

  const buttonDisableWhenRequest = () => {
    props.setDisabled(true);
    props
      .handlePostToAPI()
      .then((res: AxiosResponse) => {
        console.log("success");
        console.log(res.status);
        if (res.status === 200) history.push("/users/" + name);
      })
      .catch(() => {
        console.error("error");
        props.setDisabled(false);
      });
  };

  return (
    <Container>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button
          variant="outlined"
          disabled={props.buttonDisabled}
          onClick={() => setPreview(!isPreview)}
        >
          {isPreview ? "編集に戻る" : "プレビュー"}
        </Button>
        <Button
          variant="contained"
          disabled={props.buttonDisabled}
          onClick={buttonDisableWhenRequest}
          sx={{ ml: "80%" }}
        >
          投稿
        </Button>
      </Toolbar>
      {isPreview ? (
        <Preview title={props.post.title} body={props.post.body} />
      ) : (
        <Editor
          currentBaseCategoryName={currentBaseCategoryName}
          setCurrentBaseCategoryName={setCurrentBaseCategoryName}
          selectedIDs={selectedIDs}
          setSelectedIDs={setSelectedIDs}
          allSubCategories={allSubCategories}
          allCategories={allCategories}
          post={props.post}
          setPost={props.setPost}
        />
      )}
    </Container>
  );
};

const Preview: React.FC<{ title: string; body: string }> = ({
  title,
  body
}) => {
  const dateToString = (date: Date): string => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  title = title === "" ? "NoTitle" : title;

  return (
    <Container disableGutters fixed sx={{ width: "100hv" }}>
      <Toolbar sx={{ borderBottom: 1, width: "100hv", borderColor: "divider" }}>
        <Link href="#" underline="hover">
          {getUserName()}
        </Link>
        <Typography
          variant="body2"
          align="left"
          sx={{ flexGrow: 1, fontSize: "small", color: "#a0a0a0", ml: "20px" }}
        >
          <span style={{ color: "black" }}>投稿: </span>
          {dateToString(new Date())}
          <span style={{ color: "black" }}>{" 最終更新: "}</span>
          {dateToString(new Date())}
        </Typography>
      </Toolbar>
      <Container
        sx={{
          overflowY: "hidden",
          boxShadow: "0 0 4px gray",
          mt: "10px",
          minHeight: "calc(100vh - 165px)"
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          fontWeight="bold"
          sx={{ pt: "10px", borderBottom: 1, borderColor: "gray" }}
        >
          {title}
        </Typography>
        <div>
          <ReactMarkdown
            components={{ code: CodeBlock }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {body}
          </ReactMarkdown>
        </div>
      </Container>
    </Container>
  );
};

const Editor: React.FC<{
  currentBaseCategoryName: string;
  setCurrentBaseCategoryName: any;
  allCategories: any;
  allSubCategories: SubCategory[];
  selectedIDs: number[];
  setSelectedIDs: any;
  post: {
    title: string;
    body: string;
  };
  setPost: any;
}> = (props) => {
  const {
    allCategories,
    allSubCategories,
    selectedIDs,
    setSelectedIDs,
    currentBaseCategoryName,
    setCurrentBaseCategoryName
  } = props;

  return (
    <Container maxWidth="lg">
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TextField
          id="standard-basic"
          fullWidth
          label="Title"
          variant="standard"
          value={props.post.title}
          onChange={(el: any) =>
            props.setPost({ body: props.post.body, title: el.target.value })
          }
        />
      </Toolbar>
      <CategoriesSelector
        selectedIDs={selectedIDs}
        setSelectedIDs={setSelectedIDs}
        allSubCategories={allSubCategories}
        allCategories={allCategories}
        currentBaseCategoryName={currentBaseCategoryName}
        setCurrentBaseCategoryName={setCurrentBaseCategoryName}
      />
      <TextareaAutosize
        className="scrollbar__hide"
        value={props.post.body}
        onChange={(el) =>
          props.setPost({ title: props.post.title, body: el.target.value })
        }
        minRows={38}
        maxRows={38}
        style={{
          resize: "none",
          display: "block",
          width: "100%",
          padding: "20px",
          overflowY: "scroll"
        }}
      ></TextareaAutosize>
    </Container>
  );
};

const CodeBlock: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
  ...props
}: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CategoriesSelector: React.FC<{
  selectedIDs: number[];
  allSubCategories: SubCategory[];
  currentBaseCategoryName: string;
  setCurrentBaseCategoryName: any;
  allCategories: any;
  setSelectedIDs: any;
}> = ({
  selectedIDs,
  setSelectedIDs,
  allCategories,
  allSubCategories,
  currentBaseCategoryName,
  setCurrentBaseCategoryName
}) => {
  const handleChange = (elem: any) => {
    if (allCategories == null) return;
    Object.keys(allCategories).forEach((name, index) => {
      const categoryID = elem.target.value as number;
      if (index + 1 !== categoryID) return;
      setCurrentBaseCategoryName(name);
    });
  };

  const handleChooseCategories = (elem: any) => {
    if (allCategories == null || currentBaseCategoryName === "") return;
    const selectedSubCategoryIDs = elem.target.value as number[];
    setSelectedIDs(selectedSubCategoryIDs);
  };

  const baseCategories = () => {
    if (allCategories == null) return <span></span>;
    return Object.keys(allCategories).map((name) => {
      const categoryID = allCategories[name].category_id;
      return (
        <MenuItem key={categoryID} value={categoryID}>
          {name}
        </MenuItem>
      );
    });
  };

  const subCategories = () => {
    if (allCategories == null || currentBaseCategoryName === "")
      return <span></span>;
    const childSubCategories = allCategories[currentBaseCategoryName]
      .sub_categories as SubCategory[];
    return childSubCategories.map((subCategory) => {
      const { sub_category_name, id } = subCategory;
      return (
        <MenuItem key={id} value={id}>
          {sub_category_name}
        </MenuItem>
      );
    });
  };

  return (
    <Toolbar>
      <Select defaultValue="" onChange={handleChange}>
        {baseCategories()}
      </Select>
      <Select
        multiple
        value={selectedIDs}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          const filteredSubCategories = allSubCategories.filter((subCategory) =>
            selected.some((id) => subCategory.id === id)
          );
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {filteredSubCategories.map((subCategory) => (
                <Chip
                  key={subCategory.id}
                  label={subCategory.sub_category_name}
                />
              ))}
            </Box>
          );
        }}
        onChange={handleChooseCategories}
        MenuProps={MenuProps}
      >
        {subCategories()}
      </Select>
    </Toolbar>
  );
};
