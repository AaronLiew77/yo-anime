import { create } from "zustand";
import { animeService } from "../services/animeService";
import type { Anime, AnimeResponse } from "../types/anime";

interface AnimeState {
  searchResults: AnimeResponse | null;
  animeDetails: Anime | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  searchAnime: (query: string, page?: number) => Promise<void>;
  getAnimeDetails: (id: number) => Promise<void>;
  getTopAnime: (page?: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
}

// Helper to extract user-friendly error messages
const getErrorMessage = (error: any): string => {
  if (error.message?.includes("rate limiting")) {
    return "API rate limit exceeded. Please wait a moment and try again.";
  }
  return error instanceof Error ? error.message : "An unexpected error occurred";
};

export const useAnimeStore = create<AnimeState>((set) => ({
  searchResults: null,
  animeDetails: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,

  searchAnime: async (query: string, page = 1) => {
    if (!query.trim()) {
      set({ searchResults: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const results = await animeService.searchAnime({
        q: query,
        page,
        limit: 10,
      });
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  getAnimeDetails: async (id: number) => {
    set({ isLoading: true, error: null, animeDetails: null });
    try {
      const response = await animeService.getAnimeById(id);
      set({ animeDetails: response.data, isLoading: false });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  getTopAnime: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const results = await animeService.getTopAnime(page, 10);
      // console.log(results);
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  clearError: () => set({ error: null }),
}));
