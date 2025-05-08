import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Anime } from "../types/anime";
import { useLoading } from "../contexts/LoadingContext";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const navigate = useNavigate();
  const { startNavigationDelay } = useLoading();

  const handleClick = async () => {
    await startNavigationDelay();
    navigate(`/anime/${anime.mal_id}`);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component='img'
          height='200'
          image={anime.images.jpg.image_url}
          alt={anime.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h6' component='div' noWrap>
            {anime.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {anime.synopsis || "No description available."}
          </Typography>
          {anime.score && (
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
              Score: {anime.score}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
