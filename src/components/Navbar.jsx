import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const C = {
  gold: "#A89060",
  goldLight: "#C4AA7A",
  goldPale: "#C8AE80",
  dark: "#0e0a05",
  dark2: "#120d07",
  dark3: "#1a120a",
  rule: "rgba(168,144,96,0.12)",
  text: "#d4c4a8",
  textMuted: "#7a6a55",
};

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
    { label: "Collection", href: "/#products" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "Lab Results", href: "/lab-results" },
  ];

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
      style={{
        padding: scrolled ? "14px 40px" : "24px 40px",
        background: scrolled
          ? "rgba(8,6,4,0.97)"
          : "linear-gradient(to bottom,rgba(8,6,4,0.7),transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? C.rule : "transparent"}`,
      }}
    >
      <a href="/" className="no-underline">
        <div
          className="text-xl tracking-[6px] uppercase font-semibold leading-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}
        >
          Purewest
        </div>
        <div
          className="text-[0.45rem] tracking-[4px] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldPale }}
        >
          Australia
        </div>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="no-underline text-[0.6rem] tracking-[3px] uppercase transition-colors duration-300"
              style={{ color: C.textMuted, fontFamily: "'Libre Baskerville', serif" }}
              onMouseEnter={(e) => (e.target.style.color = C.gold)}
              onMouseLeave={(e) => (e.target.style.color = C.textMuted)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={onShopNow}
          className="hidden md:block text-[0.5rem] tracking-[3px] uppercase px-6 py-3 transition-all duration-300 font-bold"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            background: C.gold,
            color: C.dark,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.goldLight)}
          onMouseLeave={(e) => (e.currentTarget.style.background = C.gold)}
        >
          Shop Now
        </button>
        <Link to="/cart" className="relative flex items-center justify-center p-2 text-white no-underline transition-colors duration-300 hover:text-[#C4AA7A]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[0.55rem] text-[#0e0a05] bg-[#A89060] rounded-full font-bold">
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
            <span key={i} className="block w-5 h-px transition-all duration-300" style={{ background: C.gold }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 py-6 px-8 flex flex-col gap-5"
          style={{ background: "rgba(8,6,4,0.97)", borderBottom: `1px solid ${C.rule}` }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.6rem] tracking-[3px] uppercase no-underline"
              style={{ color: C.textMuted, fontFamily: "'Libre Baskerville', serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); if (onShopNow) onShopNow(); }}
            className="text-[0.5rem] tracking-[3px] uppercase px-6 py-3 font-bold w-fit cursor-pointer border-none"
            style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark }}
          >
            Shop Now
          </button>
        </div>
      )}
    </nav>
  );
}