/**
 * Interfaces for React components
 */

import type { Anime } from "./anime";
import type { ReactNode } from "react";

export interface AnimeListProps {
  animes: Anime[];
  loading?: boolean;
}

export interface AnimeCardProps {
  anime: Anime;
  onClick?: (animeId: number) => void;
}

export interface AnimePreferenceCardProps {
  anime: Anime;
  onRemove?: (animeId: number) => void;
  onDragStart: (anime: Anime) => void;
}

export interface HistoryAnimeCardProps {
  anime: Anime;
  onClick?: (animeId: number) => void;
  type: "like" | "dislike";
}

export interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

export interface AnimeRecommendationsProps {
  animeId: number;
}

export interface PreferenceDropZoneProps {
  onDrop: (anime: Anime) => void;
  color: string;
  title: string;
  icon: React.ReactNode;
  id: string;
}

export interface MainLayoutProps {
  children: ReactNode;
}
