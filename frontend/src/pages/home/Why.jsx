import { useState } from "react";
import SectionRule from "./SectionRule";

function WhyCards({info}){
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="transition-colors duration-400 cursor-default relative overflow-hidden bg-dark"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={info.img} className={`absolute inset-0 w-full h-full object-cover object-center transition duration-1000 ${hovered ? 'opacity-100 scale-105' : 'opacity-100 lg:opacity-0 scale-100'}`} alt="Pancake" />

      <div className="relative z-5 bg-dark3/70 w-full h-full p-6 md:p-[52px_40px]">
        <div className="font-garamond text-[3.5rem] font-light leading-none mb-5">
          {info.num}
        </div>
        <h3 className="font-garamond text-[1.3rem] font-normal mb-4 text-gold-pale">
          {info.title}
        </h3>
        <p className="text-[0.78rem] leading-[1.95] text-white">
          {info.body}
        </p>
        <span className="inline-block mt-5 text-[0.5rem] tracking-[3px] uppercase pb-0.5 text-gold border-b border-gold">
          {info.tag}
        </span>
      </div>
    </div>
  )
}

export default function Why() {
  const cards = [
    { num: "01", title: "Extraordinary Antimicrobial Activity", tag: "TA 35+", body: "Our Jarrah honey is independently tested and certified at Total Activity (TA) 35+ — a measure of antimicrobial potency that places it among the world's most powerful natural honeys, with none of the marketing myths.", img: "/images/waffle.webp" },
    { num: "02", title: "Naturally Hydrogen Peroxide-Based", tag: "H2O2 Active", body: "Unlike MGO-based honeys, Jarrah's activity is hydrogen peroxide-based — stable, proven, and effective. No synthetics. No additives. Just the pure chemistry of an ancient forest ecosystem.", img: "/images/holding-marri.webp" },
    { num: "03", title: "Naturally Low GI", tag: "Low Glycaemic Index", body: "With a low glycaemic index, Jarrah honey releases energy slowly and gently — the intelligent choice for those managing blood sugar or simply choosing a more balanced, health-conscious natural sweetener without compromise.", img: "/images/mom-and-kid.webp" },
    { num: "04", title: "An Exquisite Flavour", tag: "Caramel Finish", body: "Smooth, rich, and deeply complex — Jarrah honey carries a signature lingering caramel aftertaste that distinguishes it from every other honey in the world. A genuine sensory experience, as much as a wellness one.", img: "/images/chilling-at-beach.webp" },
    { num: "05", title: "Rare by Nature", tag: "Limited Harvest", body: "The Jarrah tree blooms irregularly — sometimes only once every two years. No cultivation. No shortcuts. Each harvest is a finite, unrepeatable event, making every jar a genuinely rare and precious thing.", img: "/images/bee-flower.webp" },
    { num: "06", title: "Pristine Origin", tag: "Sustainably Sourced", body: "Sourced exclusively from the ancient forests of south-west WA — arguably the world's most pristine ecosystem — and harvested with the utmost respect for the land that makes it possible.", img: "/images/jarrah-forest.webp" },
  ];

  return (
    <section id="why" className="px-6 md:px-18 py-16 md:py-[90px] bg-dark">
      <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6 text-gold">
        Why Jarrah
      </p>
      <h2
        className="font-garamond text-center font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]"
      >
        Nature&apos;s Most <em className="text-gold italic">Remarkable</em> Honey
      </h2>
      <SectionRule />

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1140px] mx-auto gap-px bg-rule">
        {cards.map((c) => (
          <WhyCards key={c.num} info={c} />
        ))}
      </div>
    </section>
  );
}
