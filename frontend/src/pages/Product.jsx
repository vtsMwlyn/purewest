import { useState, useEffect } from "react";
import { useCart } from "../CartContext";

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

function SectionRule() {
  return (
    <div className="flex items-center justify-center gap-4 mb-20">
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
      <div className="w-[5px] h-[5px] rotate-45" style={{ background: C.gold }} />
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
    </div>
  );
}

function ProductPanel({ productId, products, onClose }) {
  const [activeSizeIdx, setActiveSizeIdx] = useState(0);
  const [toast, setToast] = useState(false);
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === productId);

  useEffect(() => { setActiveSizeIdx(0); }, [productId]);

  if (!product) return null;

  const sz = product.sizes[activeSizeIdx];

  function handleAddToCart() {
    addToCart({ ...product, id: productId }, sz, 1);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[200]"
        style={{ background: "rgba(5,4,2,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      <button
        id="panelClose"
        className="fixed top-6 right-6 z-[202] w-11 h-11 flex items-center justify-center transition-all duration-300"
        style={{ background: C.dark3, border: `1px solid ${C.rule}` }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.gold)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.rule)}
        onClick={onClose}
        aria-label="Close panel"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        id="productPanel"
        className="fixed top-0 right-0 bottom-0 z-[201] overflow-hidden"
        style={{ width: "min(900px, 100vw)", background: C.dark2, boxShadow: "-20px 0 60px rgba(0,0,0,0.6)" }}
      >
        <div className="h-full" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Image */}
          <div className="relative overflow-hidden" style={{ background: C.dark3 }}>
            <img id="panelImg" src={product.img.startsWith('/') && !product.img.includes('localhost') && product.img.startsWith('/uploads') ? product.img : product.img} alt={product.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.9)" }} />
          </div>

          {/* Details */}
          <div id="panelDetails" className="overflow-y-auto h-full" style={{ padding: "60px 48px", background: C.dark2 }}>
            <p className="text-[0.52rem] tracking-[5px] uppercase mb-4" style={{ color: C.gold }}>
              {product.eyebrow}
            </p>
            <h2 id="panelName" className="text-[2.4rem] font-light leading-[1.1] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
              {product.name}
            </h2>
            <span id="panelTa" className="inline-block text-[0.5rem] tracking-[3px] uppercase px-3 py-[5px] mb-6" style={{ background: C.gold, color: C.dark }}>
              {product.ta}
            </span>
            <div id="panelPrice" className="text-[2.2rem] font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}>
              {sz.p}
            </div>
            <div className="h-px mb-8" style={{ background: C.rule }} />

            <p className="text-[0.52rem] tracking-[3px] uppercase mb-3" style={{ color: C.textMuted }}>Select Size</p>
            <div id="panelSizes" className="flex gap-3 mb-8 flex-wrap">
              {(typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSizeIdx(i)}
                  className="px-5 py-[10px] text-[0.58rem] tracking-[2px] uppercase transition-all duration-300 min-w-[72px]"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    background: i === activeSizeIdx ? C.gold : "transparent",
                    color: i === activeSizeIdx ? C.dark : C.textMuted,
                    border: `1px solid ${i === activeSizeIdx ? C.gold : C.rule}`,
                  }}
                >
                  {s.s}
                </button>
              ))}
            </div>

            <button
              id="panelAddBtn"
              onClick={handleAddToCart}
              className="w-full py-[18px] text-[0.65rem] tracking-[4px] uppercase font-bold mb-4 transition-all duration-400"
              style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark, border: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.goldLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.gold)}
            >
              Add to Cart
            </button>
            <button
              className="w-full py-4 text-[0.6rem] tracking-[3px] uppercase mb-10 transition-all duration-300"
              style={{ fontFamily: "'Libre Baskerville', serif", background: "transparent", color: C.gold, border: `1px solid ${C.rule}` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.rule)}
            >
              ♡ &nbsp; Save to Wishlist
            </button>

            <p id="panelDesc" className="text-[0.8rem] leading-[2] mb-9" style={{ color: C.textMuted }}>
              {product.desc}
            </p>

            <p className="text-[0.52rem] tracking-[4px] uppercase mb-4 pb-[10px]" style={{ color: C.gold, borderBottom: `1px solid ${C.rule}` }}>
              Product Specifications
            </p>
            <ul id="panelSpecs" className="list-none mb-8 p-0">
              {(typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs).map((s, i) => (
                <li key={i} className="text-[0.75rem] py-[10px] flex gap-3 leading-[1.6]" style={{ color: C.textMuted, borderBottom: "1px solid rgba(168,144,96,0.07)" }}>
                  <span style={{ color: C.gold, flexShrink: 0 }}>—</span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex gap-5 flex-wrap pt-6" style={{ borderTop: `1px solid ${C.rule}` }}>
              {(typeof product.icons === 'string' ? JSON.parse(product.icons) : product.icons).map((ic, i) => (
                <div key={i} className="flex flex-col items-center gap-[6px] text-center">
                  <span className="text-[1.4rem]">{ic.emoji}</span>
                  <p className="text-[0.48rem] tracking-[1.5px] uppercase leading-[1.4]" style={{ color: C.textMuted, maxWidth: "60px" }}>
                    {ic.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          className="fixed bottom-9 right-9 z-[998] px-8 py-4 text-[0.6rem] tracking-[3px] uppercase"
          style={{ background: C.dark3, border: `1px solid ${C.rule}`, color: C.goldPale }}
        >
          Added to cart ✓
        </div>
      )}
    </>
  );
}

export default function Product() {
  const [panelId, setPanelId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const openPanel = (id) => {
    setPanelId(id);
    document.body.style.overflow = "hidden";
  };
  const closePanel = () => {
    setPanelId(null);
    document.body.style.overflow = "";
  };

  return (
    <div style={{ background: C.dark, minHeight: "100svh", paddingTop: "100px", color: C.text, fontFamily: "'Libre Baskerville', serif" }}>
      <section id="products" className="px-[72px] py-[80px]" style={{ background: C.dark }}>
        <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6" style={{ color: C.gold }}>
          The Collection
        </p>
        <h2
          className="text-center font-light mb-5 leading-[1.1]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#fff", letterSpacing: "-0.5px" }}
        >
          Select Your <em style={{ color: C.gold, fontStyle: "italic" }}>Expression</em>
        </h2>
        <SectionRule />

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1140px] mx-auto" style={{ gap: "1px", background: C.rule }}>
          {products.map((t) => (
            <div
              key={t.id}
              id={`tile-${t.id}`}
              className="relative overflow-hidden cursor-pointer group"
              style={{ minHeight: "480px", background: C.dark3 }}
              onClick={() => openPanel(t.id)}
            >
              <img
                src={t.img.startsWith('/') && !t.img.includes('localhost') && t.img.startsWith('/uploads') ? t.img : t.img}
                alt={t.name}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.85)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,6,4,0.85) 0%, rgba(8,6,4,0.1) 50%, transparent 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-[2]">
                <span className="text-[0.48rem] tracking-[3px] uppercase px-3 py-1 mb-3 inline-block" style={{ background: C.gold, color: C.dark }}>
                  {t.ta}
                </span>
                <div className="text-[1.6rem] font-light leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                  {t.name}
                </div>
                <div className="text-[0.55rem] tracking-[2px] uppercase" style={{ color: C.goldPale }}>
                  {t.eyebrow}
                </div>
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.5rem] tracking-[3px] uppercase px-5 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3] whitespace-nowrap"
                style={{ border: `1px solid ${C.gold}`, color: C.gold, background: "rgba(8,6,4,0.7)" }}
              >
                View Details
              </div>
            </div>
          ))}
        </div>
      </section>

      {panelId && <ProductPanel productId={panelId} products={products} onClose={closePanel} />}
    </div>
  );
}
