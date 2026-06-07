import type { Customer, CustomerStatus } from '../types/customer';

const industries = [
    'Manufacturing',
    'Financial Services',
    'Transport',
    'Healthcare',
    'Retail',
    'Technology',
    'Energy',
    'Education',
];

const statuses: CustomerStatus[] = ['active', 'inactive', 'prospect'];

export function generateCustomers(count: number): Customer[] {
    return Array.from({ length: count }, (_, index) => {
        const id = index + 1;
        const industry = industries[index % industries.length];
        const status = statuses[index % statuses.length];

        return {
            id,
            name: `Enterprise Customer ${id}`,
            industry,
            status,
            annualRevenue: 500000 + id * 13750,
            employeeCount: 20 + (id % 900),
            contactName: `Contact ${id}`,
            contactEmail: `contact.${id}@enterprise.example`,
        };
    });
}