import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import LabResults from "./pages/LabResults";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticles from "./pages/AdminArticles";
import { CartProvider } from "./CartContext";

import Navbar from "./components/Navbar";
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
    <CartProvider>
      <Router>
        <ScrollToTop />

      <Navbar onShopNow={() => {
        if (window.location.pathname === '/') {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = '/#products';
        }
      }} />

      <main className="bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab-results" element={<LabResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
        </Routes>
      </main>

      {/* <Footer /> */}
      </Router>
    </CartProvider>
  );
}
