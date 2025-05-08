import { Box, Typography, Pagination, CircularProgress, TextField } from "@mui/material";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import { useInitialAnimeLoad } from "../hooks/useInitialAnimeLoad";
import AnimeList from "../components/AnimeList";
import MainLayout from "../layouts/MainLayout";
import { useLoading } from "../contexts/LoadingContext";

export default function SearchPage() {
  // Use our custom hooks
  const {
    inputValue,
    setInputValue,
    searchResults,
    isLoading,
    error,
    searchQuery,
    currentPage,
    handlePageChange,
  } = useAnimeSearch();

  // Get loading context to track global loading state
  const { isNavigating } = useLoading();

  // Handle initial data loading with a delay to avoid rate limits
  useInitialAnimeLoad();

  // Combined loading state (either hook loading or navigation loading)
  const isPageLoading = isLoading || isNavigating;

  return (
    <MainLayout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant='h4' component='h1'>
          {searchQuery ? "Search Results" : "Top Anime"}
        </Typography>

        <TextField
          fullWidth
          variant='outlined'
          label='Search for anime...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isPageLoading}
        />

        {error && (
          <Typography color='error' sx={{ textAlign: "center", my: 2 }}>
            {error}
          </Typography>
        )}

        {isPageLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : searchResults && searchResults.data.length > 0 ? (
          <>
            <AnimeList animes={searchResults.data} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={searchResults.pagination.last_visible_page}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                disabled={isPageLoading}
              />
            </Box>
          </>
        ) : !isPageLoading ? (
          <Typography>{searchQuery ? "No results found" : "No anime available"}</Typography>
        ) : null}
      </Box>
    </MainLayout>
  );
}
