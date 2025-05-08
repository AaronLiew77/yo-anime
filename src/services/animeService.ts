import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

// Jikan API has a rate limit of 3 requests per second
// Increasing base delay to be more conservative with rate limiting
const BASE_DELAY = 1500; // 2 seconds base delay (increased from 1 second)

export interface AnimeSearchParams {
  q: string;
  page?: number;
  limit?: number;
}

// Helper function to handle API requests with retry logic and exponential backoff
const makeApiRequest = async (url: string, params?: any) => {
  const maxRetries = 3;
  let retries = 0;

  // Add a small initial delay to all requests to help prevent rate limiting
  await new Promise((resolve) => setTimeout(resolve, 500));

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

      const response = await axios.get(url, { params });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
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

export const animeService = {
  searchAnime: async (params: AnimeSearchParams) => {
    return makeApiRequest(`${BASE_URL}/anime`, params);
  },

  getAnimeById: async (id: number) => {
    return makeApiRequest(`${BASE_URL}/anime/${id}`);
  },

  getTopAnime: async (page = 1, limit = 10) => {
    return makeApiRequest(`${BASE_URL}/top/anime`, { page, limit });
  },
  getAnimeRecommendations: async (id: number) => {
    return makeApiRequest(`${BASE_URL}/anime/${id}/recommendations`);
  },
};
