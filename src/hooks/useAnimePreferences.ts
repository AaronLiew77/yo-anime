import { useState, useEffect } from "react";
import type { Anime } from "../interfaces/anime";

interface UseAnimePreferencesResult {
  likedAnime: Anime[];
  dislikedAnime: Anime[];
  animeToShow: Anime[];
  handleLike: (anime: Anime) => void;
  handleDislike: (anime: Anime) => void;
  setAnimeToShow: (anime: Anime[]) => void;
}

/**
 * Custom hook to manage anime preferences (likes and dislikes)
 * Stores preferences in localStorage and filters already rated anime
 */
export const useAnimePreferences = (availableAnime: Anime[]): UseAnimePreferencesResult => {
  const [likedAnime, setLikedAnime] = useState<Anime[]>([]);
  const [dislikedAnime, setDislikedAnime] = useState<Anime[]>([]);
  const [animeToShow, setAnimeToShow] = useState<Anime[]>([]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      const likedFromStorage = localStorage.getItem("likedAnime");
      const dislikedFromStorage = localStorage.getItem("dislikedAnime");

      if (likedFromStorage) {
        try {
          setLikedAnime(JSON.parse(likedFromStorage));
        } catch (e) {
          console.error("Failed to parse liked anime from localStorage:", e);
        }
      }

      if (dislikedFromStorage) {
        try {
          setDislikedAnime(JSON.parse(dislikedFromStorage));
        } catch (e) {
          console.error("Failed to parse disliked anime from localStorage:", e);
        }
      }
    };

    loadPreferences();
  }, []);

  // Update anime to show when available anime or preferences change
  useEffect(() => {
    if (availableAnime && availableAnime.length > 0) {
      // Filter out anime that have already been liked or disliked
      const likedIds = likedAnime.map((a) => a.mal_id);
      const dislikedIds = dislikedAnime.map((a) => a.mal_id);
      const filteredAnime = availableAnime.filter(
        (anime) => !likedIds.includes(anime.mal_id) && !dislikedIds.includes(anime.mal_id)
      );

      // Take the first 3 anime for the cards
      setAnimeToShow(filteredAnime.slice(0, 3));
    }
  }, [availableAnime, likedAnime, dislikedAnime]);

  // Handle liked anime
  const handleLike = (anime: Anime) => {
    const updatedLikedAnime = [...likedAnime, anime];
    setLikedAnime(updatedLikedAnime);
    localStorage.setItem("likedAnime", JSON.stringify(updatedLikedAnime));

    // Remove from animeToShow
    setAnimeToShow(animeToShow.filter((a) => a.mal_id !== anime.mal_id));
  };

  // Handle disliked anime
  const handleDislike = (anime: Anime) => {
    const updatedDislikedAnime = [...dislikedAnime, anime];
    setDislikedAnime(updatedDislikedAnime);
    localStorage.setItem("dislikedAnime", JSON.stringify(updatedDislikedAnime));

    // Remove from animeToShow
    setAnimeToShow(animeToShow.filter((a) => a.mal_id !== anime.mal_id));
  };

  return {
    likedAnime,
    dislikedAnime,
    animeToShow,
    handleLike,
    handleDislike,
    setAnimeToShow,
  };
};
