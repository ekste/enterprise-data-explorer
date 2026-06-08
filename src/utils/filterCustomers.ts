import type { Customer, CustomerStatus } from "../types/customer";

export type CustomerStatusFilter = CustomerStatus | "all";

type FilterCustomersOptions = {
  searchTerm: string;
  statusFilter: CustomerStatusFilter;
};

export function filterCustomers(
  customers: Customer[],
  { searchTerm, statusFilter }: FilterCustomersOptions,
) {
  const normalisedSearchTerm = searchTerm.trim().toLowerCase();

  return customers.filter((customer) => {
    const searchableText = [
      customer.name,
      customer.industry,
      customer.status,
      customer.contactName,
      customer.contactEmail,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalisedSearchTerm.length === 0 ||
      searchableText.includes(normalisedSearchTerm);

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}