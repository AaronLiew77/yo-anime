/**
 * Interfaces for state management (stores and contexts)
 */

import type { Anime } from "./anime";

export interface AnimeState {
  preferences: Anime[];
  history: Anime[];
  selectedAnimeId: number | null;
}

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface UseAnimePreferencesResult {
  preferences: Anime[];
  addPreference: (anime: Anime) => void;
  removePreference: (animeId: number) => void;
  hasPreference: (animeId: number) => boolean;
  clearPreferences: () => void;
}
