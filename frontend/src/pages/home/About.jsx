export default function About() {
  const stats = [
    { num: "35+", label: "Total Activity" },
    { num: "100%", label: "Raw-Sourced" },
    { num: "2-3yr", label: "Bloom Cycle" },
    { num: "WA", label: "Origin" },
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
          <h2
            className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
          >
            <em className="text-gold italic">South-west</em> forest region
          </h2>
          <p className="leading-[2.1] text-[0.82rem] mb-[22px] ">In the ancient forests of Western Australia's south-west, the Jarrah, Marri and Karri bloom only when conditions allow. Our bees gather what they offer: a rare, potent honey, shaped by the forest and proven by the lab.</p>
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
            Honey, <em className="text-gold italic">as the bees made it</em>
          </h2>
          <p className="leading-[2.1] text-[0.82rem] mb-[22px]"><strong className="text-gold">PureWest Australia</strong> exists for one purpose: to bring this honey to you exactly as natural intended. No blending. No heat treatment. No shortcuts. Only raw, cold-extracted honey from old-growth forests, independently tested, and delivered straight to your door.</p>
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

          <img src="/images/holding-jarrah.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

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
                  <div className="text-[0.52rem] tracking-[2.5px] uppercase mt-1.5 ">
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
            Quality You Can Measure
          </p>
          <h2
            className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
          >
            Western australia&apos;s answer to the world&apos;s <em className="text-gold italic">great active honeys</em>
          </h2>
          <p className="leading-[2.1] text-[0.82rem] mb-[22px] ">Our Jarrah honey carries a <strong className="text-gold">Total Activity (TA) rating of 35+</strong>, a natural activity level that stands alongside the world&apos;s best-known active honeys. Rare, raw, and harvested only in Western Australia, it is a honey the world is only beginnign to discover.=</p>
        </div>
      </div>
    </section>
  );
}
