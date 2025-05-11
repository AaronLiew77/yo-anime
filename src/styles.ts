import { alpha } from "@mui/material";
import type { Theme } from "@mui/material";

// Welcome Clickbait Component Styles
export const welcomeClickbaitStyles = {
  catButton: {
    position: "fixed",
    bottom: "280px",
    right: "20px",
    zIndex: 1200,
  },
  closeButton: {
    position: "absolute",
    top: -15,
    right: -15,
    backgroundColor: "white",
    color: "gray",
    width: 24,
    height: 24,
    zIndex: 10000,
    padding: "2px",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    transform: "scale(0.8)",
  },
  catFab: (isMobile: boolean) => ({
    backgroundSize: "100% 100%",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "0 0 20px #E6C487, inset 0 0 15px #E6C487",
    },
    transform: isMobile ? "scale(2)" : "scale(1.5)",
  }),
  drawerPaper: (isMobile: boolean) => ({
    width: isMobile ? "100%" : "400px",
    height: isMobile ? "100%" : "100%",
    borderRadius: isMobile ? "16px 16px 0 0" : "0",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  }),
  tabs: {
    "& .MuiTab-root": {
      fontWeight: "bold",
      py: 2,
      fontSize: "0.95rem",
    },
    "& .MuiTabs-indicator": {
      height: 3,
      borderRadius: 3,
    },
  },
  emptyState: (theme: Theme) => ({
    textAlign: "center",
    py: 6,
    px: 2,
    bgcolor: alpha(theme.palette.background.paper, 0.4),
    borderRadius: 2,
  }),
  noMoreAnime: (theme: Theme) => ({
    p: 3,
    textAlign: "center",
    borderRadius: 3,
    bgcolor: alpha(theme.palette.background.paper, 0.5),
    border: `1px dashed ${alpha(theme.palette.text.primary, 0.2)}`,
    maxWidth: 300,
  }),
  countContainer: (theme: Theme) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    mt: "auto",
    py: 2,
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  }),
};

// Drop Zone Styles
export const dropZoneStyles = {
  container: (isOver: boolean, color: string, theme: Theme) => ({
    width: "48%",
    height: "160px",
    backgroundColor: alpha(color, 0.9),
    borderRadius: "12px",
    p: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: isOver ? 0.8 : 1,
    transition: "all 0.2s ease",
    boxShadow: isOver
      ? `0 0 20px ${alpha(color, 0.4)}, inset 0 0 80px ${alpha(color, 0.3)}`
      : `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
    transform: isOver ? "scale(1.03)" : "scale(1)",
  }),
  iconContainer: (theme: Theme) => ({
    mb: 1,
    p: 1.5,
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  title: {
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    fontWeight: 600,
  },
  subtitle: {
    opacity: 0.9,
    textAlign: "center",
    mt: 0.5,
  },
};

// Anime Card Styles
export const animeCardStyles = {
  card: (isDragging: boolean) => ({
    width: "100%",
    maxWidth: 300,
    borderRadius: 3,
    overflow: "hidden",
    transition: "all 0.2s ease",
    cursor: "grab",
    transform: isDragging ? "scale(0.95)" : "scale(1)",
    opacity: isDragging ? 0.7 : 1,
    boxShadow: isDragging ? "none" : "0 8px 20px rgba(0,0,0,0.1)",
    "&:hover": {
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
      transform: "translateY(-5px)",
    },
  }),
  ratingBadge: (theme: Theme) => ({
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    borderRadius: 20,
    px: 1,
    py: 0.5,
    display: "flex",
    alignItems: "center",
    backdropFilter: "blur(4px)",
  }),
  typeChip: (theme: Theme) => ({
    position: "absolute",
    bottom: 10,
    left: 10,
    height: 24,
    backgroundColor: alpha(theme.palette.primary.main, 0.9),
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: "0.7rem",
  }),
  title: {
    fontWeight: "bold",
    fontSize: "1rem",
    mb: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
};

// History Anime Card Styles
export const historyCardStyles = {
  card: (type: "like" | "dislike", theme: Theme) => ({
    p: 1.5,
    display: "flex",
    borderRadius: 2,
    mb: 2,
    border: `1px solid ${alpha(
      type === "like" ? theme.palette.primary.main : theme.palette.error.main,
      0.2
    )}`,
    backgroundColor: alpha(
      type === "like" ? theme.palette.primary.main : theme.palette.error.main,
      0.05
    ),
    transition: "transform 0.2s ease",
    minWidth: 0,
    maxWidth: "100%",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
    },
  }),
  imageContainer: {
    width: 70,
    height: 80,
    mr: 1.5,
    flexShrink: 0,
    borderRadius: 1,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    mb: 0.5,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  typeChip: (theme: Theme) => ({
    height: 18,
    fontSize: "0.65rem",
    bgcolor: alpha(theme.palette.background.paper, 0.7),
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};
