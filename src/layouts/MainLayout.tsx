import { Container, Box, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import Header from "../components/Header";

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
        minWidth: "100vw",
      }}
    >
      <CssBaseline />
      <Header />
      <Container component='main' sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
