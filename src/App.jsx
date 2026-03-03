import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Risk from "./pages/Risk";
import Register from "./pages/Register";
import MaintenanceForecast from "./pages/MaintenanceForecast";
import Decisions from "./pages/Decisions";
import Copilot from "./pages/Copilot";
import Documents from "./pages/Documents";
import SqlRag from "./pages/SqlRag";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected Layout Wrapper */}
  <Route
    element={
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    }
  >
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/risk" element={<Risk />} />
    <Route path="/decisions" element={<Decisions />} />
    <Route path="/maintenance" element={<MaintenanceForecast />} />
    <Route path="/copilot" element={<Copilot />} />
    <Route path="/documents" element={<Documents />} />
    <Route path="/sql-rag" element={<SqlRag />} />
  </Route>

  {/* Default */}
  <Route path="*" element={<Login />} />
</Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;