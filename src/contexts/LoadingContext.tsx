import { createContext, useState, useContext, useRef } from "react";
import type { ReactNode } from "react";

interface LoadingContextType {
  isNavigating: boolean;
  setIsNavigating: (value: boolean) => void;
  startNavigationDelay: () => Promise<void>;
  currentDelaySeconds: number;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Base delay for navigation - match with animeService but increase to handle rate limits better
const BASE_DELAY = 500; // 1.2  seconds base delay (increased from 1 second)
const MAX_DELAY = 3300; // 6 seconds max (increased from 5 seconds)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentDelaySeconds, setCurrentDelaySeconds] = useState(Math.ceil(BASE_DELAY / 1000));
  // Track navigation attempts
  const navigationCountRef = useRef(0);
  const lastNavigationTimeRef = useRef(Date.now());

  const startNavigationDelay = async () => {
    setIsNavigating(true);

    // Check if we've had multiple navigations in quick succession
    const now = Date.now();
    const timeSinceLastNav = now - lastNavigationTimeRef.current;

    // If last navigation was less than 10 seconds ago, increment counter
    // Increased from 5 seconds to be more conservative with rate limiting
    if (timeSinceLastNav < 10000) {
      navigationCountRef.current += 1;
    } else {
      // Reset counter if it's been a while
      navigationCountRef.current = 0;
    }

    // Update last navigation time
    lastNavigationTimeRef.current = now;

    // Calculate dynamic delay - using more aggressive exponential backoff
    // But cap the maximum delay
    const dynamicDelay = Math.min(
      BASE_DELAY * Math.pow(2, navigationCountRef.current), // Changed from 1.5 to 2 for more aggressive backoff
      MAX_DELAY
    );

    // Update the current delay in seconds (rounded up)
    const delaySeconds = Math.ceil(dynamicDelay / 1000);
    setCurrentDelaySeconds(delaySeconds);

    console.log(
      `Navigation delay: ${dynamicDelay}ms (consecutive navigations: ${navigationCountRef.current})`
    );

    // Apply the delay
    await new Promise((resolve) => setTimeout(resolve, dynamicDelay));
    setIsNavigating(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isNavigating, setIsNavigating, startNavigationDelay, currentDelaySeconds }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
