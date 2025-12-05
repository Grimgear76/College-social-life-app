//cleaned code
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';

import { removePostFromFeed } from "state"
import { setFriends } from "state";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import socket from "../socket";


/* --- Friend Component --- */
const Friend = ({ postUserId, name, subtitle, userPicturePath, postId, mode = "post" }) => {

/* --- State & Global Data --- */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

    // Theme
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === postUserId);

/* --- API CALLS --- */

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


            socket.emit("deletePost", postId );
    };

/* --- EFFECTS & DATA FETCHING --- */
    useEffect(() => {
        const handler = (deletedPostId) => {
            dispatch(removePostFromFeed(deletedPostId));
        };

        socket.on("receiveDeletePost", handler);

        return () => {
            socket.off("receiveDeletePost", handler);
        };
    }, [dispatch]);


/* RENDER UI */
  return (
    <FlexBetween>
        <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />

            <Box onClick={() => { navigate(`/profile/${postUserId}`);}} >
                <Typography color={main} variant="h5" fontWeight="500" sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer", },}}>
                    {name}
                </Typography>

                <Typography color={medium} fontSize="0.75rem">
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>

            {/*Remove friend from FriendsList Widget*/}
        {mode === "friendsList" && (
            <IconButton onClick={() => patchFriend()} sx={{ backgroundColor: primaryLight, p: "0.6rem" }} >
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
            </IconButton>
        )}

            {/*Remove/Add friend from Posts */}
        {mode === "post" && postUserId !== _id && (
            <IconButton onClick={() => patchFriend()} sx={{ backgroundColor: primaryLight, p: "0.6rem" }} >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        )}

            {/*Remove post if you created it*/}
        {mode === "post" && postUserId == _id && (
            <IconButton onClick={() => removePost()} sx={{ backgroundColor: primaryLight, p: "0.6rem" }} >
                <RemoveIcon sx={{ color: primaryDark }} />   
            </IconButton>
        )}
    </FlexBetween>
  );
};

export default Friend;