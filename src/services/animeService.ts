import axios, { AxiosError } from "axios";
import i18n from "../i18n";
import type {
  AnimeSearchParams,
  ApiResponse,
  Anime as AnimeData,
  AnimeRecommendation as RecommendationEntry,
} from "../interfaces";

const BASE_URL = "https://api.jikan.moe/v4";

// Jikan API has a rate limit of 3 requests per second
// Increasing base delay to be more conservative with rate limiting
const BASE_DELAY = 1500; // 2 seconds base delay (increased from 1 second)

// Helper function to handle API requests with retry logic and exponential backoff
const makeApiRequest = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  const maxRetries = 3; // Increased from 2 to 3
  let retries = 0;

  // Add a small initial delay to all requests to help prevent rate limiting
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Making API request to:", url, "with params:", params);

  while (retries < maxRetries) {
    try {
      // Add a delay before each retry with exponential backoff
      if (retries > 0) {
        // Calculate exponential backoff delay: BASE_DELAY * 2^retryAttempt
        const exponentialDelay = BASE_DELAY * Math.pow(2, retries);
        console.log(
          `Retry attempt ${retries}/${maxRetries}, waiting ${exponentialDelay}ms before retry`
        );
        await new Promise((resolve) => setTimeout(resolve, exponentialDelay));
      }

      const response = await axios.get<T>(url, { params });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 429) {
        // Rate limit hit - increment retry counter
        retries++;
        console.log(`Rate limit hit (429), retry attempt ${retries}/${maxRetries}`);
      } else {
        // For other errors, throw immediately
        console.error(`API error:`, error);
        throw error;
      }
    }
  }

  throw new Error("Exceeded maximum retry attempts due to rate limiting");
};

// Helper to process anime data based on current language
const processAnimeData = <T extends ApiResponse<AnimeData | AnimeData[] | RecommendationEntry[]>>(
  data: T
): T => {
  const currentLanguage = i18n.language;

  // No transformation needed for English
  if (currentLanguage === "en") {
    return data;
  }

  // For Japanese, try to use Japanese titles if available
  if (currentLanguage === "ja" && data) {
    // For single anime object
    if (data.data && !Array.isArray(data.data)) {
      const animeData = data.data as AnimeData;
      if (animeData.title_japanese) {
        animeData.title = animeData.title_japanese;
      }
    }
    // For arrays of anime
    else if (data.data && Array.isArray(data.data)) {
      // For recommendations data structure
      if (data.data.length > 0 && "entry" in data.data[0]) {
        const recommendations = data.data as RecommendationEntry[];
        data.data = recommendations.map((recommendation: RecommendationEntry) => {
          if (recommendation.entry && recommendation.entry.title_japanese) {
            recommendation.entry.title = recommendation.entry.title_japanese;
          }
          return recommendation;
        }) as unknown as typeof data.data;
      }
      // For normal anime arrays
      else {
        const animeList = data.data as AnimeData[];
        data.data = animeList.map((item: AnimeData) => {
          if (item.title_japanese) {
            item.title = item.title_japanese;
          }
          return item;
        }) as unknown as typeof data.data;
      }
    }
  }

  return data;
};

export const animeService = {
  searchAnime: async (params: AnimeSearchParams) => {
    console.log("Search API params:", params);

    // Special handling for searching "0" - use a broader search if needed
    if (params.q === "0") {
      console.log("Special handling for '0' search");
      // Expand the search to include anime titles with "zero" as well
      params.q = "zero OR 0"; // This will search for either "zero" or "0"
    }

    // Handle special characters in search query
    if (params.q && typeof params.q === "string") {
      // We don't encode here as axios will handle URL encoding, but we sanitize problematic characters
      // that might cause issues with the Jikan API
      const problematicChars = /[\\[\]{}()<>^$|?*+]/g;
      if (problematicChars.test(params.q)) {
        console.log("Sanitizing special characters in search query");
        // Remove problematic regex special characters that can cause API issues
        params.q = params.q.replace(problematicChars, "");

        // If the query becomes empty after sanitization, prevent the API call
        if (params.q.trim() === "") {
          console.log("Search query is empty after sanitization");
          return {
            data: [],
            pagination: {
              last_visible_page: 0,
              has_next_page: false,
              current_page: 1,
              items: {
                count: 0,
                total: 0,
                per_page: 0,
              },
            },
          };
        }
      }
    }

    const data = await makeApiRequest<ApiResponse<AnimeData[]>>(`${BASE_URL}/anime`, params);
    console.log("Search API response:", data);
    return processAnimeData(data);
  },

  getAnimeById: async (id: number) => {
    const data = await makeApiRequest<ApiResponse<AnimeData>>(`${BASE_URL}/anime/${id}`);
    return processAnimeData(data);
  },

  getTopAnime: async (page = 1, limit = 8) => {
    const data = await makeApiRequest<ApiResponse<AnimeData[]>>(`${BASE_URL}/top/anime`, {
      page,
      limit,
    });
    return processAnimeData(data);
  },

  getAnimeRecommendations: async (id: number) => {
    const data = await makeApiRequest<ApiResponse<RecommendationEntry[]>>(
      `${BASE_URL}/anime/${id}/recommendations`
    );
    return processAnimeData(data);
  },
};
