import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { setPosts as setPostsState } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState(null);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const currentPosts = useSelector(state => state.posts) || [];
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    const newPost = posts[posts.length - 1];


      
      dispatch(setPostsState([newPost, ...currentPosts]));

    socket.emit("createPost", newPost);


    setImage(null);
    setPost("");
    setFileName(null);
  };


  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
          </FlexBetween>
      
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>

              <Dropzone
                  accept={{ "image/*": [] }}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                      const file = acceptedFiles[0];
                      if (file) {
                          setFileName(file.name);
                          setImage(file);
                      }
                  }} >
                  {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                          {...getRootProps()}
                          style={{ display: "inline-block" }} >
                          <input {...getInputProps()} />

                          <FlexBetween
                              gap="0.25rem"
                              sx={{
                                  padding: "0.4rem 0.75rem",
                                  borderRadius: "0.5rem",
                                  backgroundColor: palette.neutral.light,
                                  cursor: "pointer",
                                  transition: "0.2s",
                                  "&:hover": { backgroundColor: palette.neutral.light },
                                  opacity: isDragActive ? 0.7 : 1,
                              }} >
                              <ImageOutlined sx={{ color: mediumMain }} />

                              <Typography
                                  color={mediumMain}
                                  sx={{ "&:hover": { color: medium } }} >
                                  {fileName ? fileName : "Image"}
                              </Typography>
                          </FlexBetween>
                      </div>
                  )}
              </Dropzone>

                <Button
                  disabled={!post}
                  onClick={handlePost}
                  sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                  }} >
                  POST
                </Button>

       </FlexBetween>

    </WidgetWrapper>
  );
};

export default MyPostWidget;