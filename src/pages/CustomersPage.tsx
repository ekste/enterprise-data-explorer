import { useState } from "react";
import { customers } from "../data/customers";
import type { CustomerStatus } from "../types/customer";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerDetail } from "../components/CustomerDetail";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useLocalStorage("customerSearchTerm", "");
  const [statusFilter, setStatusFilter] = useLocalStorage<
    CustomerStatus | "all"
  >("customerStatusFilter", "all");
  // const [sortDirection, setSortDirection] = useLocalStorage<"asc" | "desc">(
  //   "customerSortDirection",
  //   "asc",
  // );

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

//const sortedCustomers = [...filteredCustomers];

  // const sortedCustomers = [...filteredCustomers].sort((a, b) => {
  //   const result = a.name.localeCompare(b.name);

  //   return sortDirection === "asc" ? result : -result;
  // });

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  return (
    <main className="main">
      <h1 className="main__header">Customers</h1>
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
      <div className="customersLayout">
        <div className="customersLayout__table">
<CustomerTable
    customers={filteredCustomers}
    selectedCustomerId={selectedCustomerId}
    onCustomerSelect={setSelectedCustomerId}
/>
        </div>

        <aside
          className="customersLayout__detail"
          aria-label="Customer details"
        >
          <CustomerDetail
            customer={selectedCustomer}
            onClose={() => setSelectedCustomerId(null)}
          />
        </aside>
      </div>
    </main>
  );
}
