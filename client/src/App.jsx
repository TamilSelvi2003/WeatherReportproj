import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from './components/Home';
import About from './components/About';
import SearchHistory from "./components/SearchHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<SearchHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
