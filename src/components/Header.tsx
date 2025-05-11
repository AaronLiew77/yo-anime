import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  useTheme,
  alpha,
  useScrollTrigger,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Header() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // Get the app title based on language
  const appTitle = i18n.language === "ja" ? "Yo-アニメ" : "Yo-anime";

  return (
    <>
      <AppBar
        position='fixed'
        elevation={trigger ? 4 : 0}
        sx={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          backdropFilter: "blur(10px)",
          color: theme.palette.common.white,
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography
                variant='h5'
                component={Link}
                to='/'
                sx={{
                  textDecoration: "none",
                  color: theme.palette.common.white,
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  fontSize: { xs: "1.4rem", sm: "1.8rem" },
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    textShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {appTitle}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* I added this thinking I could get the anime description in different languages, turns out i was wrong... */}
              {/* <LanguageSwitcher /> */}
              <IconButton
                component='a'
                href='https://github.com/AaronLiew77/yo-anime'
                target='_blank'
                rel='noopener noreferrer'
                color='inherit'
                aria-label='GitHub'
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* This empty Toolbar adds space at the top */}
    </>
  );
}
