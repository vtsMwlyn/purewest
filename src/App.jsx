import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";

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
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) return;

    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? { ...item, qty: newQty }
          : item
      )
    );
  }

  return (
    <Router>
      <ScrollToTop />

      <Navbar cart={cart} />

      <main className="w-full overflow-x-hidden bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/shop" element={<Shop cart={cart} addToCart={addToCart} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
