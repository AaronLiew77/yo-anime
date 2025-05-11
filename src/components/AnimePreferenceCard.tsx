import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { useTheme } from "@mui/material";
import type { AnimePreferenceCardProps } from "../interfaces/components";
import { animeCardStyles } from "../styles";

/**
 * Draggable anime card component used in the preference UI
 */
export const AnimePreferenceCard = ({ anime, onDragStart }: AnimePreferenceCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const theme = useTheme();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("anime", JSON.stringify(anime));
    onDragStart(anime);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={animeCardStyles.card(isDragging)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component='img'
          height='180'
          image={anime.images.jpg.image_url}
          alt={anime.title}
          sx={{ objectFit: "cover" }}
        />
        {anime.score && (
          <Box sx={animeCardStyles.ratingBadge(theme)}>
            <StarIcon fontSize='small' sx={{ color: "#FFD700", mr: 0.5 }} />
            <Typography variant='body2' fontWeight='bold'>
              {anime.score}
            </Typography>
          </Box>
        )}
        {anime.type && (
          <Chip label={anime.type} size='small' sx={animeCardStyles.typeChip(theme)} />
        )}
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography variant='h6' component='div' sx={animeCardStyles.title}>
          {anime.title}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={animeCardStyles.description}>
          {anime.synopsis || "No description available."}
        </Typography>
      </CardContent>
    </Card>
  );
};
