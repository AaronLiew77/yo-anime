import { Box } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import type { AnimeListProps } from "../interfaces/components";

export default function AnimeList({ animes }: AnimeListProps) {
  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        },
        gap: { xs: 2, sm: 3 },
        mx: "auto",
        overflow: "hidden",
      }}
    >
      {animes.map((anime, index) => (
        <Box key={`${anime.mal_id}-${index}`} sx={{ overflow: "hidden", padding: 0.5 }}>
          <AnimeCard anime={anime} />
        </Box>
      ))}
    </Box>
  );
}
