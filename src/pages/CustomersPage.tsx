import { useState } from 'react';
import { Link } from 'react-router-dom';
import { customers } from '../data/customers';
import type { CustomerStatus } from '../types/customer';

export function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const filteredCustomers = customers.filter((customer) => {
        const searchableText = [
            customer.name,
            customer.industry,
            customer.status,
            customer.contactName,
            customer.contactEmail,
        ]
            .join(' ')
            .toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        const result = a.name.localeCompare(b.name);

        return sortDirection === 'asc' ? result : -result;
    });

    return (
        <main>
            <h1>Customers</h1>

            <label htmlFor="customer-search">Search customers</label>
            <input
                id="customer-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, industry, status or contact"
            />

            <label htmlFor="status-filter">Status</label>
            <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                    setStatusFilter(event.target.value as CustomerStatus | 'all')
                }
            >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="prospect">Prospect</option>
            </select>

            <p>
                Showing {filteredCustomers.length} of {customers.length} customers
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Industry</th>
                        <th>Status</th>
                        <th>Revenue</th>
                        <th>Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.industry}</td>
                            <td>{customer.status}</td>
                            <td>£{customer.annualRevenue.toLocaleString()}</td>
                            <td>{customer.employeeCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                type="button"
                onClick={() =>
                    setSortDirection((currentDirection) =>
                        currentDirection === 'asc' ? 'desc' : 'asc',
                    )
                }
            >
                Sort by name {sortDirection === 'asc' ? '↑' : '↓'}
            </button>

            <p>
                <Link to="/">Back home</Link>
            </p>
        </main>
    );
}