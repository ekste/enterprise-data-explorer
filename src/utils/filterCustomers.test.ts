import { describe, expect, it } from "vitest";
import type { Customer } from "../types/customer";
import { filterCustomers } from "./filterCustomers";

const customers: Customer[] = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Manufacturing",
    status: "active",
    annualRevenue: 1_000_000,
    employeeCount: 250,
    contactName: "Sarah Mitchell",
    contactEmail: "sarah.mitchell@acme.example",
  },
  {
    id: 2,
    name: "Northstar Finance",
    industry: "Financial Services",
    status: "prospect",
    annualRevenue: 2_000_000,
    employeeCount: 120,
    contactName: "James Carter",
    contactEmail: "james.carter@northstar.example",
  },
  {
    id: 3,
    name: "Blue River Logistics",
    industry: "Transport",
    status: "inactive",
    annualRevenue: 750_000,
    employeeCount: 80,
    contactName: "Priya Shah",
    contactEmail: "priya.shah@blueriver.example",
  },
];

describe("filterCustomers", () => {
  it("returns all customers when search is empty and status is all", () => {
    expect(
      filterCustomers(customers, {
        searchTerm: "",
        statusFilter: "all",
      }),
    ).toEqual(customers);
  });

  it("filters by searchable customer text", () => {
    expect(
      filterCustomers(customers, {
        searchTerm: "finance",
        statusFilter: "all",
      }),
    ).toEqual([customers[1]]);

    expect(
      filterCustomers(customers, {
        searchTerm: "sarah",
        statusFilter: "all",
      }),
    ).toEqual([customers[0]]);

    expect(
      filterCustomers(customers, {
        searchTerm: "blueriver.example",
        statusFilter: "all",
      }),
    ).toEqual([customers[2]]);
  });

  it("filters by status", () => {
    expect(
      filterCustomers(customers, {
        searchTerm: "",
        statusFilter: "inactive",
      }),
    ).toEqual([customers[2]]);
  });

  it("combines search and status filters", () => {
    expect(
      filterCustomers(customers, {
        searchTerm: "finance",
        statusFilter: "prospect",
      }),
    ).toEqual([customers[1]]);

    expect(
      filterCustomers(customers, {
        searchTerm: "finance",
        statusFilter: "active",
      }),
    ).toEqual([]);
  });

  it("trims and lowercases the search term", () => {
    expect(
      filterCustomers(customers, {
        searchTerm: "  SARAH  ",
        statusFilter: "all",
      }),
    ).toEqual([customers[0]]);
  });
});