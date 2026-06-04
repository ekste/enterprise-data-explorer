import { Link, Route, Routes } from 'react-router-dom';
import { CustomersPage } from './pages/CustomersPage';

function HomePage() {
    return (
        <main>
            <h1>Enterprise Data Explorer</h1>
            <p>A polished React + TypeScript portfolio project.</p>
            <Link to="/customers">View customers</Link>
        </main>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage />} />
        </Routes>
    );
}

export default App;