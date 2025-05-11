import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SearchPage from "../../pages/SearchPage";
import { BrowserRouter } from "react-router-dom";

// Mock the custom hooks
jest.mock("../../hooks/useAnimeSearch", () => ({
  useAnimeSearch: jest.fn(),
}));

jest.mock("../../hooks/useInitialAnimeLoad", () => ({
  useInitialAnimeLoad: jest.fn(),
}));

// Mock the contexts
jest.mock("../../contexts/LoadingContext", () => ({
  useLoading: jest.fn().mockReturnValue({
    isNavigating: false,
    setIsNavigating: jest.fn(),
    startNavigationDelay: jest.fn(),
    currentDelaySeconds: 1,
  }),
}));

// Mock components
jest.mock("../../components/AnimeList", () => ({
  __esModule: true,
  default: ({ animes }: { animes: any[] }) => (
    <div data-testid='anime-list'>
      {animes.map((anime) => (
        <div key={anime.mal_id}>{anime.title}</div>
      ))}
    </div>
  ),
}));

jest.mock("../../components/AnimeRecommendations", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid='anime-recommendations'>{title}</div>,
}));

jest.mock("../../components/SearchHeader", () => ({
  __esModule: true,
  default: () => <div data-testid='search-header'>Search Header</div>,
}));

jest.mock("../../layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='main-layout'>{children}</div>
  ),
}));

// Mock the useAnimeSearch hook
import { useAnimeSearch } from "../../hooks/useAnimeSearch";

describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state when isLoading is true", () => {
    (useAnimeSearch as unknown as jest.Mock).mockReturnValue({
      searchResults: null,
      isLoading: true,
      error: null,
      searchQuery: "",
      currentPage: 1,
      handlePageChange: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading amazing anime...")).toBeInTheDocument();
    expect(screen.getByTestId("search-header")).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    const errorMessage = "Failed to fetch anime";

    (useAnimeSearch as unknown as jest.Mock).mockReturnValue({
      searchResults: null,
      isLoading: false,
      error: errorMessage,
      searchQuery: "naruto",
      currentPage: 1,
      handlePageChange: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId("search-header")).toBeInTheDocument();
  });

  test("renders anime list when search results are available", () => {
    const mockSearchResults = {
      data: [
        { mal_id: 1, title: "Naruto" },
        { mal_id: 2, title: "One Piece" },
      ],
      pagination: {
        last_visible_page: 5,
        current_page: 1,
      },
    };

    (useAnimeSearch as unknown as jest.Mock).mockReturnValue({
      searchResults: mockSearchResults,
      isLoading: false,
      error: null,
      searchQuery: "naruto",
      currentPage: 1,
      handlePageChange: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("anime-list")).toBeInTheDocument();
    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("One Piece")).toBeInTheDocument();
  });

  test("renders recommendations when no search query", () => {
    const mockSearchResults = {
      data: [
        { mal_id: 1, title: "Naruto" },
        { mal_id: 2, title: "One Piece" },
      ],
      pagination: {
        last_visible_page: 5,
        current_page: 1,
      },
    };

    (useAnimeSearch as unknown as jest.Mock).mockReturnValue({
      searchResults: mockSearchResults,
      isLoading: false,
      error: null,
      searchQuery: "", // Empty search query
      currentPage: 1,
      handlePageChange: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("anime-recommendations")).toBeInTheDocument();
    expect(screen.getByText("Popular Recommendations")).toBeInTheDocument();
  });

  test("renders no results message when search results are empty", () => {
    const mockSearchResults = {
      data: [],
      pagination: {
        last_visible_page: 0,
        current_page: 1,
      },
    };

    (useAnimeSearch as unknown as jest.Mock).mockReturnValue({
      searchResults: mockSearchResults,
      isLoading: false,
      error: null,
      searchQuery: "nonexistent anime",
      currentPage: 1,
      handlePageChange: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText("Try using different keywords or check your spelling")
    ).toBeInTheDocument();
  });
});
