import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #3585F9 0%, #63B3FD 100%)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          color: "text.primary",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant='h6'
              component={Link}
              to='/'
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Yo Anime
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />{" "}
      {/* This empty Toolbar adds space at the top to prevent content from going under the fixed AppBar */}
    </>
  );
}
