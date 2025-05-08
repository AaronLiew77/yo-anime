import { useState } from "react";

/**
 * Custom hook for handling pagination
 *
 * @param initialPage Initial page number (default: 1)
 */
export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const resetPage = () => {
    setCurrentPage(initialPage);
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    resetPage,
  };
}
