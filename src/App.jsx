import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Research from "./pages/Research";
import ContactUs from "./pages/ContactUs";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

      <Navbar />

      <main className="w-full bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
