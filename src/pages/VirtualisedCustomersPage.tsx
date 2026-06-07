import {
  VirtualisedDataTable,
  type VirtualisedDataTableColumn,
} from "../components/VirtualisedDataTable/VirtualisedDataTable";
import { generateCustomers } from "../data/generateCustomers";
import type { Customer } from "../types/customer";

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
  return (
    <main className="main">
      <h1 className="main__header">Virtualised Customers</h1>
      <p className="main__description">
        A large customer dataset used to demonstrate virtualised rendering.
      </p>

      <VirtualisedDataTable
        rows={largeCustomers}
        columns={columns}
        getRowId={(customer) => customer.id}
      />
    </main>
  );
}
