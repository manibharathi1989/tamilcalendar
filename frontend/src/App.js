import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ModernHome from "./pages/ModernHome";
import MonthlyCalendar from "./pages/MonthlyCalendar";
import WeddingDates from "./pages/WeddingDates";
import FestivalDates from "./pages/FestivalDates";
import RasiPalan from "./pages/RasiPalan";
import GovtHolidays from "./pages/GovtHolidays";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Pournami from "./pages/Pournami";
import Amavasai from "./pages/Amavasai";
import Pradosham from "./pages/Pradosham";
import Ekadasi from "./pages/Ekadasi";
import GuruPeyarchi from "./pages/GuruPeyarchi";
import SaniPeyarchi from "./pages/SaniPeyarchi";
import RaaguKethuPeyarchi from "./pages/RaaguKethuPeyarchi";
import Karinal from "./pages/Karinal";
import SashtiViradham from "./pages/SashtiViradham";
import SankataharaChathurthi from "./pages/SankataharaChathurthi";
import Karthigai from "./pages/Karthigai";
import Navami from "./pages/Navami";
import Ashtami from "./pages/Ashtami";
import Thiruvonam from "./pages/Thiruvonam";
import MaadhaSivarathiri from "./pages/MaadhaSivarathiri";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CalendarEditor from "./pages/admin/CalendarEditor";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModernHome />} />
            <Route path="/today" element={<ModernHome />} />
            <Route path="/yesterday" element={<ModernHome />} />
            <Route path="/tomorrow" element={<ModernHome />} />
            <Route path="/previous-day" element={<ModernHome />} />
            <Route path="/next-day" element={<ModernHome />} />
            <Route path="/daily" element={<ModernHome />} />
            <Route path="/daily/:year" element={<ModernHome />} />
            
            {/* Monthly Calendar */}
            <Route path="/monthly" element={<MonthlyCalendar />} />
            <Route path="/monthly/:year" element={<MonthlyCalendar />} />
            
            {/* Wedding & Festival Dates */}
            <Route path="/wedding" element={<WeddingDates />} />
            <Route path="/muhurtham" element={<WeddingDates />} />
            <Route path="/festivals" element={<FestivalDates />} />
            
            {/* Rasi Palan */}
            <Route path="/rasi-palan" element={<RasiPalan />} />
            <Route path="/rasi-palan/:type" element={<RasiPalan />} />
            
            {/* Special Religious Days */}
            <Route path="/pournami" element={<Pournami />} />
            <Route path="/amavasai" element={<Amavasai />} />
            <Route path="/pradosham" element={<Pradosham />} />
            <Route path="/ekadasi" element={<Ekadasi />} />
            <Route path="/karinal" element={<Karinal />} />
            <Route path="/sashti-viradham" element={<SashtiViradham />} />
            <Route path="/sankatahara-chathurthi" element={<SankataharaChathurthi />} />
            <Route path="/karthigai" element={<Karthigai />} />
            <Route path="/navami" element={<Navami />} />
            <Route path="/ashtami" element={<Ashtami />} />
            <Route path="/thiruvonam" element={<Thiruvonam />} />
            <Route path="/maadha-sivarathiri" element={<MaadhaSivarathiri />} />
            
            {/* Planetary Transits */}
            <Route path="/rasi-palan/guru" element={<GuruPeyarchi />} />
            <Route path="/rasi-palan/sani" element={<SaniPeyarchi />} />
            <Route path="/rasi-palan/ragu-kethu" element={<RaaguKethuPeyarchi />} />
            
            {/* Government Holidays */}
            <Route path="/govt-holidays" element={<GovtHolidays />} />
            
            {/* Static Pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/editor" element={<ProtectedRoute><CalendarEditor /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
