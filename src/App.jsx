import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";

// Lazy Loaded Pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Risk = lazy(() => import("./pages/Risk"));
const Register = lazy(() => import("./pages/Register"));
const MaintenanceForecast = lazy(() => import("./pages/MaintenanceForecast"));
const Decisions = lazy(() => import("./pages/Decisions"));
const Copilot = lazy(() => import("./pages/Copilot"));
const Documents = lazy(() => import("./pages/Documents"));
const SqlRag = lazy(() => import("./pages/SqlRag"));
const AIGovernance = lazy(() => import("./pages/AIGovernance"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Global Loader for Suspense
const GlobalLoader = () => (
  <div className="flex h-screen items-center justify-center bg-[#FAF9F6]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
  </div>
);


function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<GlobalLoader />}>
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
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/risk" element={<Risk />} />
              <Route path="/decisions" element={<Decisions />} />
              <Route path="/maintenance" element={<MaintenanceForecast />} />
              <Route path="/copilot" element={<Copilot />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/sql-rag" element={<SqlRag />} />
              <Route path="/ai-governance" element={<AIGovernance />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Default Catch-All mapped to NotFound outside layout if purely lost */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </AuthProvider>
  );
}

export default App;