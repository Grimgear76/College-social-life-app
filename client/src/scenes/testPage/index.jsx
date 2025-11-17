
import {
    Typography,
    Box,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const TestPage = () => {
    const theme = useTheme();
    return (
        <Box width="100%"
            backgroundColor={theme.palette.background.default}
            padding="2rem 6%"
            display={"block"}
            gap="0.5rem"
            justifyContent="space-between" >
           
            
                    <Typography color={theme.palette.primary.main}>
            TEST
            </Typography>
           
            
        </Box>
    )
}

export default TestPage;