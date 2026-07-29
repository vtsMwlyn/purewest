import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* <Navbar cart={cart} /> */}

      <main className="bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </Router>
  );
}
