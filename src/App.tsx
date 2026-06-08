import { Route, Routes } from "react-router-dom";
import { CustomersPage } from "./pages/CustomersPage";
import { VirtualisedCustomersPage } from "./pages/VirtualisedCustomersPage";
import { AppLayout } from './components/AppLayout';

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<CustomersPage />} />
                <Route
                    path="/virtualised"
                    element={<VirtualisedCustomersPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
