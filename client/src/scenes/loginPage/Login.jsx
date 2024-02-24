import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import logo from "../navbar/friendHubLogo.png";

import Form from "./Form";
import FlexBetween from "../../components/FlexBetween";
import Testing from "./Testing";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <img src={logo} alt="" width={40} />
            <div>FriendsHub</div>
          </Box>
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
        {/* <Testing/> */}
      </Box>
    </Box>
  );
};

export default LoginPage;
