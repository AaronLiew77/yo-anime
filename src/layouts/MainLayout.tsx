import { Container, Box, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import Header from "../components/Header";
import WelcomeClickbait from "../components/WelcomeClickbait";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Header />
      <Container component='main' sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <WelcomeClickbait />
    </Box>
  );
}
