//Cleaned Code
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "scenes/navbar";

import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

/* --- ProfilePage Scene --- */
const ProfilePage = () => {

/* --- State & Global Data --- */
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


/* --- API Calls --- */

        // Fetch profile data for user whose profile page is being viewed
    const getProfileUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            setUser(data);
        }

        catch (err) {
          console.error("Failed to fetch user:", err);
        }
    };

/* --- EFFECTS & DATA FETCHING --- */

     // Loads getProfileUser as soon as page load
    useEffect(() => {

        getProfileUser();

    }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

/* --- RENDER UI --- */
    return (
        <Box>
                {/* Navbar & main Box */}
            <Navbar/>
            <Box width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"} gap="2rem" justifyContent="center">

                    {/* Left side UserWidget & FriendsList */}
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>

                    {/* Right side Feed of ProfileUser only */}
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>

            </Box>
        </Box>
    );
};

export default ProfilePage;