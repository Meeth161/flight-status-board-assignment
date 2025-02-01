import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { FlightDashboard } from "./pages/FlightDashboard";
import { FlightDetail } from "./pages/FlightDetail";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<FlightDashboard />} />
            <Route path="/flight/:id" element={<FlightDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
