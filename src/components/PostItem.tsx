import React from "react";
import { useHistory } from "react-router-dom";
import { deleteWithAuthenticate } from "../utils/network/AxiosWrapper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
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
  Link,
  DialogContent,
  Typography,
  DialogContentText,
  DialogActions,
  Container,
  Toolbar,
  Grid
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import "./hideScrollbar.css";

type PostItemProps = {
  match: {
    params: {
      name: string;
      id: number;
    };
  };
};

type PostItemParams = {
  id: number;
  user_id: string;
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

  const postItem: 404 | undefined | PostItemParams = useGetAPI(
    "/users/" + name + "/posts/" + id
  );

  if (postItem == undefined)
    return (
      <Container
        disableGutters
        fixed
        sx={{ width: "100hv", bgcolor: "white" }}
      ></Container>
    );

  if (postItem === 404) return <NotFound></NotFound>;

  return (
    <Container disableGutters fixed sx={{ width: "100hv" }}>
      <Toolbar sx={{ borderBottom: 1, width: "100hv", borderColor: "divider" }}>
        <Link href={"/users/" + name} underline="hover">
          @{name}
        </Link>
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
        <span hidden={name !== myName}>
          <Grid container sx={{ align: "right" }}>
            <Grid item>
              <Button
                startIcon={<FontAwesomeIcon icon={faPen} />}
                variant="outlined"
                onClick={() =>
                  history.push("/users/" + name + "/posts/" + id + "/edit")
                }
              >
                編集
              </Button>
            </Grid>
            <Grid item>
              <DeleteButton name={name} id={id} history={history} />
            </Grid>
          </Grid>
        </span>
      </Toolbar>
      <Container
        sx={{
          overflowY: "hidden",
          boxShadow: "0 0 4px gray",
          mt: "10px"
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
        <ReactMarkdown components={{ code: CodeBlock }}>
          {postItem.body}
        </ReactMarkdown>
      </Container>
    </Container>
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
    <SyntaxHighlighter
      style={darcula}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
