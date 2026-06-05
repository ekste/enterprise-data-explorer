import type { Customer } from "../types/customer";
import "../styles/customerTable.css";

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomerId: number | null;
  onCustomerSelect: (customerId: number) => void;
  sortDirection: "asc" | "desc";
  onSortByName: () => void;
}

export function CustomerTable({
  customers,
  selectedCustomerId,
  onCustomerSelect,
  sortDirection,
  onSortByName,
}: CustomerTableProps) {
  return (
    <table className="customerTable">
      <thead className="customerTable__thead">
        <tr className="customerTable__row customerTable__row--header">
          <th className="customerTable__cell customerTable__cell--header">
            <button
              className="customerTable__sortButton"
              type="button"
              onClick={onSortByName}
              aria-label={`Sort customers by name ${
                sortDirection === "asc" ? "descending" : "ascending"
              }`}
            >
              Name {sortDirection === "asc" ? "↑" : "↓"}
            </button>
          </th>
          <th className="customerTable__cell customerTable__cell--header">
            Industry
          </th>
          <th className="customerTable__cell customerTable__cell--header">
            Status
          </th>
          <th className="customerTable__cell customerTable__cell--header">
            Revenue
          </th>
          <th className="customerTable__cell customerTable__cell--header">
            Employees
          </th>
        </tr>
      </thead>
      <tbody className="customerTable__body">
        {customers.map((customer) => (
          <tr
            className={`customerTable__row ${
              customer.id === selectedCustomerId
                ? "customerTable__row--selected"
                : ""
            }`}
            key={customer.id}
            onClick={() => onCustomerSelect(customer.id)}
            tabIndex={0}
            aria-selected={customer.id === selectedCustomerId}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onCustomerSelect(customer.id);
              }
            }}
          >
            <td className="customerTable__cell">{customer.name}</td>
            <td className="customerTable__cell">{customer.industry}</td>
            <td className="customerTable__cell">{customer.status}</td>
            <td className="customerTable__cell">
              £{customer.annualRevenue.toLocaleString()}
            </td>
            <td className="customerTable__cell">{customer.employeeCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
