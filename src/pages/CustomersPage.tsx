import { Link } from 'react-router-dom';
import { customers } from '../data/customers';

export function CustomersPage() {
    return (
        <main>
            <h1>Customers</h1>

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
                    {customers.map((customer) => (
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