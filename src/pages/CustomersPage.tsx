import { useState } from 'react';
import { Link } from 'react-router-dom';
import { customers } from '../data/customers';

export function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');

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

        return searchableText.includes(searchTerm.toLowerCase());
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
                    {filteredCustomers.map((customer) => (
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

            <p>
                <Link to="/">Back home</Link>
            </p>
        </main>
    );
}