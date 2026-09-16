import SectionRule from "./SectionRule";
import Stars from "./Stars";

export default function Testimonials() {
  const cards = [
    { text: "I've tried Manuka at every rating. Nothing comes close to PureWest's Jarrah. The flavour is extraordinary and I could genuinely feel the difference within weeks.", author: "Sarah M.", loc: "Sydney, NSW" },
    { text: "Finally, a honey that actually does what it claims. The TA 35+ Jarrah is remarkable — complex, healing, and genuinely unlike anything I've had before. Reordering constantly.", author: "James T.", loc: "Melbourne, VIC" },
    { text: "I ordered as a gift and my parents are now completely converted. The packaging is beautiful, the honey is extraordinary, and the customer service was exceptional.", author: "Emily R.", loc: "Perth, WA" },
  ];

  return (
    <section id="testimonials" className="px-18 py-[90px] bg-dark2">
      <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6 text-gold">
        What Our Customers Say
      </p>
      <h2
        className="font-garamond text-center font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
      >
        Tasted. <em className="text-gold italic">Trusted.</em>
      </h2>
      <SectionRule />

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1140px] mx-auto gap-6">
        {cards.map((c, i) => (
          <div key={i} className="p-[38px_30px] bg-dark">
            <div className="mb-5">
              <Stars />
            </div>
            <p className="font-garamond text-[0.9rem] italic leading-[1.9] mb-8 font-light text-white">
              &ldquo;{c.text}&rdquo;
            </p>
            <div className="w-6 h-px mb-4 opacity-50 bg-gold" />
            <div className="flex items-center gap-3">
              <img src="/images/mom-and-kid.webp" className="w-10 h-10 object-cover object-center" alt="Photo" />
              <div className="flex flex-col">
                <div className="text-[0.6rem] tracking-[3px] uppercase text-gold">{c.author}</div>
                <div className="text-[0.58rem] mt-1 italic text-text-muted">{c.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
