import { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../CartContext";

/* ─── Design tokens (matching the original CSS variables) ─── */
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

/* ─── Product data fetched from API ───────────────────────────── */
function SectionRule() {
  return (
    <div className="flex items-center justify-center gap-4 mb-20">
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
      <div className="w-[5px] h-[5px] rotate-45" style={{ background: C.gold }} />
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 mb-7">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-[10px] h-[10px]"
          style={{
            background: C.gold,
            clipPath:
              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
          }}
        />
      ))}
    </div>
  );
}



/* ─── Hero ─────────────────────────────────────────────────── */
const HERO_SLIDES = [
  { id: "heroSlide0", img: "/images/heroslide0.jpg", label: "Jarrah" },
  { id: "heroSlide1", img: null, label: "Marri" },
  { id: "heroSlide2", img: null, label: "Karri" },
  { id: "heroSlide3", img: null, label: "Forest" },
  { id: "heroSlide4", img: null, label: "Harvest" },
];

function Hero({ onShopNow }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const advance = useCallback(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    timerRef.current = setInterval(advance, 5500);
    return () => clearInterval(timerRef.current);
  }, [advance]);

  function goTo(idx) {
    setCurrent(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5500);
  }

  return (
    <div id="hero" className="flex flex-col" style={{ background: C.dark, minHeight: "100svh" }}>
      {/* Photo zone */}
      <div id="heroPhotoZone" className="relative overflow-hidden flex-1" style={{ minHeight: "60vh" }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: i === current ? 1 : 0,
              backgroundImage: s.img ? `url(${s.img})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!s.img && (
              <>
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 50% 40%, rgba(90,50,5,0.35) 0%, transparent 70%), ${C.dark}` }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] font-light pointer-events-none select-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(168,144,96,0.05)" }}
                >
                  {s.label}
                </div>
              </>
            )}
          </div>
        ))}
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[70px] pointer-events-none z-[2]"
          style={{ background: `linear-gradient(to bottom, transparent, ${C.dark})` }}
        />
      </div>

      {/* Dot indicators */}
      <div id="heroDots" className="flex justify-center items-center gap-3 py-[10px] relative z-[5]" style={{ background: C.dark }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="border-none cursor-pointer transition-all duration-400"
            style={{
              width: i === current ? "44px" : "28px",
              height: "12px",
              background: "transparent",
              padding: "5px 0",
              backgroundImage: `linear-gradient(${i === current ? C.gold : "rgba(168,144,96,0.3)"}, ${i === current ? C.gold : "rgba(168,144,96,0.3)"})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 2px",
              backgroundPosition: "center",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content zone */}
      <div id="heroContent" className="w-full flex flex-col items-center justify-center px-10 pt-5 pb-9 relative z-[5]" style={{ background: C.dark }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-[50px] h-px" style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
          <span className="text-[0.5rem] tracking-[4px] uppercase whitespace-nowrap" style={{ color: C.gold }}>
            Pure · Wild · Western Australia
          </span>
          <div className="w-[50px] h-px" style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
        </div>

        <img
          src="/images/herologoimg.png"
          alt="PureWest Australia"
          className="w-40 h-auto mb-3"
          style={{ filter: "drop-shadow(0 0 20px rgba(168,144,96,0.2))" }}
        />

        <p
          className="font-light italic mb-[18px] tracking-[1px] text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2vw, 1.5rem)", color: C.goldPale }}
        >
          From the World&apos;s Last Wild Places
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={onShopNow}
            className="px-9 py-[13px] text-[0.58rem] tracking-[3px] uppercase border-none cursor-pointer font-bold transition-all duration-400"
            style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.goldLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.gold)}
          >
            Explore the Collection
          </button>
          <button
            className="px-9 py-[13px] text-[0.58rem] tracking-[3px] uppercase cursor-pointer transition-all duration-400"
            style={{ fontFamily: "'Libre Baskerville', serif", background: "transparent", color: C.goldPale, border: "1px solid rgba(168,144,96,0.35)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(168,144,96,0.35)"; e.currentTarget.style.color = C.goldPale; }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Our Story
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── About ────────────────────────────────────────────────── */
function About() {
  const stats = [
    { num: "35+", label: "Total Activity" },
    { num: "100%", label: "Wild-Sourced" },
    { num: "2yr", label: "Bloom Cycle" },
    { num: "WA", label: "Origin Only" },
  ];

  return (
    <section id="about" className="px-[72px] py-[130px]" style={{ background: C.dark2 }}>
      <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6" style={{ color: C.gold }}>
        Est. in the Ancient Forests
      </p>
      <h2
        className="text-center font-light mb-5 leading-[1.1]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#fff", letterSpacing: "-0.5px" }}
      >
        A Honey Unlike <em style={{ color: C.gold, fontStyle: "italic" }}>Any Other</em>
      </h2>
      <SectionRule />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[100px] items-center max-w-[1140px] mx-auto">
        {/* Emblem */}
        <div
          className="flex flex-col items-center justify-center px-10 py-[60px] relative"
          style={{ border: `1px solid ${C.rule}`, background: `linear-gradient(145deg, ${C.dark3}, ${C.dark})` }}
        >
          <div className="absolute top-[-1px] left-[-1px] w-5 h-5 border-t border-l opacity-50" style={{ borderColor: C.gold }} />
          <div className="absolute bottom-[-1px] right-[-1px] w-5 h-5 border-b border-r opacity-50" style={{ borderColor: C.gold }} />

          <div className="text-[0.55rem] tracking-[5px] uppercase mb-[30px]" style={{ color: C.textMuted }}>
            Wild-Harvested Since Forever
          </div>
          <div className="text-[6rem] font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}>
            WA
          </div>
          <div className="text-[0.55rem] tracking-[4px] uppercase mt-[10px]" style={{ color: C.textMuted }}>
            Western Australia
          </div>
          <div className="w-10 h-px my-[30px]" style={{ background: C.rule }} />
          <div className="text-base italic tracking-[1px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldPale }}>
            South-West Forest Region
          </div>

          <div className="flex w-full mt-[50px]" style={{ border: `1px solid ${C.rule}` }}>
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex-1 py-7 px-5 text-center"
                style={{ borderRight: i < stats.length - 1 ? `1px solid ${C.rule}` : "none" }}
              >
                <div className="text-[2rem] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}>
                  {s.num}
                </div>
                <div className="text-[0.52rem] tracking-[2.5px] uppercase mt-[6px]" style={{ color: C.textMuted }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div>
          {[
            <>In the ancient Jarrah and Marri forests of south-west Western Australia — one of the Earth&apos;s last truly pristine ecosystems — something extraordinary takes place. When conditions align and the trees choose to bloom, our bees gather a honey so rare and so potent that it is unlike anything else found on this planet.</>,
            <><strong style={{ color: C.goldPale }}>PureWest Australia</strong> exists for one purpose: to bring this honey to you exactly as nature intended. No blending. No heat treatment. No shortcuts. Only raw, cold-extracted honey from old-growth forests, independently tested, and delivered straight to your door.</>,
            <>Our Jarrah honey carries a Total Activity (TA) rating that rivals — and in many cases surpasses — the most celebrated honeys in the world, at a fraction of the cost. This is <strong style={{ color: C.goldPale }}>Australia&apos;s best-kept secret</strong>, and it&apos;s time the world knew.</>,
          ].map((text, i) => (
            <p key={i} className="leading-[2.1] text-[0.82rem] mb-[22px]" style={{ color: C.textMuted }}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why ──────────────────────────────────────────────────── */
function Why() {
  const cards = [
    { num: "01", title: "Extraordinary Antimicrobial Activity", tag: "TA 35+", body: "Our Jarrah honey is independently tested and certified at Total Activity (TA) 35+ — a measure of antimicrobial potency that places it among the world's most powerful natural honeys, with none of the marketing myths." },
    { num: "02", title: "Naturally Hydrogen Peroxide-Based", tag: "H₂O₂ Active", body: "Unlike MGO-based honeys, Jarrah's activity is hydrogen peroxide-based — stable, proven, and effective. No synthetics. No additives. Just the pure chemistry of an ancient forest ecosystem." },
    { num: "03", title: "Naturally Low GI", tag: "Low Glycaemic Index", body: "With a low glycaemic index, Jarrah honey releases energy slowly and gently — the intelligent choice for those managing blood sugar or simply choosing a more balanced, health-conscious natural sweetener without compromise." },
    { num: "04", title: "An Exquisite Flavour", tag: "Caramel Finish", body: "Smooth, rich, and deeply complex — Jarrah honey carries a signature lingering caramel aftertaste that distinguishes it from every other honey in the world. A genuine sensory experience, as much as a wellness one." },
    { num: "05", title: "Rare by Nature", tag: "Limited Harvest", body: "The Jarrah tree blooms irregularly — sometimes only once every two years. No cultivation. No shortcuts. Each harvest is a finite, unrepeatable event, making every jar a genuinely rare and precious thing." },
    { num: "06", title: "Pristine Origin", tag: "Sustainably Sourced", body: "Sourced exclusively from the ancient forests of south-west WA — arguably the world's most pristine ecosystem — and harvested with the utmost respect for the land that makes it possible." },
  ];

  return (
    <section id="why" className="px-[72px] py-[130px]" style={{ background: C.dark }}>
      <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6" style={{ color: C.gold }}>
        Why Jarrah
      </p>
      <h2
        className="text-center font-light mb-5 leading-[1.1]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#fff", letterSpacing: "-0.5px" }}
      >
        Nature&apos;s Most <em style={{ color: C.gold, fontStyle: "italic" }}>Remarkable</em> Honey
      </h2>
      <SectionRule />

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1140px] mx-auto" style={{ gap: "1px", background: C.rule }}>
        {cards.map((c) => (
          <div
            key={c.num}
            className="p-[52px_40px] transition-colors duration-400 cursor-default"
            style={{ background: C.dark }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.dark3)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.dark)}
          >
            <div className="text-[3.5rem] font-light leading-none mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(168,144,96,0.1)" }}>
              {c.num}
            </div>
            <h3 className="text-[1.3rem] font-normal mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldPale }}>
              {c.title}
            </h3>
            <p className="text-[0.78rem] leading-[1.95]" style={{ color: C.textMuted }}>
              {c.body}
            </p>
            <span className="inline-block mt-5 text-[0.5rem] tracking-[3px] uppercase pb-[2px]" style={{ color: C.gold, borderBottom: `1px solid ${C.gold}` }}>
              {c.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Range Photo ──────────────────────────────────────────── */
function RangePhoto() {
  return (
    <section id="range-photo" className="p-0 overflow-hidden" style={{ background: C.dark }}>
      <div className="relative min-h-[420px] overflow-hidden" style={{ background: C.dark3 }}>
        <img
          src="/images/rangeimg.jpg"
          alt="PureWest Australia Honey Range"
          className="w-full object-cover max-h-[700px]"
          style={{ objectPosition: "center 40%", filter: "brightness(0.88) contrast(1.05) saturate(0.95)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(8,6,4,0.35) 0%, transparent 30%, transparent 60%, rgba(8,6,4,0.7) 100%)" }}
        />
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 text-center z-[2]">
          <p className="text-[0.52rem] tracking-[5px] uppercase mb-2" style={{ color: C.gold }}>
            The Collection
          </p>
          <p className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
            Jarrah · Marri · Karri
          </p>
          <p className="text-[0.62rem] tracking-[2px] mt-2" style={{ color: C.textMuted }}>
            Harvested &amp; Bottled in Western Australia
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Quote ────────────────────────────────────────────────── */
function Quote() {
  return (
    <section id="quote" className="py-[100px] px-[72px] text-center" style={{ background: C.dark2 }}>
      <p
        className="mx-auto font-light italic leading-[1.7] mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: C.text, maxWidth: "780px" }}
      >
        &ldquo;Not merely a honey. A singular expression of one of the Earth&apos;s last wild
        places — rare, powerful, and entirely without equal.&rdquo;
      </p>
      <p className="text-[0.6rem] tracking-[3px] uppercase" style={{ color: C.gold }}>
        PureWest Australia · South-West Western Australia
      </p>
    </section>
  );
}

/* ─── Products ─────────────────────────────────────────────── */
function Products({ products, onOpenPanel }) {

  return (
    <section id="products" className="px-[72px] py-[130px]" style={{ background: C.dark }}>
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
            onClick={() => onOpenPanel(t.id)}
          >
            <img
              src={t.img}
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
  );
}

/* ─── Product Panel ────────────────────────────────────────── */
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
            <img id="panelImg" src={product.img} alt={product.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.9)" }} />
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

/* ─── Testimonials ─────────────────────────────────────────── */
function Testimonials() {
  const cards = [
    { text: "I've tried Manuka at every rating. Nothing comes close to PureWest's Jarrah. The flavour is extraordinary and I could genuinely feel the difference within weeks.", author: "Sarah M.", loc: "Sydney, NSW" },
    { text: "Finally, a honey that actually does what it claims. The TA 35+ Jarrah is remarkable — complex, healing, and genuinely unlike anything I've had before. Reordering constantly.", author: "James T.", loc: "Melbourne, VIC" },
    { text: "I ordered as a gift and my parents are now completely converted. The packaging is beautiful, the honey is extraordinary, and the customer service was exceptional.", author: "Emily R.", loc: "Perth, WA" },
  ];

  return (
    <section id="testimonials" className="px-[72px] py-[130px]" style={{ background: C.dark }}>
      <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6" style={{ color: C.gold }}>
        What Our Customers Say
      </p>
      <h2
        className="text-center font-light mb-5 leading-[1.1]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#fff", letterSpacing: "-0.5px" }}
      >
        Tasted. <em style={{ color: C.gold, fontStyle: "italic" }}>Trusted.</em>
      </h2>
      <SectionRule />

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1140px] mx-auto" style={{ gap: "1px", background: C.rule }}>
        {cards.map((c, i) => (
          <div key={i} className="p-[48px_40px]" style={{ background: C.dark }}>
            <Stars />
            <p className="text-[1.05rem] italic leading-[1.9] mb-8 font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.text }}>
              &ldquo;{c.text}&rdquo;
            </p>
            <div className="w-6 h-px mb-4 opacity-50" style={{ background: C.gold }} />
            <div className="text-[0.6rem] tracking-[3px] uppercase" style={{ color: C.gold }}>{c.author}</div>
            <div className="text-[0.58rem] mt-[5px] italic" style={{ color: C.textMuted }}>{c.loc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Shipping ─────────────────────────────────────────────── */
function Shipping() {
  const items = [
    { icon: "🚚", title: "Free Shipping",    body: "Complimentary shipping on all orders over $50. Express options available." },
    { icon: "🌿", title: "Raw & Pure",        body: "Cold-extracted and never heat treated. Exactly as nature intended." },
    { icon: "🏆", title: "Certified Quality", body: "Every batch independently tested and certified for Total Activity rating." },
    { icon: "↩️", title: "Easy Returns",      body: "Not completely satisfied? We offer a 30-day money-back guarantee." },
  ];

  return (
    <section id="shipping" className="py-[90px] px-[72px]" style={{ background: C.dark2 }}>
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4" style={{ gap: "1px", background: C.rule, border: `1px solid ${C.rule}` }}>
        {items.map((item, i) => (
          <div key={i} className="py-11 px-[30px] text-center" style={{ background: C.dark2 }}>
            <span className="text-[1.6rem] mb-[18px] block">{item.icon}</span>
            <h4 className="text-base font-normal mb-[10px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldPale }}>
              {item.title}
            </h4>
            <p className="text-[0.68rem] leading-[1.7]" style={{ color: C.textMuted }}>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: "Shop",    links: ["Jarrah Honey TA 35+", "Marri Honey TA 35+", "Marri Honey TA 15+", "Gift Sets", "Bundles"] },
    { title: "Learn",   links: ["About Jarrah Honey", "TA vs MGO Explained", "Health Benefits", "Sustainability", "Blog"] },
    { title: "Company", links: ["Our Story", "The Forest", "Contact Us", "Wholesale", "FAQ"] },
  ];

  return (
    <footer style={{ background: "#050402", padding: "90px 72px 48px" }}>
      <div
        className="max-w-[1140px] mx-auto pb-[60px]"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "60px", borderBottom: `1px solid ${C.rule}` }}
      >
        <div>
          <div className="text-[1.4rem] tracking-[6px] uppercase font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}>
            Purewest
          </div>
          <div className="text-[0.6rem] tracking-[5px] uppercase mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldPale }}>
            Australia
          </div>
          <p className="italic text-[0.85rem] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.textMuted }}>
            From the world&apos;s last wild places.
          </p>
          <p className="text-[0.72rem] leading-[1.95] max-w-[270px]" style={{ color: C.textMuted }}>
            Premium raw honey from the ancient Jarrah and Marri forests of south-west Western Australia. Independently certified. Uncompromisingly pure.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[0.55rem] tracking-[4px] uppercase mb-[26px]" style={{ color: C.gold }}>{col.title}</h4>
            <ul className="list-none flex flex-col gap-[14px] p-0">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="no-underline text-[0.72rem] italic transition-colors duration-300"
                    style={{ color: C.textMuted }}
                    onMouseEnter={(e) => (e.target.style.color = C.gold)}
                    onMouseLeave={(e) => (e.target.style.color = C.textMuted)}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1140px] mx-auto mt-12 flex justify-between items-center flex-wrap gap-4">
        <p className="text-[0.6rem] tracking-[1px]" style={{ color: C.textMuted }}>
          &copy; {new Date().getFullYear()} PureWest Australia. All rights reserved.
        </p>
        <div className="flex gap-7">
          {["Instagram", "Facebook", "Pinterest"].map((s) => (
            <a
              key={s}
              href="#"
              className="no-underline text-[0.58rem] tracking-[3px] uppercase transition-colors duration-300"
              style={{ color: C.textMuted }}
              onMouseEnter={(e) => (e.target.style.color = C.gold)}
              onMouseLeave={(e) => (e.target.style.color = C.textMuted)}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Home (root) ──────────────────────────────────────────── */
export default function Home() {
  const [panelId, setPanelId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
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

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.dark, color: C.text, fontFamily: "'Libre Baskerville', serif" }}>
      <Hero onShopNow={scrollToProducts} />
      <About />
      <Why />
      <RangePhoto />
      <Quote />
      <Products products={products} onOpenPanel={openPanel} />
      <Testimonials />
      <Shipping />
      <Footer />

      {panelId && <ProductPanel productId={panelId} products={products} onClose={closePanel} />}
    </div>
  );
}
