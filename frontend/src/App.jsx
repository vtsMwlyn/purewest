import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import LabResults from "./pages/LabResults";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticles from "./pages/AdminArticles";
import AdminLabTests from "./pages/AdminLabTests";
import Education from "./pages/Education";
import ArticleDetail from "./pages/ArticleDetail";
import Product from "./pages/Product";
import FAQ from "./pages/FAQ";
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

function ConditionalNavbar() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return <Navbar onShopNow={() => window.location.href = '/products'} />;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />

      <ConditionalNavbar />

      <main className="bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab-results" element={<LabResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/lab-tests" element={<AdminLabTests />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:id" element={<ArticleDetail />} />
          <Route path="/products" element={<Product />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>

      {/* <Footer /> */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#120d07',
            color: '#d4c4a8',
            border: '1px solid rgba(168,144,96,0.12)',
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '0.8rem'
          }
        }} 
      />
      </Router>
    </CartProvider>
  );
}
