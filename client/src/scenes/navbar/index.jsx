//cleaned code
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Search, DarkMode, LightMode, Menu, Close } from "@mui/icons-material";

import { setLightDarkMode, setLogout } from "../../state";
import FlexBetween from "../../components/FlexBetween";

/* --- NAVBAR COMPONENT --- */
const Navbar = ({ searchTerm, setSearchTerm }) => {

/* --- STATE & GLOBAL DATA --- */
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

        // Theme
    const theme = useTheme();
    const background = theme.palette.background.default;
    const neutralLight = theme.palette.neutral.light;
    const primaryLight = theme.palette.primary.light;
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

/* --- RENDER UI --- */
    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                    {/* Website Title */}
                <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" sx={{ "&:hover": { color: primaryLight, cursor: "pointer", }, }} onClick={() => navigate("/home")} >
                    College Life App
                </Typography>

                    {/* SearchBar for NonMobileScreens */}
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.30rem 1.5rem" >
                        <InputBase placeholder= "Search Post..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />

                        <Search />
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                        {/* Light & Dark Mode */}
                    <IconButton onClick={() => dispatch(setLightDarkMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>

                        {/* DropDown Menu */}
                    <FormControl variant="standard" value={fullName}>
                        <Select value={fullName} sx={{ backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem", }, "& .MuiSelect-select:focus": { backgroundColor: neutralLight, }, }} input={<InputBase />} >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>

                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background} >
                
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem" >
                            {/* Light & Dark Mode */}
                        <IconButton onClick={() => dispatch(setLightDarkMode())} sx={{ fontSize: "25px" }} >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                            {/* DropDownMenu */}
                        <FormControl variant="standard" value={fullName}>
                            <Select value={fullName} sx={{ backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem", }, "& .MuiSelect-select:focus": { backgroundColor: neutralLight, }, }} input={<InputBase />} >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>

                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;