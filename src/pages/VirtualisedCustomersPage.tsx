import {
  VirtualisedDataTable,
  type VirtualisedDataTableColumn,
} from "../components/VirtualisedDataTable/VirtualisedDataTable";
import { generateCustomers } from "../data/generateCustomers";
import type { Customer } from "../types/customer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  filterCustomers,
  type CustomerStatusFilter,
} from "../utils/filterCustomers";

const largeCustomers = generateCustomers(10000);

const columns: VirtualisedDataTableColumn<Customer>[] = [
  {
    key: "name",
    header: "Name",
    render: (customer) => customer.name,
    sortValue: (customer) => customer.name,
  },
  {
    key: "industry",
    header: "Industry",
    render: (customer) => customer.industry,
    sortValue: (customer) => customer.industry,
  },
  {
    key: "status",
    header: "Status",
    render: (customer) => customer.status,
    sortValue: (customer) => customer.status,
  },
  {
    key: "revenue",
    header: "Revenue",
    render: (customer) => `£${customer.annualRevenue.toLocaleString()}`,
    sortValue: (customer) => customer.annualRevenue,
  },
];

export function VirtualisedCustomersPage() {
  const [searchTerm, setSearchTerm] = useLocalStorage(
    "virtualisedCustomerSearchTerm",
    "",
  );

  const [statusFilter, setStatusFilter] = useLocalStorage<CustomerStatusFilter>(
    "virtualisedCustomerStatusFilter",
    "all",
  );

  const filteredCustomers = filterCustomers(largeCustomers, {
    searchTerm,
    statusFilter,
  });
  return (
    <main className="main">
      <h1 className="main__header">Virtualised</h1>
      <p className="main__description">
        This page renders 10,000 generated customers using row virtualisation.
        Sorting is still supported, but only the visible rows are mounted in the
        DOM.
      </p>

      <div className="searchAndFilters">
        <div className="searchAndFilters__item">
          <label className="searchAndFilters__label" htmlFor="customer-search">
            Search
          </label>
          <input
            className="searchAndFilters__input searchAndFilters__input--search"
            id="customer-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, industry, status or contact"
          />
        </div>
        <div className="searchAndFilters__item">
          <label className="searchAndFilters__label" htmlFor="status-filter">
            Status
          </label>
          <select
            className="searchAndFilters__input searchAndFilters__input--select"
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as CustomerStatusFilter)
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>
        </div>
        <div className="searchAndFilters__context">
          Showing {filteredCustomers.length.toLocaleString()} of{" "}
          {largeCustomers.length.toLocaleString()} customers
        </div>
      </div>

      <VirtualisedDataTable
        rows={filteredCustomers}
        columns={columns}
        getRowId={(customer) => customer.id}
      />
    </main>
  );
}
