import { useState, useEffect, useRef } from "react";
import { useAnimeStore } from "../store/animeStore";
import { useDebounce } from "./useDebounce";
import { useLoading } from "../contexts/LoadingContext";

/**
 * Custom hook for handling anime search functionality with debounce
 *
 * @param initialQuery Initial search query (default: '')
 * @param initialPage Initial page number (default: 1)
 * @param debounceTime Debounce delay in milliseconds (default: 250)
 */
export function useAnimeSearch(
  initialQuery: string = "",
  initialPage: number = 1,
  debounceTime: number = 250
) {
  const {
    searchAnime,
    searchResults,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    getTopAnime,
  } = useAnimeStore();

  const { startNavigationDelay, setIsNavigating } = useLoading();

  const [previousSearchTerm, setPreviousSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState(initialQuery || searchQuery);
  const debouncedSearchTerm = useDebounce(inputValue, debounceTime);

  // Track if a page change is in progress
  const pageChangeInProgress = useRef(false);

  // Handle search when debounced term changes
  useEffect(() => {
    const performSearch = async () => {
      // Only apply loading delay if the search term changed (not on initial load)
      if (previousSearchTerm && debouncedSearchTerm !== previousSearchTerm) {
        await startNavigationDelay();
      }

      if (debouncedSearchTerm) {
        setSearchQuery(debouncedSearchTerm);
        searchAnime(debouncedSearchTerm, currentPage);
      } else {
        setSearchQuery("");
        getTopAnime(currentPage);
      }

      setPreviousSearchTerm(debouncedSearchTerm);
    };

    performSearch();
  }, [
    debouncedSearchTerm,
    currentPage,
    searchAnime,
    setSearchQuery,
    getTopAnime,
    startNavigationDelay,
    previousSearchTerm,
  ]);

  // Handle page change with loading delay
  const handlePageChange = async (_: React.ChangeEvent<unknown>, value: number) => {
    // Prevent multiple page changes from happening simultaneously
    if (pageChangeInProgress.current || isLoading) {
      return;
    }

    // Only show loading and apply delay if changing to a different page
    if (value !== currentPage) {
      try {
        pageChangeInProgress.current = true;
        setIsNavigating(true);
        await startNavigationDelay();
        setCurrentPage(value);
      } finally {
        // Ensure we reset the flag even if there's an error
        pageChangeInProgress.current = false;
      }
    }
  };

  return {
    inputValue,
    setInputValue,
    searchResults,
    isLoading,
    error,
    searchQuery,
    currentPage,
    handlePageChange,
  };
}
