import { useMemo } from "react";
import { usePagination } from "./usePagination";

export type FilterRowsFn<T> = (rows: T[], searchText: string) => T[];

/**
 *
 * @param searchValue
 * @param rows
 * @param filterFn function to filter rows by search value, should be memoized
 */
export function useFilterRows<T>(
  searchText: string = "",
  rows: T[],
  filterFn: FilterRowsFn<T>
) {
  const filteredData = useMemo(() => filterFn(rows, searchText.toLowerCase()), [
    filterFn,
    rows,
    searchText,
  ]);
  const { pageData, tableFooterProps } = usePagination(
    filteredData,
    10,
    searchText
  );
  const noMatchingItems =
    pageData && pageData.length === 0 && searchText !== "";
  return { pageData, tableFooterProps, noMatchingItems };
}
