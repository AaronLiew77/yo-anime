import { Box } from "@mui/material";
import type { Anime } from "../types/anime";
import AnimeCard from "../components/AnimeCard";

interface AnimeListProps {
  animes: Anime[];
}

export default function AnimeList({ animes }: AnimeListProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: 3,
      }}
    >
      {animes.map((anime, index) => (
        <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
      ))}
    </Box>
  );
}
