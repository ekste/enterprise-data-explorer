import { useState } from "react";
import { customers } from "../data/customers";
import type { Customer } from "../types/customer";
import {
  DataTable,
  type DataTableColumn,
} from "../components/DataTable/DataTable";
import { CustomerDetail } from "../components/CustomerDetail/CustomerDetail";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  filterCustomers,
  type CustomerStatusFilter,
} from "../utils/filterCustomers";
import { CustomerGridControls } from "../components/CustomerGridControls/CustomerGridControls";

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
  const [statusFilter, setStatusFilter] = useLocalStorage<CustomerStatusFilter>(
    "customerStatusFilter",
    "all",
  );

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );

  const filteredCustomers = filterCustomers(customers, {
    searchTerm,
    statusFilter,
  });

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  return (
    <main className="main">
      <h1 className="main__header">Customers</h1>
      <p className="main__description">
        Explore a reusable customer data grid with search, status filtering,
        sortable columns, row selection, persisted preferences, and a linked
        detail panel.
      </p>
      <CustomerGridControls
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        filteredCount={filteredCustomers.length}
        totalCount={customers.length}
        onSearchTermChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />
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
