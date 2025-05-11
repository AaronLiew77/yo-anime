/**
 * API response interfaces for external APIs
 */

// Need to import these types before using them
import type { Anime, AnimeRecommendation } from "./anime";

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeResponse {
  data: Anime[];
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeDetailResponse {
  data: Anime;
}

export interface AnimeRecommendationsResponse {
  data: AnimeRecommendation[];
}
