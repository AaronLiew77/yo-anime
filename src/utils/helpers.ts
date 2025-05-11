/**
 * Truncates a string if it exceeds the specified length
 *
 * @param text The string to truncate
 * @param maxLength Maximum length before truncation
 * @param suffix String to append to truncated text (default: '...')
 * @returns Truncated string
 */
export const truncateText = (
  text: string | undefined,
  maxLength: number,
  suffix: string = "..."
): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}${suffix}`;
};

/**
 * Format a date string to a more readable format
 *
 * @param dateStr Date string
 * @returns Formatted date string or 'Unknown' if invalid
 */
export const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return "Unknown";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e: unknown) {
    console.error("Error formatting date:", e);
    return "Unknown";
  }
};
