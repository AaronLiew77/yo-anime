import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchHeader from "../../components/SearchHeader";
import { useAnimeStore } from "../../store/animeStore";
import { useLoading } from "../../contexts/LoadingContext";

// Mock the store and context
jest.mock("../../store/animeStore");
jest.mock("../../contexts/LoadingContext");

// Mock the MUI theme
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: () => ({
    palette: {
      primary: { main: "#1976d2" },
      common: { white: "#fff" },
    },
    breakpoints: { up: jest.fn() },
  }),
  alpha: () => "rgba(0,0,0,0.5)",
}));

describe("SearchHeader", () => {
  const mockSetInputValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue: mockSetInputValue,
      searchQuery: "",
      isLoading: false,
    } as any);

    (useLoading as jest.MockedFunction<typeof useLoading>).mockReturnValue({
      isNavigating: false,
    } as any);
  });

  test("renders with default title and subtitle when not searching", () => {
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue: mockSetInputValue,
      searchQuery: "",
      isLoading: false,
    } as any);

    render(<SearchHeader />);

    expect(screen.getByText("Discover Anime")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Explore the top rated anime series and films from around the world. Search for your favorites or discover new ones."
      )
    ).toBeInTheDocument();
  });

  test("renders with search results title and query subtitle when searching", () => {
    const searchQuery = "naruto";
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "naruto",
      setInputValue: mockSetInputValue,
      searchQuery,
      isLoading: false,
    } as any);

    render(<SearchHeader />);

    expect(screen.getByText("Search Results")).toBeInTheDocument();
    expect(screen.getByText(`Showing results for "${searchQuery}"`)).toBeInTheDocument();
  });

  test("renders custom title and subtitle when provided", () => {
    const customTitle = "Custom Title";
    const customSubtitle = "Custom Subtitle";

    render(<SearchHeader title={customTitle} subtitle={customSubtitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  test("updates input value when typing in search field", () => {
    const setInputValue = jest.fn();
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue,
      searchQuery: "",
      isLoading: false,
    } as any);

    render(<SearchHeader />);

    const searchInput = screen.getByPlaceholderText(
      "Search for anime titles, genres or studios..."
    );
    fireEvent.change(searchInput, { target: { value: "one piece" } });

    expect(setInputValue).toHaveBeenCalledWith("one piece");
  });

  test("search field is disabled when loading", () => {
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue: mockSetInputValue,
      searchQuery: "",
      isLoading: true,
    } as any);

    (useLoading as jest.MockedFunction<typeof useLoading>).mockReturnValue({
      isNavigating: false,
    } as any);

    render(<SearchHeader />);

    const searchInput = screen.getByPlaceholderText(
      "Search for anime titles, genres or studios..."
    );
    expect(searchInput).toBeDisabled();
  });

  test("search field is disabled when navigating", () => {
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue: mockSetInputValue,
      searchQuery: "",
      isLoading: false,
    } as any);

    (useLoading as jest.MockedFunction<typeof useLoading>).mockReturnValue({
      isNavigating: true,
    } as any);

    render(<SearchHeader />);

    const searchInput = screen.getByPlaceholderText(
      "Search for anime titles, genres or studios..."
    );
    expect(searchInput).toBeDisabled();
  });

  test("search field is disabled when both loading and navigating", () => {
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue: mockSetInputValue,
      searchQuery: "",
      isLoading: true,
    } as any);

    (useLoading as jest.MockedFunction<typeof useLoading>).mockReturnValue({
      isNavigating: true,
    } as any);

    render(<SearchHeader />);

    const searchInput = screen.getByPlaceholderText(
      "Search for anime titles, genres or studios..."
    );
    expect(searchInput).toBeDisabled();
  });

  test("search field is enabled when not loading or navigating", () => {
    (useAnimeStore as jest.MockedFunction<typeof useAnimeStore>).mockReturnValue({
      inputValue: "",
      setInputValue: mockSetInputValue,
      searchQuery: "",
      isLoading: false,
    } as any);

    (useLoading as jest.MockedFunction<typeof useLoading>).mockReturnValue({
      isNavigating: false,
    } as any);

    render(<SearchHeader />);

    const searchInput = screen.getByPlaceholderText(
      "Search for anime titles, genres or studios..."
    );
    expect(searchInput).not.toBeDisabled();
  });
});
