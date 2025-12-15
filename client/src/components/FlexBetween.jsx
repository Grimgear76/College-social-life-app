//Makes Flex Container to help with Displaying Items

import { Box } from "@mui/material";
import { styled } from "@mui/system";

//FlexBetween is a Container that Allows for Better Frontend Styling
const FlexBetween = styled(Box)({
    display: "flex", //Makes Container Dynamic and Children(flex items) Flexable 
    justifyContent: "space-between", //spreads horizontal correctly
    alignItems: "center", //centers vertically
});

export default FlexBetween;