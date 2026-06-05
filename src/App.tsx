import { Link, Route, Routes } from "react-router-dom";
import { CustomersPage } from "./pages/CustomersPage";

function HomePage() {
  return (
    <main className="main">
      <h1 className="main__header">Enterprise Data Explorer</h1>
      <p className="main__description">A polished React + TypeScript portfolio project.</p>
      <Link to="/customers" className="main__navigation">View customers</Link>
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
