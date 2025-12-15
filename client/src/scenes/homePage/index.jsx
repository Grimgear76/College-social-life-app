//cleaned code
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";

import Particles from "components/Particles";

import Navbar from "scenes/navbar";

import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

/*  HomePage Scene  */
const HomePage = () => {

/*  State & Global Data  */
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const { _id, picturePath } = useSelector((state) => state.user);

    const [searchTerm, setSearchTerm] = useState("");
  
/* Render UI */
  return (
    <Box>
            {/* Navbar and background particles */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Particles particleCount={25} />
      
        <Box width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"} gap="0.5rem" justifyContent="space-between">
            
                {/* Left sidebar (User Info) */}
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={_id} picturePath={picturePath} />
            </Box>

                {/*Center Feed (Post Input & Feed)*/}
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"} >
                <MyPostWidget picturePath={picturePath} />
                <PostsWidget userId={_id} searchTerm={searchTerm} />
            </Box>

            {/*Right sidebar (Friends List) DESKTOP ONLY*/}
          {isNonMobileScreens && (
            <Box flexBasis="26%">
                <Box m="2rem 0" />
                    <FriendListWidget userId={_id}/>
            </Box>
          )}

        </Box>

    </Box>
  );
};

export default HomePage;