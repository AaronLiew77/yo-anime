import { useEffect } from "react";
import { useAnimeStore } from "../store/animeStore";

/**
 * Custom hook to handle initial loading of top anime
 * with a delay to avoid rate limiting
 *
 * @param delay Delay in milliseconds before fetching (default: 200)
 */
export function useInitialAnimeLoad(delay: number = 200) {
  const { getTopAnime, searchQuery, currentPage } = useAnimeStore();

  useEffect(() => {
    if (!searchQuery) {
      // Add a small delay before the initial data fetch to avoid hitting rate limits
      const timer = setTimeout(() => {
        getTopAnime(currentPage);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, getTopAnime, currentPage, delay]);
}
