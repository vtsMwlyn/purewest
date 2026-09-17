import { Link } from "react-router-dom";

export default function Quote() {
  return (
    <section id="quote" className="pb-[90px] pt-10 px-18 text-center bg-dark">
      <p
        className="font-garamond mx-auto font-light italic leading-[1.7] mb-6 text-text text-[clamp(1.2rem,2.5vw,1.8rem)] max-w-[780px]"
      >
        &ldquo;Not merely a honey. A singular expression of one of the Earth&apos;s last wild
        places — rare, powerful, and entirely without equal.&rdquo;
      </p>
      <p className="text-[0.6rem] tracking-[3px] uppercase text-gold">
        PureWest Australia · South-West Western Australia
      </p>

      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <Link
          to="/products"
          className="font-baskerville inline-block px-9 py-[13px] mt-10 text-[0.58rem] tracking-[3px] uppercase border-none cursor-pointer font-bold transition-all duration-400 bg-gold hover:bg-gold-light text-dark"
        >
          Explore the Collection
        </Link>
        <Link
          to="/lab-result"
          className="font-baskerville inline-block px-9 py-[13px] text-[0.58rem] tracking-[3px] uppercase cursor-pointer transition-all duration-400 text-gold-pale bg-transparent border border-gold/35 hover:border-gold hover:text-gold"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          Check Lab Result
        </Link>
      </div>
    </section>
  );
}
