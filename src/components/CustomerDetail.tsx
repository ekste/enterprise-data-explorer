import type { Customer } from "../types/customer";
import "../styles/customerDetail.css";

interface CustomerDetailProps {
  customer: Customer | undefined;
  onClose: () => void;
}

export function CustomerDetail({ customer, onClose }: CustomerDetailProps) {
  if (!customer) {
    return;
  }

  return (
    <section className="customerDetail">
      <button
        className="customerDetail__close"
        type="button"
        onClick={onClose}
        aria-label="Close customer details"
      >
        ×
      </button>

      <h2 className="customerDetail__name">{customer.name}</h2>

      <div className="customerDetail__info">
        <strong>Industry:</strong> {customer.industry}
      </div>

      <div className="customerDetail__info">
        <strong>Status:</strong> {customer.status}
      </div>

      <div className="customerDetail__info">
        <strong>Revenue:</strong> £{customer.annualRevenue.toLocaleString()}
      </div>

      <div className="customerDetail__info">
        <strong>Employees:</strong> {customer.employeeCount}
      </div>

      <div className="customerDetail__info">
        <strong>Contact:</strong> {customer.contactName}
      </div>

      <div className="customerDetail__info">
        <strong>Email:</strong> {customer.contactEmail}
      </div>
    </section>
  );
}
