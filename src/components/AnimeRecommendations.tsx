import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  alpha,
  Paper,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Chip,
  Skeleton,
} from "@mui/material";
import { useAnimeStore } from "../store/animeStore";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { motion } from "framer-motion";
import { useLoading } from "../contexts/LoadingContext";
import { useTranslation } from "react-i18next";

interface AnimeRecommendationsProps {
  title?: string;
}

export default function AnimeRecommendations({
  title = "Recommended For You",
}: AnimeRecommendationsProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { startNavigationDelay } = useLoading();
  const { t, i18n } = useTranslation();
  const {
    recommendations,
    isLoadingRecommendations,
    recommendationsError,
    getAnimeRecommendations,
  } = useAnimeStore();

  // For scrolling controls
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get a random popular anime ID for recommendations
    // Using a fixed ID for now, but we could make this dynamic based on viewed anime
    const fetchRecommendations = async () => {
      // Fullmetal Alchemist: Brotherhood - a popular anime with many recommendations
      await getAnimeRecommendations(5114);
    };

    fetchRecommendations();
  }, [getAnimeRecommendations, i18n.language]);

  useEffect(() => {
    const updateScrollInfo = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setMaxScroll(scrollWidth - clientWidth);
      }
    };

    updateScrollInfo();
    window.addEventListener("resize", updateScrollInfo);
    return () => window.removeEventListener("resize", updateScrollInfo);
  }, [scrollRef, recommendations]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - 300)
        : Math.min(maxScroll, scrollPosition + 300);

    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  const handleAnimeClick = async (id: number) => {
    await startNavigationDelay();
    navigate(`/anime/${id}`);
  };

  // Animation variants
  const cardVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  // Loading skeletons
  if (isLoadingRecommendations) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography
          variant='h5'
          sx={{
            mb: 3,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("anime.recommendations")}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, overflowX: "hidden", pb: 1 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              sx={{
                minWidth: 160,
                width: 160,
                height: 260,
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <Skeleton variant='rectangular' width={160} height={220} animation='wave' />
              <Box sx={{ p: 1 }}>
                <Skeleton variant='text' width='80%' height={24} animation='wave' />
              </Box>
            </Card>
          ))}
        </Box>
      </Paper>
    );
  }

  // Error state
  if (recommendationsError) {
    return null; // Don't show anything if there's an error
  }

  // No recommendations available
  if (!recommendations || recommendations.data.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: 3,
        borderRadius: 3,
        background: alpha(theme.palette.background.paper, 0.7),
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Typography
        variant='h5'
        sx={{
          mb: 3,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("anime.recommendations")}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {scrollPosition > 0 && (
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              left: -16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: alpha(theme.palette.background.paper, 0.9),
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {scrollPosition < maxScroll && (
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              right: -16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: alpha(theme.palette.background.paper, 0.9),
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Edge
            },
            msOverflowStyle: "none", // IE
            scrollBehavior: "smooth",
          }}
          onScroll={(e) => {
            // Update scroll position when user scrolls manually
            setScrollPosition((e.target as HTMLDivElement).scrollLeft);
          }}
        >
          {recommendations.data.slice(0, 15).map((recommendation, index) => (
            <Card
              key={`${recommendation.entry.mal_id}-${index}`}
              component={motion.div}
              variants={cardVariants}
              initial='initial'
              animate='animate'
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              sx={{
                minWidth: 160,
                width: 160,
                height: 260,
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
                transition: "all 0.3s ease-in-out",
                transform: "translateZ(0)",
                "&:hover": {
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              }}
            >
              <CardActionArea
                onClick={() => handleAnimeClick(recommendation.entry.mal_id)}
                sx={{ height: "100%" }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component='img'
                    height={220}
                    image={recommendation.entry.images.jpg.image_url}
                    alt={recommendation.entry.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      p: 1,
                    }}
                  >
                    <Chip
                      label={`${recommendation.votes} votes`}
                      size='small'
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        bgcolor: alpha(theme.palette.secondary.main, 0.8),
                        color: theme.palette.common.white,
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 1, height: 40 }}>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.2,
                      fontSize: "0.8rem",
                    }}
                  >
                    {recommendation.entry.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
