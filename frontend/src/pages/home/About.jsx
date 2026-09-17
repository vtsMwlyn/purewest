export default function About() {
  const stats = [
    { num: "35+", label: "Total Activity" },
    { num: "100%", label: "Wild-Sourced" },
    { num: "2yr", label: "Bloom Cycle" },
    { num: "WA", label: "Origin Only" },
  ];

  return (
    <section id="about" className="px-6 md:px-18 py-16 md:py-[90px] bg-dark2">
      {/* South-West Forest Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center max-w-[1140px] mx-auto">
        {/* Image */}
        <div className="flex flex-col items-center justify-center relative h-80 md:h-120 border border-rule">
          <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

          <img src="/images/jarrah-forest.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

          <div className="relative z-5 bg-linear-to-t from-[rgba(14,10,5,1)] to-[rgba(26,18,10,0)] px-10 py-[50px] h-full w-full flex flex-col justify-end"></div>
        </div>

        {/* Text */}
        <div>
          <p className="text-[0.55rem] tracking-[6px] uppercase text-start mb-6 text-gold">
            Wild-Harvested Since Forever
          </p>
          <h2
            className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
          >
            <em className="text-gold italic">South-West</em> Forest Region
          </h2>
          <p className="leading-[2.1] text-[0.82rem] mb-[22px] text-text-muted">In the ancient Jarrah and Marri forests of south-west Western Australia — one of the Earth&apos;s last truly pristine ecosystems — something extraordinary takes place. When conditions align and the trees choose to bloom, our bees gather a honey so rare and so potent that it is unlike anything else found on this planet.</p>
        </div>
      </div>

      {/* A Honey Unlike Any Other */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center max-w-[1140px] mx-auto mt-20">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <p className="text-[0.55rem] tracking-[6px] uppercase text-start mb-6 text-gold">
            Est. in the Ancient Forests
          </p>
          <h2
            className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
          >
            A Honey Unlike <em className="text-gold italic">Any Other</em>
          </h2>
          <p className="leading-[2.1] text-[0.82rem] mb-[22px] text-text-muted"><strong className="text-gold-pale">PureWest Australia</strong> exists for one purpose: to bring this honey to you exactly as nature intended. No blending. No heat treatment. No shortcuts. Only raw, cold-extracted honey from old-growth forests, independently tested, and delivered straight to your door.</p>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 flex flex-col items-center justify-center relative h-80 md:h-120 border border-rule">
          <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

          <img src="/images/hive-extract.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

          <div className="relative z-5 bg-linear-to-t from-[rgba(14,10,5,1)] to-[rgba(26,18,10,0)] px-10 py-[50px] h-full w-full flex flex-col justify-end"></div>
        </div>
      </div>

      {/* Unrivaled Quality, Unbeatable Everyday Value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center max-w-[1140px] mx-auto mt-20">
        {/* Image */}
        <div className="flex flex-col items-center justify-center relative h-80 md:h-120 border border-rule">
          <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

          <img src="/images/holding-marri.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

          <div className="relative z-5 bg-linear-to-t from-[rgba(14,10,5,1)] from-20% to-[rgba(26,18,10,0)] px-10 py-[50px] h-full w-full flex flex-col justify-end">
            <div className="hidden lg:flex w-full mt-5 border border-rule">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex-1 py-7 px-5 text-center [&:not(:last-child)]:border-r [&:not(:last-child)]:border-rule"
                >
                  <div
                    className="font-garamond text-[2rem] font-light text-gold"
                  >
                    {s.num}
                  </div>
                  <div className="text-[0.52rem] tracking-[2.5px] uppercase mt-1.5 text-text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-[0.55rem] tracking-[6px] uppercase text-start mb-6 text-gold">
            Unveiling Australia's Best-Kept
          </p>
          <h2
            className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
          >
             Unrivaled Quality, <em className="text-gold italic">Unbeatable Everyday Value</em>
          </h2>
          <p className="leading-[2.1] text-[0.82rem] mb-[22px] text-text-muted">Our Jarrah honey carries a Total Activity (TA) rating that rivals — and in many cases surpasses — the most celebrated honeys in the world, at a fraction of the cost. This is <strong className="text-gold-pale">Australia&apos;s best-kept secret</strong>, and it&apos;s time the world knew.</p>
        </div>
      </div>
    </section>
  );
}
