import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import socket from "../socket";
import { useEffect } from "react";
import { removePostFromFeed } from "state"

const Friend = ({ postUserId, name, subtitle, userPicturePath, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === postUserId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${postUserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

    const removePost = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:3001/posts/${postId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (!response.ok) {
                console.error("Failed to delete post");
                return;
            }

            // Parse the deleted post data
            //const deleted = await response.json();
            dispatch(removePostFromFeed(postId));

        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    useEffect(() => {
        socket.on("postDeleted", ({ postId }) => {
            // Remove the post from redux or state
            dispatch(removePostFromFeed(postId));
        });

        return () => socket.off("postDeleted");
    }, [dispatch]);

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${postUserId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
          {postUserId !== _id && (
              <IconButton
                  onClick={() => patchFriend()}
                  sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
              >
                  {isFriend ? (
                      <PersonRemoveOutlined sx={{ color: primaryDark }} />
                  ) : (
                      <PersonAddOutlined sx={{ color: primaryDark }} />
                  )}
              </IconButton>
          )}
          {postUserId == _id && (
              <IconButton
                  onClick={() => removePost()}
                  sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
              >
                 <RemoveIcon sx={{ color: primaryDark }} />
                  
              </IconButton>

          )}
    </FlexBetween>
  );
};

export default Friend;