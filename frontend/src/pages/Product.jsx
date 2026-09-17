import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import Spinner from "../components/Spinner";

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
        className="fixed inset-0 z-[200] bg-[rgba(5,4,2,0.85)] backdrop-blur-md"
        onClick={onClose}
      />

      <button
        id="panelClose"
        className="fixed top-6 right-6 z-[202] w-11 h-11 flex items-center justify-center transition-all duration-300 bg-dark3 border border-rule hover:border-gold cursor-pointer"
        onClick={onClose}
        aria-label="Close panel"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        id="productPanel"
        className="fixed top-0 right-0 bottom-0 z-[201] overflow-hidden bg-dark2 w-[min(900px,100vw)] shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
      >
        <div className="h-full grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden bg-dark3">
            <img id="panelImg" src={product.img.startsWith('/') && !product.img.includes('localhost') && product.img.startsWith('/uploads') ? product.img : product.img} alt={product.name} className="w-full h-full object-cover brightness-90" />
          </div>

          {/* Details */}
          <div id="panelDetails" className="overflow-y-auto h-full px-12 py-[60px] bg-dark2">
            <p className="text-[0.52rem] tracking-[5px] uppercase mb-4 text-gold">
              {product.eyebrow}
            </p>
            <h2 id="panelName" className="text-[2.4rem] font-light leading-[1.1] mb-2 font-garamond text-white">
              {product.name}
            </h2>
            <span id="panelTa" className="inline-block text-[0.5rem] tracking-[3px] uppercase px-3 py-[5px] mb-6 bg-gold text-dark">
              {product.ta}
            </span>
            <div id="panelPrice" className="text-[2.2rem] font-light mb-8 font-garamond text-gold">
              {sz.p}
            </div>
            <div className="h-px mb-8 bg-rule" />

            <p className="text-[0.52rem] tracking-[3px] uppercase mb-3 text-text-muted">Select Size</p>
            <div id="panelSizes" className="flex gap-3 mb-8 flex-wrap">
              {(typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSizeIdx(i)}
                  className={`px-5 py-[10px] text-[0.58rem] tracking-[2px] uppercase transition-all duration-300 min-w-[72px] font-baskerville border cursor-pointer ${
                    i === activeSizeIdx ? 'bg-gold text-dark border-gold' : 'bg-transparent text-text-muted border-rule hover:border-gold'
                  }`}
                >
                  {s.s}
                </button>
              ))}
            </div>

            <button
              id="panelAddBtn"
              onClick={handleAddToCart}
              className="w-full py-[18px] text-[0.65rem] tracking-[4px] uppercase font-bold mb-4 transition-all duration-400 font-baskerville bg-gold text-dark border-none cursor-pointer hover:bg-gold-light"
            >
              Add to Cart
            </button>
            <button
              className="w-full py-4 text-[0.6rem] tracking-[3px] uppercase mb-10 transition-all duration-300 font-baskerville bg-transparent text-gold border border-rule cursor-pointer hover:border-gold"
            >
              ♡ &nbsp; Save to Wishlist
            </button>

            <p id="panelDesc" className="text-[0.8rem] leading-[2] mb-9 text-text-muted">
              {product.desc}
            </p>

            <p className="text-[0.52rem] tracking-[4px] uppercase mb-4 pb-[10px] text-gold border-b border-rule">
              Product Specifications
            </p>
            <ul id="panelSpecs" className="list-none mb-8 p-0">
              {(typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs).map((s, i) => (
                <li key={i} className="text-[0.75rem] py-[10px] flex gap-3 leading-[1.6] text-text-muted border-b border-[rgba(168,144,96,0.07)]">
                  <span className="text-gold shrink-0">—</span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex gap-5 flex-wrap pt-6 border-t border-rule">
              {(typeof product.icons === 'string' ? JSON.parse(product.icons) : product.icons).map((ic, i) => (
                <div key={i} className="flex flex-col items-center gap-[6px] text-center">
                  <span className="text-[1.4rem]">{ic.emoji}</span>
                  <p className="text-[0.48rem] tracking-[1.5px] uppercase leading-[1.4] text-text-muted max-w-[60px]">
                    {ic.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-9 right-9 z-[998] px-8 py-4 text-[0.6rem] tracking-[3px] uppercase bg-dark3 border border-rule text-gold-pale">
          Added to cart ✓
        </div>
      )}
    </>
  );
}

export default function Product() {
  const [panelId, setPanelId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
    <div className="bg-dark min-h-[100svh] font-baskerville text-text">
      <div className="relative flex flex-col items-center justify-center text-center h-screen w-full bg-[linear-gradient(to_bottom,#120d07,#0e0a05)]">
        <img src="/images/jarrah-hero-product.webp" className="absolute inset-0 w-full h-full object-cover z-0" />

        <div className="relative z-8 bg-linear-to-t from-[rgba(14,10,5,1)] from-10% to-[rgba(26,18,10,0)] h-full w-full flex flex-col items-center justify-end px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12.5 h-px bg-linear-to-r from-transparent to-gold" />
            <p className="text-[0.55rem] tracking-[6px] uppercase text-center text-white">
              Explore The Collection
            </p>
            <div className="w-12.5 h-px bg-linear-to-l from-transparent to-gold" />
          </div>
          <h2 className="text-center font-light mb-5 leading-[1.1] font-garamond text-[clamp(2.2rem,4.5vw,3.8rem)] text-white tracking-[-0.5px]">
            Select Your <em className="text-gold italic">Expression</em>
          </h2>
          <p className="font-garamond text-2xl font-light text-gold">
            Harvested & Bottled in Western Australia
          </p>

          {/* Bottom rule */}
          <div className="flex items-center gap-4 my-8">
            <div className="w-16 h-px opacity-30 bg-gold" />
            <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
            <div className="w-16 h-px opacity-30 bg-gold" />
          </div>
        </div>
      </div>

      <div className="w-full bg-dark py-20">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1140px] mx-auto gap-[1px] bg-rule">
            {products.map((t) => (
              <div
                key={t.id}
                id={`tile-${t.id}`}
                className="relative overflow-hidden cursor-pointer group min-h-[480px] bg-dark3"
                onClick={() => openPanel(t.id)}
              >
                <img
                  src={t.img.startsWith('/') && !t.img.includes('localhost') && t.img.startsWith('/uploads') ? t.img : t.img}
                  alt={t.name}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105 brightness-85"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,6,4,0.85)_0%,rgba(8,6,4,0.1)_50%,transparent_100%)]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-[2]">
                  <span className="text-[0.48rem] tracking-[3px] uppercase px-3 py-1 mb-3 inline-block bg-gold text-dark">
                    {t.ta}
                  </span>
                  <div className="text-[1.6rem] font-light leading-tight mb-1 font-garamond text-white">
                    {t.name}
                  </div>
                  <div className="text-[0.55rem] tracking-[2px] uppercase text-gold-pale">
                    {t.eyebrow}
                  </div>
                </div>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.5rem] tracking-[3px] uppercase px-5 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3] whitespace-nowrap border border-gold text-gold bg-[rgba(8,6,4,0.7)]"
                >
                  View Details
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {panelId && <ProductPanel productId={panelId} products={products} onClose={closePanel} />}
    </div>
  );
}
