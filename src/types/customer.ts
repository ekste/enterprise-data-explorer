export type CustomerStatus = "active" | "inactive" | "prospect";

export interface Customer {
  id: number;
  name: string;
  industry: string;
  status: CustomerStatus;
  annualRevenue: number;
  employeeCount: number;
  contactName: string;
  contactEmail: string;
}
