import {
  Box,
  Typography,
  Pagination,
  CircularProgress,
  Paper,
  Container,
  Fade,
  Grow,
  useTheme,
  alpha,
  Alert,
} from "@mui/material";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import { useInitialAnimeLoad } from "../hooks/useInitialAnimeLoad";
import AnimeList from "../components/AnimeList";
import AnimeRecommendations from "../components/AnimeRecommendations";
import MainLayout from "../layouts/MainLayout";
import { useLoading } from "../contexts/LoadingContext";
import { motion } from "framer-motion";
import SearchHeader from "../components/SearchHeader";

export default function SearchPage() {
  // Use our custom hooks
  const {
    searchResults,
    isLoading,
    error,
    searchQuery,
    currentPage,
    handlePageChange,
    isSearchOperation,
    specialCharsSanitized,
  } = useAnimeSearch();

  // Get loading context to track global loading state
  const { isNavigating } = useLoading();
  const theme = useTheme();

  // Handle initial data loading with a delay to avoid rate limits
  useInitialAnimeLoad();

  // Combined loading state (either hook loading or navigation loading)
  const isPageLoading = isLoading || isNavigating;

  // Animation variants for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Only show recommendations when not in search mode and not loading
  const shouldShowRecommendations = !searchQuery && !isPageLoading && !isSearchOperation;

  return (
    <MainLayout>
      <Container
        maxWidth='xl'
        sx={{
          overflow: "hidden",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            py: 2,
            overflow: "hidden",
          }}
        >
          {/* Search Header Component */}
          <SearchHeader />

          {/* Display special characters sanitized notice */}
          {specialCharsSanitized && searchQuery && (
            <Fade in={true}>
              <Alert
                severity='info'
                sx={{
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                Special characters were removed from your search. Results shown for "{searchQuery}".
              </Alert>
            </Fade>
          )}

          {/* Only show recommendations when not searching and not in a loading state */}
          {shouldShowRecommendations && <AnimeRecommendations title='Popular Recommendations' />}

          {error && (
            <Fade in={!!error}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  border: `1px solid ${theme.palette.error.main}`,
                  borderRadius: 2,
                }}
              >
                <Typography color='error.main' variant='h6'>
                  {error}
                </Typography>
              </Paper>
            </Fade>
          )}

          {isPageLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress size={60} thickness={4} />
              <Typography
                variant='h6'
                sx={{
                  mt: 3,
                  fontWeight: 500,
                  color: "text.secondary",
                }}
              >
                Loading amazing anime...
              </Typography>
            </Box>
          ) : searchResults && searchResults.data && searchResults.data.length > 0 ? (
            <Grow in={!isPageLoading} timeout={800}>
              <Box sx={{ overflow: "hidden" }}>
                <Box
                  component={motion.div}
                  variants={containerVariants}
                  initial='hidden'
                  animate='visible'
                >
                  <AnimeList animes={searchResults.data} />
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                    py: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                  }}
                >
                  <Pagination
                    count={searchResults?.pagination?.last_visible_page || 1}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                    disabled={isPageLoading}
                    size='large'
                    siblingCount={1}
                    showFirstButton
                    showLastButton
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: "1rem",
                        fontWeight: 500,
                      },
                    }}
                  />
                </Paper>
              </Box>
            </Grow>
          ) : !isPageLoading ? (
            <Fade in={!isPageLoading} timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.info.main, 0.05),
                  border: `1px dashed ${alpha(theme.palette.info.main, 0.3)}`,
                }}
              >
                <Typography variant='h5' color='text.secondary' gutterBottom>
                  {searchQuery ? "No results found" : "No anime available"}
                </Typography>
                {searchQuery && (
                  <Typography variant='body1' color='text.secondary'>
                    Try using different keywords or check your spelling
                  </Typography>
                )}
              </Paper>
            </Fade>
          ) : null}
        </Box>
      </Container>
    </MainLayout>
  );
}
