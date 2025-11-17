//makes flex container to help with displaying items

import { Box } from "@mui/material";
import { styled } from "@mui/system";

//FlexBetween is a container that allows for better frontend styling
const FlexBetween = styled(Box)({
    display: "flex", //makes container dynamic and children(flex items) flexable 
    justifyContent: "space-between", //spreads horizontal correctly
    alignItems: "center", //centers vertically
});

export default FlexBetween;
