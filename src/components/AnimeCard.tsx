import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
  Rating,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { motion } from "framer-motion";
import type { AnimeCardProps } from "../interfaces/components";

export default function AnimeCard({ anime }: AnimeCardProps) {
  const navigate = useNavigate();
  const { startNavigationDelay } = useLoading();
  const theme = useTheme();

  const handleClick = async () => {
    await startNavigationDelay();
    navigate(`/anime/${anime.mal_id}`);
  };

  // Calculate rating on a 5-star scale
  const ratingValue = anime.score ? anime.score / 2 : 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Box
      component={motion.div}
      variants={itemVariants}
      sx={{ height: "100%", position: "relative" }}
    >
      <Card
        component={motion.div}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          transform: "translateZ(0)", // Helps with containing the transform during hover
          maxWidth: "100%",
        }}
      >
        <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component='img'
              height='240'
              image={anime.images.jpg.image_url}
              alt={anime.title}
              sx={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />

            {/* Show type in an overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                p: 1,
              }}
            >
              {anime.type && (
                <Chip
                  label={anime.type}
                  size='small'
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.8),
                    color: theme.palette.common.white,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    height: "24px",
                  }}
                />
              )}
            </Box>
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              p: { xs: 1.5, sm: 2 },
              "&:last-child": { pb: { xs: 1.5, sm: 2 } },
            }}
          >
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                lineHeight: 1.3,
                mb: 1,
              }}
            >
              {anime.title}
            </Typography>

            {/* Score and episodes on one line */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1.5,
                flexWrap: "wrap",
              }}
            >
              {ratingValue > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 0.5, sm: 0 } }}>
                  <Rating value={ratingValue} precision={0.5} size='small' readOnly />
                  <Typography
                    variant='body2'
                    sx={{
                      ml: 1,
                      fontWeight: 600,
                      color:
                        anime.score && anime.score >= 8
                          ? theme.palette.success.main
                          : "text.secondary",
                    }}
                  >
                    {anime.score}
                  </Typography>
                </Box>
              )}

              {anime.episodes && (
                <Chip
                  label={`${anime.episodes} episode${anime.episodes !== 1 ? "s" : ""}`}
                  size='small'
                  sx={{
                    height: "20px",
                    fontSize: "0.7rem",
                    bgcolor: theme.palette.grey[100],
                  }}
                />
              )}
            </Box>

            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: { xs: 2, sm: 3 },
                WebkitBoxOrient: "vertical",
                lineHeight: 1.5,
                fontSize: "0.85rem",
              }}
            >
              {anime.synopsis || "No description available."}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
