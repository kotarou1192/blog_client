import React from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteWithAuthenticate } from "../utils/network/AxiosWrapper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "./Markdown.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CodeComponent,
  ReactMarkdownNames
} from "react-markdown/lib/ast-to-react";
import { getUserName } from "../utils/CookiesWrapper";
import { useGetAPI } from "../utils/useAPI";
import { NotFound } from "./NotFound";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogContentText,
  DialogActions,
  Container,
  Toolbar,
  Grid,
  Avatar,
  CardHeader,
  Chip,
  IconButton,
  Box
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import "./hideScrollbar.css";
import { CDN_URL, SITE_URL } from "../utils/network/Constants";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type PostItemProps = {
  match: {
    params: {
      name: string;
      id: number;
    };
  };
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
  id: number;
  user_id: string;
  user_name: string;
  user_avatar: string;
  categories: Category[];
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
};

export const PostItem: React.FC<PostItemProps> = (props) => {
  const history = useHistory();
  const name = props.match.params.name;
  const id = props.match.params.id;
  const myName = getUserName();
  const dateToString = (date: Date): string => {
    return `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`;
  };
  const postURL = "/users/" + name + "/posts/" + id;

  const postItem: 404 | undefined | PostItemParams = useGetAPI(postURL);

  if (postItem == undefined)
    return (
      <Container
        disableGutters
        fixed
        sx={{ width: "100hv", bgcolor: "white" }}
      ></Container>
    );

  if (postItem === 404) return <NotFound></NotFound>;

  const avatarSrc =
    postItem.user_avatar !== "" ? CDN_URL + "/" + postItem.user_avatar : "";
  const hideLinkUnderLine = { textDecoration: "none" };

  const genAvatar = () => {
    return avatarSrc !== "" ? (
      <Link to={"/users/" + postItem.user_name} style={hideLinkUnderLine}>
        <Avatar alt={postItem.user_name} src={avatarSrc} />
      </Link>
    ) : (
      <Link to={"/users/" + postItem.user_name} style={hideLinkUnderLine}>
        <Avatar>{postItem.user_name[0]}</Avatar>
      </Link>
    );
  };

  const genTags = () => {
    return postItem.categories.map((category) => {
      return (
        <Link
          to={
            "/search/posts?category_scope=sub&category_ids=" + category.value.id
          }
          key={category.value.id}
          style={{ ...hideLinkUnderLine, marginRight: "4px" }}
        >
          <Chip onClick={() => {}} label={category.value.sub_category_name} />
        </Link>
      );
    });
  };

  return (
    <Container disableGutters fixed sx={{ width: "100hv" }}>
      <Toolbar sx={{ borderBottom: 1, width: "100hv", borderColor: "divider" }}>
        <CardHeader
          avatar={genAvatar()}
          title={
            <Link to={"/users/" + postItem.user_name}>
              {"@" + postItem.user_name}
            </Link>
          }
          sx={{ height: "100%" }}
        />
        <Typography
          variant="body2"
          align="left"
          sx={{ flexGrow: 1, fontSize: "small", color: "#a0a0a0", ml: "20px" }}
        >
          <span style={{ color: "black" }}>投稿: </span>
          {dateToString(new Date(postItem.created_at * 1000))}
          <span style={{ color: "black" }}>{" 最終更新: "}</span>
          {dateToString(new Date(postItem.updated_at * 1000))}
        </Typography>
        <span hidden={postItem.user_name !== myName}>
          <Grid container sx={{ align: "right" }}>
            <Grid item>
              <Button
                startIcon={<FontAwesomeIcon icon={faPen} />}
                variant="outlined"
                onClick={() =>
                  history.push(
                    "/users/" + postItem.user_name + "/posts/" + id + "/edit"
                  )
                }
              >
                編集
              </Button>
            </Grid>
            <Grid item>
              <DeleteButton
                name={postItem.user_name}
                id={id}
                history={history}
              />
            </Grid>
          </Grid>
        </span>
      </Toolbar>
      <PostHoverButtons
        url={postURL}
        title={postItem.title}
        author={postItem.user_name}
      />
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
          {postItem.title}
        </Typography>
        <ReactMarkdown
          components={{ code: CodeBlock }}
          remarkPlugins={[remarkGfm]}
        >
          {postItem.body}
        </ReactMarkdown>
      </Container>
    </Container>
  );
};

const PostHoverButtons: React.FC<{
  author: string;
  title: string;
  url: string;
}> = ({ url, title, author }) => {
  const liked = false;
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        position: "absolute",
        right: "100px",
        justifyContent: "center"
      }}
    >
      <IconButton>
        <FontAwesomeIcon
          icon={faHeart}
          color={liked ? "#ff2081" : "#ff97ca"}
          fontSize={30}
        />
      </IconButton>
      <p
        style={{
          color: "#ff97ca",
          margin: "0 auto",
          marginBottom: "20px"
        }}
      >
        {0}
      </p>
      <TwitterShareButton
        url={SITE_URL + url}
        title={author + " さんの記事: " + title + "\n"}
        hashtags={["BLOG_MD"]}
      >
        <TwitterIcon size={30} borderRadius={100} />
      </TwitterShareButton>
    </Box>
  );
};

type ButtonProps = {
  name: string;
  history: any;
  id: number;
};

const DeleteButton: React.FC<ButtonProps> = ({ name, history, id }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
      >
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"DELETE THIS POST?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            一度消すと元に戻すことはできません。 本当に削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              deleteWithAuthenticate("/users/" + name + "/posts/" + id).then(
                (res) => {
                  if (res.status === 200) return history.push("/users/" + name);
                }
              );
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
