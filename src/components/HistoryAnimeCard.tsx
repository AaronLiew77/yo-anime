import { Box, Paper, Typography, Chip, Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useTheme } from "@mui/material";
import type { HistoryAnimeCardProps } from "../interfaces/components";
import { historyCardStyles } from "../styles";

/**
 * Card component for displaying anime in the history view
 */
export const HistoryAnimeCard = ({ anime, type }: HistoryAnimeCardProps) => {
  const theme = useTheme();
  const ratingValue = anime.score ? anime.score / 2 : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        ...historyCardStyles.card(type, theme),
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={historyCardStyles.imageContainer}>
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "calc(100% - 85px)",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            ...historyCardStyles.title,
            maxWidth: "100%",
          }}
        >
          {anime.title}
        </Typography>

        {/* Show rating and type */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 0.5,
            flexWrap: "wrap",
            gap: 0.5,
          }}
        >
          {ratingValue > 0 && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating value={ratingValue} precision={0.5} size='small' readOnly />
            </Box>
          )}
          {anime.type && (
            <Chip label={anime.type} size='small' sx={historyCardStyles.typeChip(theme)} />
          )}
        </Box>

        {/* Action icon */}
        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          {type === "like" ? (
            <ThumbUpIcon color='primary' fontSize='small' />
          ) : (
            <ThumbDownIcon color='error' fontSize='small' />
          )}
        </Box>
      </Box>
    </Paper>
  );
};
