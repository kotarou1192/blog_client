import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  TextareaAutosize,
  IconButton
} from "@mui/material";
import { UserProps } from "../../@types/global";
import { CDN_URL } from "../../utils/network/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { smileReo } from "../../utils/Constants";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { putWithAuthenticate } from "../../utils/network/AxiosWrapper";
import { useHistory } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export const User: React.FC<{ data: UserProps }> = (props) => {
  const { name, explanation, icon, is_my_page } = props.data;

  return (
    <Card
      sx={{
        mr: 2,
        borderStyle: "inherit",
        minHeight: "400px",
        textAlign: "center"
      }}
    >
      <Grid container>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="gray"
            gutterBottom
            mt="10px"
          >
            @{name}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <div
            hidden={!is_my_page}
            style={{ margin: "auto 0", marginLeft: "30px" }}
          >
            <EditWindowButton
              name={name}
              explanation={explanation == null ? "" : explanation}
              icon={icon}
            />
          </div>
        </Grid>
      </Grid>
      <CardMedia
        component="img"
        image={icon ? CDN_URL + "/" + icon : smileReo}
        sx={{
          width: 140,
          margin: "0 auto"
        }}
      />
      <Typography
        sx={{
          marginTop: 1,
          paddingTop: 2,
          pr: 3,
          pl: 3,
          borderTop: 1,
          borderColor: "divider"
        }}
      >
        {explanation ? explanation : "自己紹介はありません"}
      </Typography>
    </Card>
  );
};

const EditWindowButton: React.FC<{
  explanation: string;
  name: string;
  icon?: string;
}> = ({ name, explanation, icon }) => {
  const [open, setOpen] = useState(false);
  const fileRef = React.createRef<HTMLInputElement>();
  const [exp, setExp] = useState(explanation);
  const history = useHistory();
  const [iconImg, setIconImg] = useState<Blob | undefined>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const is_valid = () => {
    const file = fileRef?.current?.files?.item(0) as Blob | undefined;
    const fileType = file == null ? "none" : file.type;
    const regExp = /image\/jpg|image\/jpeg|image\/png|image\/gif|none/;
    return exp.length <= 255 && regExp.test(fileType);
  };

  return (
    <div>
      <Button
        size="small"
        startIcon={<FontAwesomeIcon icon={faPen} />}
        variant="outlined"
        sx={{ margin: "auto 0" }}
        onClick={handleClickOpen}
      >
        編集
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Grid container sx={{ width: "40vh" }}>
          <Grid item textAlign="right" md={10}>
            <DialogTitle>Edit Your Information</DialogTitle>
          </Grid>
          <Grid item md={1}>
            <IconButton onClick={handleClose} sx={{ mt: "3px" }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button variant="outlined" component="span" size="small">
            <label htmlFor="img-upload">
              <input
                type="file"
                id="img-upload"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileRef}
                onChange={() => {
                  const selectedIcon = fileRef?.current?.files?.item(0) as
                    | Blob
                    | undefined;
                  if (selectedIcon == null) return;
                  setIconImg(selectedIcon);
                }}
              />
              <Button
                startIcon={<InsertPhotoOutlinedIcon />}
                component="span"
                size="small"
              >
                Select Your Icon
              </Button>
            </label>
          </Button>
        </Box>
        <DialogContent>
          <CardMedia
            component="img"
            image={
              iconImg
                ? window.URL.createObjectURL(iconImg)
                : icon
                ? CDN_URL + "/" + icon
                : smileReo
            }
            sx={{
              width: 140,
              margin: "0 auto",
              mb: "20px"
            }}
          />
          <TextareaAutosize
            autoFocus
            minRows={5}
            maxRows={5}
            value={exp}
            id="explanation"
            style={{
              resize: "none",
              display: "block",
              width: "100%",
              padding: "20px",
              overflowY: "scroll"
            }}
            onChange={(el) => setExp(el.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color={is_valid() ? "primary" : "error"}
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={async () => {
              const file = fileRef?.current?.files?.item(0) as Blob | undefined;
              const formData = new FormData();
              if (file != null) formData.append("icon", file);
              formData.append("explanation", exp);
              putWithAuthenticate("/users/" + name, formData).then(() => {
                console.log("success");
                history.go(0);
                handleClose();
              });
            }}
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
