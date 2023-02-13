import { CoffeeTwoTone } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Logo = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "15px",
          marginTop: "15px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#edb03e" }} variant="h1">
          Buy Me A Coffee
        </Typography>
        <CoffeeTwoTone
          sx={{ fontSize: "70px", color: "#4f3b15", marginLeft: "15px" }}
        />
      </Box>
    </Container>
  );
};

export default Logo;
