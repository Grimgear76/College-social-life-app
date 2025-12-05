//cleaned code
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import { setFriends } from "state";

import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

/* --- FriendList Widget --- */
const FriendListWidget = ({ userId }) => {

/* --- State & Global Data --- */
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

/* --- API CALLS --- */
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

/* --- EFFECTS & DATA FETCHING --- */
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


/* --- RENDER UI --- */
  return (
    <WidgetWrapper>
            {/*FriendList Widget Title*/}
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }} >
        Friend List
        </Typography>

            {/*FriendList made by passing values to 'Friend'*/}
        <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends.map((friend) => (
                <Friend
                    key={friend._id}
                    postUserId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath}
                    mode="friendsList"
                />
            ))}
        </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;