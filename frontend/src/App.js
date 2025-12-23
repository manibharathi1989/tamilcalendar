import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Home />} />
          <Route path="/yesterday" element={<Home />} />
          <Route path="/tomorrow" element={<Home />} />
          <Route path="/previous-day" element={<Home />} />
          <Route path="/next-day" element={<Home />} />
          <Route path="/daily" element={<Home />} />
          <Route path="/monthly" element={<Home />} />
          <Route path="/muhurtham" element={<Home />} />
          <Route path="/wedding" element={<Home />} />
          <Route path="/festivals" element={<Home />} />
          <Route path="/rasi-palan" element={<Home />} />
          <Route path="/rasi-palan/:type" element={<Home />} />
          <Route path="/pournami" element={<Home />} />
          <Route path="/amavasai" element={<Home />} />
          <Route path="/pradosham" element={<Home />} />
          <Route path="/karinal" element={<Home />} />
          <Route path="/govt-holidays" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/privacy" element={<Home />} />
          <Route path="/daily/:year" element={<Home />} />
          <Route path="/monthly/:year" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
