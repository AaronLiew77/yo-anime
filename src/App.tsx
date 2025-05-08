import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { LoadingProvider } from "./contexts/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e51a2",
    },
    secondary: {
      main: "#e1306c",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <BrowserRouter>
          <LoadingOverlay />
          <Routes>
            <Route path='/' element={<SearchPage />} />
            <Route path='/anime/:id' element={<AnimeDetailPage />} />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
