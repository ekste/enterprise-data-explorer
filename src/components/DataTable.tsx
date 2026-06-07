import { useState, type ReactNode } from 'react';
import '../styles/dataTable.css';

type SortDirection = 'asc' | 'desc';

export interface DataTableColumn<TRow> {
    key: string;
    header: string;
    render: (row: TRow) => ReactNode;
    sortValue?: (row: TRow) => string | number;
}

interface DataTableProps<TRow> {
    rows: TRow[];
    columns: DataTableColumn<TRow>[];
    getRowId: (row: TRow) => number;
    selectedRowId: number | null;
    onRowSelect: (rowId: number) => void;
}

export function DataTable<TRow>({
    rows,
    columns,
    getRowId,
    selectedRowId,
    onRowSelect,
}: DataTableProps<TRow>) {
    const [sortColumnKey, setSortColumnKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const sortedRows = [...rows].sort((a, b) => {
        const sortColumn = columns.find((column) => column.key === sortColumnKey);

        if (!sortColumn?.sortValue) {
            return 0;
        }

        const aValue = sortColumn.sortValue(a);
        const bValue = sortColumn.sortValue(b);

        const result =
            typeof aValue === 'number' && typeof bValue === 'number'
                ? aValue - bValue
                : String(aValue).localeCompare(String(bValue));

        return sortDirection === 'asc' ? result : -result;
    });

    function handleSort(column: DataTableColumn<TRow>) {
        if (!column.sortValue) {
            return;
        }

        if (sortColumnKey === column.key) {
            setSortDirection((currentDirection) =>
                currentDirection === 'asc' ? 'desc' : 'asc',
            );
            return;
        }

        setSortColumnKey(column.key);
        setSortDirection('asc');
    }

    return (
        <table className="dataTable">
            <thead className="dataTable__thead">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            className="dataTable__cell dataTable__cell--header"
                        >
                            {column.sortValue ? (
                                <button
                                    className="dataTable__sortButton"
                                    type="button"
                                    onClick={() => handleSort(column)}
                                >
                                    {column.header}
                                    {sortColumnKey === column.key &&
                                        (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                                </button>
                            ) : (
                                column.header
                            )}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {sortedRows.map((row) => {
                    const rowId = getRowId(row);

                    return (
                        <tr
                            key={rowId}
                            className={`dataTable__row ${
                                rowId === selectedRowId
                                    ? 'dataTable__row--selected'
                                    : ''
                            }`}
                            tabIndex={0}
                            aria-selected={rowId === selectedRowId}
                            onClick={() => onRowSelect(rowId)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    onRowSelect(rowId);
                                }
                            }}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="dataTable__cell">
                                    {column.render(row)}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}