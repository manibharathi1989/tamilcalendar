import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModernHome from "./pages/ModernHome";

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
          <Route path="/monthly" element={<ModernHome />} />
          <Route path="/muhurtham" element={<ModernHome />} />
          <Route path="/wedding" element={<ModernHome />} />
          <Route path="/festivals" element={<ModernHome />} />
          <Route path="/rasi-palan" element={<ModernHome />} />
          <Route path="/rasi-palan/:type" element={<ModernHome />} />
          <Route path="/pournami" element={<ModernHome />} />
          <Route path="/amavasai" element={<ModernHome />} />
          <Route path="/pradosham" element={<ModernHome />} />
          <Route path="/karinal" element={<ModernHome />} />
          <Route path="/govt-holidays" element={<ModernHome />} />
          <Route path="/contact" element={<ModernHome />} />
          <Route path="/about" element={<ModernHome />} />
          <Route path="/privacy" element={<ModernHome />} />
          <Route path="/daily/:year" element={<ModernHome />} />
          <Route path="/monthly/:year" element={<ModernHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
