import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export default function Navbar({ onShopNow }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // Check initial scroll position on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Our Story", href: "/#about" },
    { label: "The Difference", href: "/#why" },
    { label: "Collection", href: "/products" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "Lab Results", href: "/lab-results" },
    { label: "Education", href: "/education" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "py-[14px] px-10 bg-[rgba(8,6,4,0.97)] backdrop-blur-md text-text-muted"
          : "py-6 px-10 bg-[linear-gradient(to_bottom,rgba(8,6,4,0.7),transparent)] backdrop-blur-none text-white"
      }`}
    >
      {/* Desktop links */}
      <div className="w-full grid grid-cols-[1fr_auto_1fr] m-0 p-0 gap-10">
        <div className="flex items-center justify-end gap-10">
          {links.slice(0, 4).map((l) => (
            <a key={l.href}
              href={l.href}
              className="font-baskerville no-underline text-[0.6rem] tracking-[3px] uppercase transition-colors duration-300 hover:text-gold text-inherit"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="/" className="no-underline">
          <img src="/images/logo.webp" className="h-12" alt="Purewest" />
        </a>

        <div className="flex items-center gap-10">
          {links.slice(-3).map((l) => (
            <a key={l.href}
              href={l.href}
              className="font-baskerville no-underline text-[0.6rem] tracking-[3px] uppercase transition-colors duration-300 hover:text-gold text-inherit"
            >
              {l.label}
            </a>
          ))}

          <div className="flex items-center gap-4">
            <button
              onClick={onShopNow}
              className="font-baskerville hidden md:block text-[0.5rem] tracking-[3px] uppercase px-6 py-3 transition-all duration-300 font-bold bg-gold text-dark hover:bg-gold-light"
            >
              Shop Now
            </button>
            <Link to="/cart" className="relative flex items-center justify-center p-2 text-inherit no-underline transition-colors duration-300 hover:text-gold-light">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[0.55rem] text-dark bg-gold rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer border-none bg-transparent"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-5 h-px transition-all duration-300 bg-gold" />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 py-6 px-8 flex flex-col gap-5 bg-[rgba(8,6,4,0.97)] border-b border-rule">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-baskerville text-[0.6rem] tracking-[3px] uppercase no-underline text-text-muted"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); if (onShopNow) onShopNow(); }}
            className="font-baskerville text-[0.5rem] tracking-[3px] uppercase px-6 py-3 font-bold w-fit cursor-pointer border-none bg-gold text-dark"
          >
            Shop Now
          </button>
        </div>
      )}
    </nav>
  );
}