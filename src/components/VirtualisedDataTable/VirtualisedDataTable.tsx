// todo: Future improvement: switch from container-level virtualisation to page-level virtualisation.

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "../DataTable/DataTable.css";

type SortDirection = "asc" | "desc";

export interface VirtualisedDataTableColumn<TRow> {
  key: string;
  header: string;
  render: (row: TRow) => ReactNode;
  sortValue?: (row: TRow) => string | number;
}

interface VirtualisedDataTableProps<TRow> {
  rows: TRow[];
  columns: VirtualisedDataTableColumn<TRow>[];
  getRowId: (row: TRow) => number;
  rowHeight?: number;
}

export function VirtualisedDataTable<TRow>({
  rows,
  columns,
  getRowId,
  rowHeight = 56,
}: VirtualisedDataTableProps<TRow>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [sortColumnKey, setSortColumnKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedRows = useMemo(() => {
    const sortColumn = columns.find((column) => column.key === sortColumnKey);

    if (!sortColumn?.sortValue) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      const aValue = sortColumn.sortValue!(a);
      const bValue = sortColumn.sortValue!(b);

      const result =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));

      return sortDirection === "asc" ? result : -result;
    });
  }, [columns, rows, sortColumnKey, sortDirection]);

// TanStack Virtual exposes APIs that React Compiler cannot safely memoize.
// This component deliberately uses TanStack's recommended hook API for row virtualisation.
// eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: sortedRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
  });

  function handleSort(column: VirtualisedDataTableColumn<TRow>) {
    if (!column.sortValue) {
      return;
    }

    if (sortColumnKey === column.key) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortColumnKey(column.key);
    setSortDirection("asc");
  }

  return (
    <div className="dataTable">
      <div
        className="dataTable__thead dataTable__virtualHeader"
        role="row"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className="dataTable__cell dataTable__cell--header"
            role="columnheader"
          >
            {column.sortValue ? (
              <button
                className="dataTable__sortButton"
                type="button"
                onClick={() => handleSort(column)}
              >
                {column.header}
                {sortColumnKey === column.key &&
                  (sortDirection === "asc" ? " ↑" : " ↓")}
              </button>
            ) : (
              column.header
            )}
          </div>
        ))}
      </div>

      <div ref={parentRef} className="dataTable__virtualScroller">
        <div
          className="dataTable__virtualSpacer"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = sortedRows[virtualRow.index];

            return (
              <div
                key={getRowId(row)}
                className="dataTable__row dataTable__virtualRow"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                }}
              >
                {columns.map((column) => (
                  <div key={column.key} className="dataTable__cell">
                    {column.render(row)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
