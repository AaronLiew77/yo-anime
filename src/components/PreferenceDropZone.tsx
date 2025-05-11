import { Box, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import type { PreferenceDropZoneProps } from "../interfaces/components";
import { dropZoneStyles } from "../styles";

/**
 * Drop zone component for anime preference selection
 */
export const PreferenceDropZone = ({ onDrop, color, title, icon, id }: PreferenceDropZoneProps) => {
  const [isOver, setIsOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // Handle drop zone events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    // Get anime data from drag event
    const animeData = e.dataTransfer.getData("anime");
    if (animeData) {
      try {
        const anime = JSON.parse(animeData);
        onDrop(anime);
      } catch (err) {
        console.error("Failed to parse dropped anime data:", err);
      }
    }
  };

  return (
    <Box
      ref={dropRef}
      id={id}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={dropZoneStyles.container(isOver, color, theme)}
    >
      <Box sx={dropZoneStyles.iconContainer(theme)}>{icon}</Box>
      <Typography color='white' variant='h6' sx={dropZoneStyles.title}>
        {title}
      </Typography>
      <Typography color='white' variant='body2' sx={dropZoneStyles.subtitle}>
        Drop anime here
      </Typography>
    </Box>
  );
};
