import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnimeDetailPage from "../../pages/AnimeDetailPage";
import { useAnimeStore } from "../../store/animeStore";
import { BrowserRouter } from "react-router-dom";

// Mock the animeStore
jest.mock("../../store/animeStore", () => ({
  useAnimeStore: jest.fn(),
}));

// Mock MainLayout
jest.mock("../../layouts/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='main-layout'>{children}</div>
  ),
}));

describe("AnimeDetailPage", () => {
  const mockGetAnimeDetails = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useNavigate
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
      useParams: () => ({ id: "1" }),
    }));
  });

  test("renders loading skeleton when isLoading is true", () => {
    // Setup the mock store state
    (useAnimeStore as unknown as jest.Mock).mockReturnValue({
      getAnimeDetails: mockGetAnimeDetails,
      animeDetails: null,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <AnimeDetailPage />
      </BrowserRouter>
    );

    expect(mockGetAnimeDetails).toHaveBeenCalledWith(1);
    expect(screen.getByText("Back to Search")).toBeInTheDocument();
    // Check for the presence of skeletons by looking for a component that exists in the loading state
    expect(screen.getByRole("button", { name: "Back to Search" })).toBeInTheDocument();
    // Also check that at least one skeleton element is present
    const skeletonElements = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  test("renders error message when there is an error", () => {
    const errorMessage = "Failed to fetch anime details";

    (useAnimeStore as unknown as jest.Mock).mockReturnValue({
      getAnimeDetails: mockGetAnimeDetails,
      animeDetails: null,
      isLoading: false,
      error: errorMessage,
    });

    render(
      <BrowserRouter>
        <AnimeDetailPage />
      </BrowserRouter>
    );

    expect(mockGetAnimeDetails).toHaveBeenCalledWith(1);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  test("renders anime details when data is loaded", async () => {
    const mockAnimeDetails = {
      mal_id: 1,
      title: "Test Anime",
      title_english: "Test Anime English",
      synopsis: "This is a test anime",
      score: 8.5,
      rank: 10,
      popularity: 15,
      type: "TV",
      genres: [
        { mal_id: 1, name: "Action" },
        { mal_id: 2, name: "Comedy" },
      ],
      images: {
        jpg: {
          large_image_url: "https://example.com/image.jpg",
        },
      },
    };

    (useAnimeStore as unknown as jest.Mock).mockReturnValue({
      getAnimeDetails: mockGetAnimeDetails,
      animeDetails: mockAnimeDetails,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <AnimeDetailPage />
      </BrowserRouter>
    );

    expect(mockGetAnimeDetails).toHaveBeenCalledWith(1);

    // Check for anime details
    expect(screen.getByText("Test Anime")).toBeInTheDocument();
    expect(screen.getByText("Test Anime English")).toBeInTheDocument();
    expect(screen.getByText("This is a test anime")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("#10")).toBeInTheDocument();
    expect(screen.getByText("#15")).toBeInTheDocument();
    expect(screen.getByText("TV")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    // Check for the image
    const image = screen.getByAltText("Test Anime");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("calls navigate when back button is clicked", () => {
    (useAnimeStore as unknown as jest.Mock).mockReturnValue({
      getAnimeDetails: mockGetAnimeDetails,
      animeDetails: null,
      isLoading: false,
      error: null,
    });

    // Mock the useNavigate hook directly
    const mockedUseNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockedUseNavigate);

    render(
      <BrowserRouter>
        <AnimeDetailPage />
      </BrowserRouter>
    );

    // Click the back button
    screen.getByText("Back to Search").click();

    // Expect navigate to have been called with -1
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });
});
