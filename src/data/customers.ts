import type { Customer } from "../types/customer";

export const customers: Customer[] = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Manufacturing",
    status: "active",
    annualRevenue: 12500000,
    employeeCount: 240,
    contactName: "Sarah Mitchell",
    contactEmail: "sarah.mitchell@acme.example",
  },
  {
    id: 2,
    name: "Northstar Finance",
    industry: "Financial Services",
    status: "prospect",
    annualRevenue: 8400000,
    employeeCount: 120,
    contactName: "James Carter",
    contactEmail: "james.carter@northstar.example",
  },
  {
    id: 3,
    name: "Greenline Logistics",
    industry: "Transport",
    status: "inactive",
    annualRevenue: 5100000,
    employeeCount: 75,
    contactName: "Amara Singh",
    contactEmail: "amara.singh@greenline.example",
  },
];
