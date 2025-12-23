import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModernHome from "./pages/ModernHome";
import MonthlyCalendar from "./pages/MonthlyCalendar";
import WeddingDates from "./pages/WeddingDates";
import FestivalDates from "./pages/FestivalDates";
import RasiPalan from "./pages/RasiPalan";
import GovtHolidays from "./pages/GovtHolidays";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <div className="App">
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
          
          {/* Special Days - All redirect to Home for now */}
          <Route path="/pournami" element={<ModernHome />} />
          <Route path="/amavasai" element={<ModernHome />} />
          <Route path="/pradosham" element={<ModernHome />} />
          <Route path="/karinal" element={<ModernHome />} />
          
          {/* Government Holidays */}
          <Route path="/govt-holidays" element={<GovtHolidays />} />
          
          {/* Static Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
