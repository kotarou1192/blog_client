/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { Link, useHistory } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../Markdown.css";
import {
  Toolbar,
  TextField,
  Typography,
  Button,
  Container,
  TextareaAutosize,
  Select,
  Box,
  Chip,
  MenuItem,
  Avatar,
  CardHeader,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  FormHelperText
} from "@mui/material";
import "../hideScrollbar.css";
import { useGetAPI } from "../../utils/useAPI";
import { CDN_URL } from "../../utils/network/Constants";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {
  postBodyIsValid,
  postTagsCountIsValid,
  postTitleIsValid
} from "./PostValidator";

type PostEditorProps = {
  post: PostItemParams;
  setPost: any;
  handlePostToAPI: any;
  buttonDisabled: boolean;
  setDisabled: any;
};

type Category = {
  tag_id: number;
  value: {
    id: number;
    base_category_name: string;
    sub_category_name: string;
  };
};

type PostItemParams = {
  id?: number;
  user_id?: string;
  user_name: string;
  user_avatar: string;
  categories: Category[];
  sub_category_ids: number[];
  title: string;
  body: string;
  created_at?: number;
  updated_at?: number;
};

type SubCategory = {
  id: number;
  base_category_name: string;
  sub_category_name: string;
};

export const PostEditor: React.FC<PostEditorProps> = (props) => {
  const [isPreview, setPreview] = useState(false);
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const allCategories = useGetAPI("/categories");
  const [selectedIDs, setSelectedIDs] = useState<number[]>(
    props.post.sub_category_ids
  );
  const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);
  const [currentBaseCategoryName, setCurrentBaseCategoryName] =
    useState<string>("");
  const history = useHistory();

  // console.log("####");
  // console.log(categories);
  // console.log(selectedIDs);
  // console.log("####");

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

  const buttonDisableWhenRequest = async () => {
    props.setDisabled(true);
    props.handlePostToAPI().catch(() => {
      console.error("error");
      props.setDisabled(false);
    });
  };

  return (
    <Container>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button variant="outlined" onClick={() => setPreview(!isPreview)}>
          {isPreview ? "編集に戻る" : "プレビュー"}
        </Button>
        <Button
          variant="contained"
          onClick={() => history.go(-1)}
          sx={{ ml: "75%" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          disabled={props.buttonDisabled}
          onClick={buttonDisableWhenRequest}
          sx={{ ml: "10px" }}
        >
          投稿
        </Button>
      </Toolbar>
      {isPreview ? (
        <Preview
          title={props.post.title}
          body={props.post.body}
          user_name={props.post.user_name}
          user_avatar={props.post.user_avatar}
          categories={categories}
        />
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
          disabled={props.buttonDisabled}
          setDisabled={props.setDisabled}
        />
      )}
    </Container>
  );
};

const Preview: React.FC<{
  title: string;
  body: string;
  categories: SubCategory[];
  user_name: string;
  user_avatar: string;
}> = ({ title, body, categories, user_name, user_avatar }) => {
  const dateToString = (date: Date): string => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };

  title = title === "" ? "NoTitle" : title;

  const avatarSrc = user_avatar ? CDN_URL + "/" + user_avatar : "";
  const hideLinkUnderLine = { textDecoration: "none" };

  const genAvatar = () => {
    return avatarSrc !== "" ? (
      <Link to={"/users/" + user_name} style={hideLinkUnderLine}>
        <Avatar alt={user_name} src={avatarSrc} />
      </Link>
    ) : (
      <Link to={"/users/" + user_name} style={hideLinkUnderLine}>
        <Avatar>{user_name[0]}</Avatar>
      </Link>
    );
  };

  const genTags = () => {
    return categories.map((category) => {
      return (
        <Link
          to={"/search/posts?category_scope=sub&category_ids=" + category.id}
          key={category.id}
          style={{ ...hideLinkUnderLine, marginRight: "4px" }}
        >
          <Chip onClick={() => {}} label={category.sub_category_name} />
        </Link>
      );
    });
  };

  return (
    <Container disableGutters fixed sx={{ width: "100hv" }}>
      <Toolbar sx={{ borderBottom: 1, width: "100hv", borderColor: "divider" }}>
        <CardHeader
          avatar={genAvatar()}
          title={<Link to={"/users/" + user_name}>{"@" + user_name}</Link>}
          sx={{ height: "100%" }}
        />
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
      <Toolbar>
        <Button disabled startIcon={<LocalOfferIcon />} />
        {genTags()}
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
  setDisabled: any;
  disabled: boolean;
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
          error={!postTitleIsValid(props.post.title)}
          label="Title"
          variant="standard"
          value={props.post.title}
          onChange={(el: any) => {
            props.setDisabled(
              !(
                postTitleIsValid(el.target.value) &&
                postBodyIsValid(props.post.body) &&
                postTagsCountIsValid(selectedIDs)
              )
            );
            props.setPost({
              ...props.post,
              title: el.target.value,
              sub_category_ids: selectedIDs
            });
          }}
        />
      </Toolbar>
      <CategoriesSelector
        selectedIDs={selectedIDs}
        setSelectedIDs={setSelectedIDs}
        allSubCategories={allSubCategories}
        allCategories={allCategories}
        currentBaseCategoryName={currentBaseCategoryName}
        setCurrentBaseCategoryName={setCurrentBaseCategoryName}
        onChange={(ids: number[]) => {
          props.setDisabled(
            !(
              postTagsCountIsValid(ids) &&
              postBodyIsValid(props.post.body) &&
              postTitleIsValid(props.post.title)
            )
          );
          props.setPost({
            ...props.post,
            sub_category_ids: ids
          });
        }}
      />
      <TextareaAutosize
        className="scrollbar__hide"
        value={props.post.body}
        onChange={(el) => {
          props.setDisabled(
            !(
              postBodyIsValid(el.target.value) &&
              postTitleIsValid(props.post.title) &&
              postTagsCountIsValid(selectedIDs)
            )
          );
          props.setPost({
            ...props.post,
            body: el.target.value,
            sub_category_ids: selectedIDs
          });
        }}
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
  onChange: any;
}> = ({
  selectedIDs,
  setSelectedIDs,
  allCategories,
  allSubCategories,
  currentBaseCategoryName,
  setCurrentBaseCategoryName,
  onChange
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (elem: any) => {
    if (allCategories == null) return;
    Object.keys(allCategories).forEach((name, index) => {
      const categoryID = elem.target.value as number;
      if (index + 1 !== categoryID) return;
      setCurrentBaseCategoryName(name);
    });
  };

  const handleChooseCategories = (elem: any) => {
    if (
      allCategories == null ||
      currentBaseCategoryName === "" ||
      selectedIDs.length >= 10
    )
      return;
    const selectedSubCategoryIDs = elem.target.value as number[];
    setSelectedIDs(selectedSubCategoryIDs);
    onChange(selectedSubCategoryIDs);
  };

  const baseCategories = () => {
    if (allCategories == null) return <MenuItem>select</MenuItem>;
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
      return <MenuItem>sub category</MenuItem>;
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

  const removeCategoryFromID = (sel: number) => {
    onChange(selectedIDs.filter((id) => id !== sel));
    setSelectedIDs(selectedIDs.filter((id) => id !== sel));
  };

  return (
    <Toolbar>
      <FormControl>
        <InputLabel>main category</InputLabel>
        <Select
          defaultValue=""
          label="main category"
          onChange={handleChange}
          sx={{ minWidth: 140 }}
        >
          {baseCategories()}
        </Select>
      </FormControl>
      <FormControl>
        <FormHelperText hidden={selectedIDs.length === 10}>
          add tags
        </FormHelperText>
        <FormHelperText
          hidden={selectedIDs.length < 10}
          error={selectedIDs.length === 10}
        >
          limit
        </FormHelperText>
        <Select
          multiple
          sx={{ height: "36px", width: 0 }}
          value={selectedIDs}
          input={<Input />}
          IconComponent={() => (
            <IconButton
              onClick={handleOpen}
              sx={{ position: "relative", right: "20px" }}
            >
              <PlaylistAddIcon />
            </IconButton>
          )}
          renderValue={() => <span />}
          open={open}
          onClose={handleClose}
          onChange={handleChooseCategories}
          MenuProps={MenuProps}
        >
          {subCategories()}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, ml: "10px" }}>
        {allSubCategories
          .filter((subCategory) =>
            selectedIDs.some((id) => subCategory.id === id)
          )
          .map((subCategory) => (
            <Chip
              key={subCategory.id}
              onDelete={(e) => {
                e.stopPropagation();
                removeCategoryFromID(subCategory.id);
              }}
              label={subCategory.sub_category_name}
            />
          ))}
      </Box>
    </Toolbar>
  );
};
