import type { CustomerStatusFilter } from "../../utils/filterCustomers";

type CustomerGridControlsProps = {
  searchTerm: string;
  statusFilter: CustomerStatusFilter;
  filteredCount: number;
  totalCount: number;
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: CustomerStatusFilter) => void;
};

export function CustomerGridControls({
  searchTerm,
  statusFilter,
  filteredCount,
  totalCount,
  onSearchTermChange,
  onStatusFilterChange,
}: CustomerGridControlsProps) {
  return (
    <div className="searchAndFilters">
      <label className="searchAndFilters__item">
        <span className="searchAndFilters__label">Search</span>
        <input
          className="searchAndFilters__input"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Search by name, industry, status or contact"
        />
      </label>

      <label className="searchAndFilters__item">
        <span className="searchAndFilters__label">Status</span>
        <select
          className="searchAndFilters__input"
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as CustomerStatusFilter)
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="prospect">Prospect</option>
        </select>
      </label>

      <p className="searchAndFilters__context" aria-live="polite">
        Showing {filteredCount.toLocaleString()} of{" "}
        {totalCount.toLocaleString()} customers
      </p>
    </div>
  );
}