import { useEffect, useRef, useState } from "react";
import { useAnimeStore } from "../store/animeStore";
import { useDebounce } from "./useDebounce";
import { useLoading } from "../contexts/LoadingContext";

/**
 * Custom hook for handling anime search functionality with debounce
 *
 * @param initialQuery Initial search query (default: '')
 * @param debounceTime Debounce delay in milliseconds (default: 250)
 */
export function useAnimeSearch(initialQuery: string = "", debounceTime: number = 250) {
  const {
    searchAnime,
    searchResults,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    inputValue,
    setInputValue,
    currentPage,
    setCurrentPage,
    getTopAnime,
  } = useAnimeStore();

  const { startNavigationDelay, setIsNavigating } = useLoading();

  // Add a state to track if a search operation is in progress
  const [isSearchOperation, setIsSearchOperation] = useState(false);
  // Add state to track if special characters were sanitized
  const [specialCharsSanitized, setSpecialCharsSanitized] = useState(false);

  const previousSearchTerm = useRef(searchQuery);
  const debouncedSearchTerm = useDebounce(inputValue, debounceTime);

  // Track if a page change is in progress
  const pageChangeInProgress = useRef(false);

  // Initialize input value if needed
  useEffect(() => {
    // Explicit check for empty string, so initialQuery="0" works correctly
    if (initialQuery !== "" && inputValue === "") {
      setInputValue(initialQuery);
    }
  }, [initialQuery, inputValue, setInputValue]);

  // Handle search when debounced term changes
  useEffect(() => {
    const performSearch = async () => {
      // Only apply loading delay if the search term changed (not on initial load)
      if (previousSearchTerm.current && debouncedSearchTerm !== previousSearchTerm.current) {
        await startNavigationDelay();
      }

      console.log(
        "Debounced search term:",
        debouncedSearchTerm,
        "Type:",
        typeof debouncedSearchTerm
      );

      if (debouncedSearchTerm !== "") {
        console.log("Searching for:", debouncedSearchTerm);
        // Check if the search term contains special characters
        const problematicChars = /[\\[\]{}()<>^$|?*+]/g;
        const hasSpecialChars = problematicChars.test(debouncedSearchTerm);
        setSpecialCharsSanitized(hasSpecialChars);

        // Set search operation to true before performing a search
        setIsSearchOperation(true);
        setSearchQuery(debouncedSearchTerm);
        await searchAnime(debouncedSearchTerm, currentPage);
      } else {
        console.log("Empty search, showing top anime");
        setSearchQuery("");
        // Reset search operation flag when clearing search
        setIsSearchOperation(false);
        setSpecialCharsSanitized(false);
        await getTopAnime(currentPage);
      }

      previousSearchTerm.current = debouncedSearchTerm;
    };

    performSearch();
  }, [
    debouncedSearchTerm,
    currentPage,
    searchAnime,
    setSearchQuery,
    getTopAnime,
    startNavigationDelay,
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

  // Make the search operation state available to the UI
  return {
    searchResults,
    isLoading,
    error,
    searchQuery,
    currentPage,
    handlePageChange,
    isSearchOperation,
    specialCharsSanitized,
  };
}
