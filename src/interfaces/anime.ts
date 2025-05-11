/**
 * Core anime interfaces for the application
 */

export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis?: string;
  status?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  type?: string;
  episodes?: number;
  url?: string;
  aired?: {
    from: string;
    to: string;
  };
  genres?: Array<{
    mal_id: number;
    name: string;
  }>;
}

export interface AnimeSearchParams {
  q: string;
  page?: number;
  limit?: number;
}

export interface AnimeRecommendation {
  entry: {
    mal_id: number;
    title: string;
    title_japanese?: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
  };
  url: string;
  votes: number;
}
