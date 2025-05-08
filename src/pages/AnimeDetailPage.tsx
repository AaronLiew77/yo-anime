import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Paper,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAnimeStore } from "../store/animeStore";
import MainLayout from "../layouts/MainLayout";
import { useLoading } from "../contexts/LoadingContext";

export default function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAnimeDetails, animeDetails, isLoading, error } = useAnimeStore();
  const { startNavigationDelay } = useLoading();

  useEffect(() => {
    if (id) {
      getAnimeDetails(parseInt(id, 10));
    }
  }, [id, getAnimeDetails]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderSkeleton = () => (
    <MainLayout>
      <Box sx={{ mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Back to Search
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton
              variant='rectangular'
              width='100%'
              height={400}
              sx={{ borderRadius: "8px" }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Skeleton variant='text' height={60} width='80%' sx={{ mb: 1 }} />
            <Skeleton variant='text' height={40} width='60%' sx={{ mb: 2 }} />

            <Box sx={{ my: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} variant='rounded' width={80} height={32} />
              ))}
            </Box>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[1, 2, 3, 4].map((i) => (
                <Grid size={{ xs: 6, sm: 3 }} key={i}>
                  <Skeleton variant='text' height={24} width='60%' />
                  <Skeleton variant='text' height={28} width='40%' />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Skeleton variant='text' height={40} width='40%' sx={{ mb: 1 }} />
              <Skeleton variant='text' height={20} width='100%' />
              <Skeleton variant='text' height={20} width='100%' />
              <Skeleton variant='text' height={20} width='100%' />
              <Skeleton variant='text' height={20} width='90%' />
              <Skeleton variant='text' height={20} width='95%' />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Skeleton variant='text' height={40} width='40%' sx={{ mb: 1 }} />
              <Skeleton variant='text' height={24} width='70%' />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </MainLayout>
  );

  if (isLoading) {
    return renderSkeleton();
  }

  if (error) {
    return (
      <MainLayout>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant='h6' color='error' gutterBottom>
            {error}
          </Typography>
          <Button variant='contained' startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </MainLayout>
    );
  }

  if (!animeDetails) {
    return renderSkeleton();
  }

  return (
    <MainLayout>
      <Box sx={{ mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Back to Search
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <img
              src={animeDetails.images.jpg.large_image_url}
              alt={animeDetails.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant='h4' gutterBottom>
              {animeDetails.title}
            </Typography>

            {animeDetails.title_english && animeDetails.title_english !== animeDetails.title && (
              <Typography variant='h6' color='text.secondary' gutterBottom>
                {animeDetails.title_english}
              </Typography>
            )}

            <Box sx={{ my: 2 }}>
              {animeDetails.genres &&
                animeDetails.genres.map((genre) => (
                  <Chip key={genre.mal_id} label={genre.name} sx={{ mr: 1, mb: 1 }} size='small' />
                ))}
            </Box>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              {animeDetails.score && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Score:
                  </Typography>
                  <Typography variant='body1' fontWeight='bold'>
                    {animeDetails.score}
                  </Typography>
                </Grid>
              )}

              {animeDetails.rank && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Rank:
                  </Typography>
                  <Typography variant='body1' fontWeight='bold'>
                    #{animeDetails.rank}
                  </Typography>
                </Grid>
              )}

              {animeDetails.popularity && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Popularity:
                  </Typography>
                  <Typography variant='body1' fontWeight='bold'>
                    #{animeDetails.popularity}
                  </Typography>
                </Grid>
              )}

              {animeDetails.type && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Type:
                  </Typography>
                  <Typography variant='body1' fontWeight='bold'>
                    {animeDetails.type}
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant='h6' gutterBottom>
                Synopsis
              </Typography>
              <Typography variant='body1'>
                {animeDetails.synopsis || "No synopsis available."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </MainLayout>
  );
}
