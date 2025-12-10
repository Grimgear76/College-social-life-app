// cleaned code
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";

import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

/* --- User Widget --- */
const UserWidget = ({ userId, picturePath }) => {

/* State & Global Data --- */
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    

/* --- API CALLS --- */
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };


/* --- EFFECTS & DATA FETCHING --- */
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  if (!user) {
    return null;
  }

/* --- Destructuring Objects --- */
    const {
        firstName,
        lastName,
        viewedProfile,
        impressions,
        friends,
    } = user;


  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem" >
        <FlexBetween gap="1rem">
            <UserImage image={picturePath} />

            <Box>
                <Typography variant="h4" color={dark} fontWeight="500" sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer", },}}>
                    {firstName} {lastName}
                </Typography>

                <Typography color={medium}>
                    {friends.length} friends
                </Typography>
            </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">

            {/* Left side: icon + location */}
            <Box display="flex" alignItems="center" gap="0.5rem">
                <Box display="flex" alignItems="center" gap="0.2rem">
                    <LocationOnOutlined sx={{ fontSize: "16px", color: "gray" }} />
                </Box>

                <Typography variant="h6" fontWeight="500">
                    Campus
                </Typography>
            </Box>

            {/* edit icon button */}
            <IconButton>
                <EditOutlined />
            </IconButton>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {/* Left side: icon + major */}
            <Box display="flex" alignItems="center" gap="0.5rem">
                <Box display="flex" alignItems="center" gap="0.2rem">
                        <WorkOutlineOutlined sx={{ fontSize: "16px", color: "gray" }} />
                </Box>

                <Typography variant="h6" fontWeight="500">
                    major
                </Typography>
            </Box>

            {/* edit icon button */}
            <IconButton>
                <EditOutlined />
            </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>
            Posts contributed
          </Typography>

          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>
            Impressions of your post
          </Typography>

          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />

            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>

              <Typography color={medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />

            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>

              <Typography color={medium}>
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;