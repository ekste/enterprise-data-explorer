import { useState } from "react";
import { customers } from "../data/customers";
import type { Customer, CustomerStatus } from "../types/customer";
import {
  DataTable,
  type DataTableColumn,
} from "../components/DataTable/DataTable";
import { CustomerDetail } from "../components/CustomerDetail/CustomerDetail";
import { useLocalStorage } from "../hooks/useLocalStorage";

const customerColumns: DataTableColumn<Customer>[] = [
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
  {
    key: "employees",
    header: "Employees",
    render: (customer) => customer.employeeCount,
    sortValue: (customer) => customer.employeeCount,
  },
];

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useLocalStorage("customerSearchTerm", "");
  const [statusFilter, setStatusFilter] = useLocalStorage<
    CustomerStatus | "all"
  >("customerStatusFilter", "all");

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
          <DataTable
            rows={filteredCustomers}
            columns={customerColumns}
            getRowId={(customer) => customer.id}
            selectedRowId={selectedCustomerId}
            onRowSelect={setSelectedCustomerId}
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
