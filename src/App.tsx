import { Route, Routes } from "react-router-dom";
import { CustomersPage } from "./pages/CustomersPage";
import { VirtualisedCustomersPage } from "./pages/VirtualisedCustomersPage";
import { AppLayout } from './components/AppLayout';

function HomePage() {
  return (
    <main className="main">
      <h1 className="main__header">Enterprise Data Explorer</h1>
      <p className="main__description">
        A polished React + TypeScript portfolio project.
      </p>
    </main>
  );
}

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route
                    path="/virtualised"
                    element={<VirtualisedCustomersPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
