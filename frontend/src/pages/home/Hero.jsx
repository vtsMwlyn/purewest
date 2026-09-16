import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const HERO_SLIDES = [
  { id: "heroSlide4", img: "/images/pancake.webp", label: "Harvest" },
  { id: "heroSlide0", img: "/images/panelimg.webp", label: "Products" },
  { id: "heroSlide1", img: "/images/beehive-closer.webp", label: "Beehive" },
  { id: "heroSlide2", img: "/images/mom-and-kid.webp", label: "Mom and Kids" },
  { id: "heroSlide3", img: "/images/bee-flower.webp", label: "Bee Flower" },
];

export default function Hero() {
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
    <div id="hero" className="flex flex-col w-full h-screen bg-dark">
      {/* Photo zone */}
      <div id="heroPhotoZone" className="relative overflow-hidden flex w-full h-full">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${i === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: s.img ? `url(${s.img})` : undefined }}
          >
            {!s.img && (
              <>
                <div
                  className="absolute inset-0 bg-dark bg-[radial-gradient(ellipse_at_50%_40%,rgba(90,50,5,0.35)_0%,transparent_70%)]"
                />
                <div
                  className="font-garamond absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] font-light pointer-events-none select-none text-gold/5"
                >
                  {s.label}
                </div>
              </>
            )}
          </div>
        ))}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-17.5 pointer-events-none z-2 bg-linear-to-b from-transparent to-dark" />
      </div>

      <div className="w-full h-full absolute inset-0 z-5 flex flex-col justify-end bg-linear-to-t from-[rgba(14,10,5,1)] from-15% to-[rgba(26,18,10,0)]">
        {/* Dot indicators */}
        <div id="heroDots" className="flex justify-center items-center gap-3 py-2.5 relative z-5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`border-none cursor-pointer transition-all duration-400 h-3 bg-transparent bg-no-repeat bg-center bg-size-[100%_2px] py-1.25 px-0 ${i === current ? 'w-11 bg-[linear-gradient(#A89060,#A89060)]' : 'w-7 bg-[linear-gradient(rgba(168,144,96,0.3),rgba(168,144,96,0.3))]'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Content zone */}
        <div id="heroContent" className="w-full flex flex-col items-center justify-center px-10 pt-5 pb-9 relative z-5">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12.5 h-px bg-linear-to-r from-transparent to-gold" />
            <span className="text-[0.5rem] tracking-[4px] uppercase whitespace-nowrap text-white">
              Pure · Wild · Western Australia
            </span>
            <div className="w-12.5 h-px bg-linear-to-l from-transparent to-gold" />
          </div>

          <img
            src="/images/logo.webp"
            alt="PureWest Australia"
            className="w-40 h-auto mb-3 filter-[drop-shadow(0_0_20px_rgba(168,144,96,0.2))]"
          />

          <p
            className="font-garamond font-light italic mb-4.5 tracking-[1px] text-center text-gold-pale text-[clamp(1rem,2vw,1.5rem)]"
          >
            From the World&apos;s Last Wild Places
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/products"
              className="font-baskerville px-9 py-3.25 text-[0.58rem] tracking-[3px] uppercase border-none cursor-pointer font-bold transition-all duration-400 bg-gold hover:bg-gold-light text-dark"
            >
              Explore the Collection
            </Link>
            <button
              className="font-baskerville px-9 py-3.25 text-[0.58rem] tracking-[3px] uppercase cursor-pointer transition-all duration-400 text-gold-pale bg-transparent border border-gold/35 hover:border-gold hover:text-gold"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Our Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
