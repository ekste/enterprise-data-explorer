import { useState } from "react";
import { Link } from "react-router-dom";
import { customers } from "../data/customers";
import type { CustomerStatus } from "../types/customer";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerDetail } from "../components/CustomerDetail";

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">(
    "all",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );

  const filteredCustomers = customers.filter((customer) => {
    const searchableText = [
      customer.name,
      customer.industry,
      customer.status,
      customer.contactName,
      customer.contactEmail,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const result = a.name.localeCompare(b.name);

    return sortDirection === "asc" ? result : -result;
  });

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  return (
    <main className="main">
      <h1 className="main__header">Customers</h1>
      <div className="searchAndFilters">
        <div className="searchAndFilters__item">
          <label className="searchAndFilters__label" htmlFor="customer-search">
            Search customers
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
              setStatusFilter(event.target.value as CustomerStatus | "all")
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>
        </div>

        <div className="searchAndFilters__context">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>
      <CustomerTable
        customers={sortedCustomers}
        selectedCustomerId={selectedCustomerId}
        onCustomerSelect={setSelectedCustomerId}
      />
      <CustomerDetail customer={selectedCustomer} />
      {/* todo: move button into table controls */}
      <button
        className="main__button"
        type="button"
        onClick={() =>
          setSortDirection((currentDirection) =>
            currentDirection === "asc" ? "desc" : "asc",
          )
        }
      >
        Sort by name {sortDirection === "asc" ? "↑" : "↓"}
      </button>
      <p>
        <Link to="/" className="main__navigation">
          Back home
        </Link>
      </p>
    </main>
  );
}
