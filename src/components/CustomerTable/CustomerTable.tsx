import { DataTable, type DataTableColumn } from '../DataTable/DataTable';
import type { Customer } from '../../types/customer';

interface CustomerTableProps {
    customers: Customer[];
    selectedCustomerId: number | null;
    onCustomerSelect: (customerId: number) => void;
}

const customerColumns: DataTableColumn<Customer>[] = [
    {
        key: 'name',
        header: 'Name',
        render: (customer) => customer.name,
        sortValue: (customer) => customer.name,
    },
    {
        key: 'industry',
        header: 'Industry',
        render: (customer) => customer.industry,
        sortValue: (customer) => customer.industry,
    },
    {
        key: 'status',
        header: 'Status',
        render: (customer) => customer.status,
        sortValue: (customer) => customer.status,
    },
    {
        key: 'revenue',
        header: 'Revenue',
        render: (customer) => `£${customer.annualRevenue.toLocaleString()}`,
        sortValue: (customer) => customer.annualRevenue,
    },
    {
        key: 'employees',
        header: 'Employees',
        render: (customer) => customer.employeeCount,
        sortValue: (customer) => customer.employeeCount,
    },
];

export function CustomerTable({
    customers,
    selectedCustomerId,
    onCustomerSelect,
}: CustomerTableProps) {
    return (
        <DataTable
            rows={customers}
            columns={customerColumns}
            getRowId={(customer) => customer.id}
            selectedRowId={selectedCustomerId}
            onRowSelect={onCustomerSelect}
        />
    );
}