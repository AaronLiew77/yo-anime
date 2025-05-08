import { useState } from "react";

/**
 * Custom hook for managing loading states and errors
 *
 * @param initialLoading Initial loading state (default: false)
 */
export function useLoading(initialLoading: boolean = false) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const setLoadingError = (message: string) => {
    setError(message);
    setIsLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    clearError,
  };
}
