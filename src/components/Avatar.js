import { Avatar, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const AvatarComponent = () => {
  return (
    <Container>
      <Box sx={{ display: "flex", marginTop:"20px", flexDirection:"column", justifyContent:"flex-end", alignItems:"right" }}>
        <Avatar
          alt="Anand"
          src="https://pbs.twimg.com/profile_images/1559112808863715328/tbvr9OMS_400x400.jpg"
        />
        <Typography variant="p" sx={{background:"", display: "flex"}}>By- Anand J Nair</Typography>
      </Box>
    </Container>
  );
};

export default AvatarComponent;
