import { create } from "zustand";
import { animeService } from "../services/animeService";
import type { Anime, AnimeResponse, AnimeRecommendationsResponse } from "../interfaces";

// Helper function to get error message
const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unknown error occurred";
};

interface AnimeState {
  searchResults: AnimeResponse | null;
  animeDetails: Anime | null;
  recommendations: AnimeRecommendationsResponse | null;
  isLoading: boolean;
  isLoadingRecommendations: boolean;
  error: string | null;
  recommendationsError: string | null;
  searchQuery: string;
  inputValue: string;
  currentPage: number;
  // WelcomeClickbait states
  likedAnime: Anime[];
  dislikedAnime: Anime[];
  animeToShow: Anime[];
  isClickbaitVisible: boolean;
  isDrawerOpen: boolean;
  isDragging: boolean;
  activeTab: number;
  currentDragAnime: Anime | null;
  // Functions
  searchAnime: (query: string, page?: number) => Promise<void>;
  getAnimeDetails: (id: number) => Promise<void>;
  getTopAnime: (page?: number) => Promise<void>;
  getAnimeRecommendations: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setInputValue: (value: string) => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
  // WelcomeClickbait functions
  handleLike: (anime: Anime) => void;
  handleDislike: (anime: Anime) => void;
  setAnimeToShow: (anime: Anime[]) => void;
  setClickbaitVisible: (isVisible: boolean) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
  setActiveTab: (tab: number) => void;
  setCurrentDragAnime: (anime: Anime | null) => void;
  initializePreferences: () => void;
}

export const useAnimeStore = create<AnimeState>((set, get) => ({
  searchResults: null,
  animeDetails: null,
  recommendations: null,
  isLoading: false,
  isLoadingRecommendations: false,
  error: null,
  recommendationsError: null,
  searchQuery: "",
  inputValue: "",
  currentPage: 1,

  // WelcomeClickbait states
  likedAnime: [],
  dislikedAnime: [],
  animeToShow: [],
  isClickbaitVisible: true,
  isDrawerOpen: false,
  isDragging: false,
  activeTab: 0,
  currentDragAnime: null,

  searchAnime: async (query: string, page = 1) => {
    if (query.trim() === "") {
      set({ searchResults: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const results = await animeService.searchAnime({
        q: query,
        page,
        limit: 8,
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
      const results = await animeService.getTopAnime(page, 8);
      set({ searchResults: results, isLoading: false });

      // Update animeToShow based on results
      const state = get();
      if (results?.data && results.data.length > 0) {
        const likedIds = state.likedAnime.map((a) => a.mal_id);
        const dislikedIds = state.dislikedAnime.map((a) => a.mal_id);
        const filteredAnime = results.data.filter(
          (anime: Anime) => !likedIds.includes(anime.mal_id) && !dislikedIds.includes(anime.mal_id)
        );
        set({ animeToShow: filteredAnime.slice(0, 3) });
      }
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  getAnimeRecommendations: async (id: number) => {
    set({ isLoadingRecommendations: true, recommendationsError: null });
    try {
      const results = await animeService.getAnimeRecommendations(id);
      set({ recommendations: results, isLoadingRecommendations: false });
    } catch (error) {
      set({
        recommendationsError: getErrorMessage(error),
        isLoadingRecommendations: false,
      });
    }
  },

  // WelcomeClickbait functions
  handleLike: (anime: Anime) => {
    const { likedAnime, animeToShow } = get();
    const updatedLikedAnime = [...likedAnime, anime];

    // Save to localStorage
    localStorage.setItem("likedAnime", JSON.stringify(updatedLikedAnime));

    // Update state
    set({
      likedAnime: updatedLikedAnime,
      animeToShow: animeToShow.filter((a) => a.mal_id !== anime.mal_id),
    });
  },

  handleDislike: (anime: Anime) => {
    const { dislikedAnime, animeToShow } = get();
    const updatedDislikedAnime = [...dislikedAnime, anime];

    // Save to localStorage
    localStorage.setItem("dislikedAnime", JSON.stringify(updatedDislikedAnime));

    // Update state
    set({
      dislikedAnime: updatedDislikedAnime,
      animeToShow: animeToShow.filter((a) => a.mal_id !== anime.mal_id),
    });
  },

  setAnimeToShow: (anime: Anime[]) => set({ animeToShow: anime }),

  setClickbaitVisible: (isVisible: boolean) => set({ isClickbaitVisible: isVisible }),

  setDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),

  setIsDragging: (isDragging: boolean) => set({ isDragging }),

  setActiveTab: (tab: number) => set({ activeTab: tab }),

  setCurrentDragAnime: (anime: Anime | null) => set({ currentDragAnime: anime }),

  initializePreferences: () => {
    // Load preferences from localStorage
    try {
      const likedFromStorage = localStorage.getItem("likedAnime");
      const dislikedFromStorage = localStorage.getItem("dislikedAnime");

      if (likedFromStorage) {
        const parsed = JSON.parse(likedFromStorage);
        set({ likedAnime: parsed });
      }

      if (dislikedFromStorage) {
        const parsed = JSON.parse(dislikedFromStorage);
        set({ dislikedAnime: parsed });
      }

      // Update animeToShow based on available anime
      const { searchResults, likedAnime, dislikedAnime } = get();
      if (searchResults?.data && searchResults.data.length > 0) {
        const likedIds = likedAnime.map((a) => a.mal_id);
        const dislikedIds = dislikedAnime.map((a) => a.mal_id);
        const filteredAnime = searchResults.data.filter(
          (anime) => !likedIds.includes(anime.mal_id) && !dislikedIds.includes(anime.mal_id)
        );
        set({ animeToShow: filteredAnime.slice(0, 3) });
      }
    } catch (e) {
      console.error("Failed to parse anime preferences from localStorage:", e);
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setInputValue: (value: string) => set({ inputValue: value }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  clearError: () => set({ error: null, recommendationsError: null }),
}));
