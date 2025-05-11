import { Typography, TextField, InputAdornment, Paper, useTheme, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAnimeStore } from "../store/animeStore";
import { useLoading } from "../contexts/LoadingContext";

interface SearchHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function SearchHeader({ title, subtitle }: SearchHeaderProps) {
  const theme = useTheme();
  const { inputValue, setInputValue, searchQuery, isLoading } = useAnimeStore();
  const { isNavigating } = useLoading();

  // Combined loading state
  const isPageLoading = isLoading || isNavigating;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(
          theme.palette.primary.main,
          0.6
        )} 100%)`,
        mb: 2,
      }}
    >
      <Typography
        variant='h3'
        component='h1'
        sx={{
          fontWeight: 700,
          color: theme.palette.common.white,
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          mb: 2,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        {title || (searchQuery ? "Search Results" : "Discover Anime")}
      </Typography>

      <Typography
        variant='subtitle1'
        sx={{
          color: theme.palette.common.white,
          opacity: 0.9,
          maxWidth: "700px",
          mb: 2,
        }}
      >
        {subtitle ||
          (searchQuery
            ? `Showing results for "${searchQuery}"`
            : "Explore the top rated anime series and films from around the world. Search for your favorites or discover new ones.")}
      </Typography>

      <TextField
        fullWidth
        variant='outlined'
        placeholder='Search for anime titles, genres or studios...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isPageLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: theme.palette.common.white }} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: alpha(theme.palette.common.white, 0.15),
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.common.white,
            },
            color: theme.palette.common.white,
            "&::placeholder": {
              color: alpha(theme.palette.common.white, 0.7),
            },
          },
        }}
      />
    </Paper>
  );
}
