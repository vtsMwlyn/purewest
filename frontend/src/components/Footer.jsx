export default function Footer() {
  const cols = [
    { title: "Shop",    links: ["Jarrah Honey TA 35+", "Marri Honey TA 35+", "Marri Honey TA 15+", "Gift Sets", "Bundles"] },
    { title: "Learn",   links: ["About Jarrah Honey", "TA vs MGO Explained", "Health Benefits", "Sustainability", "Blog"] },
    { title: "Company", links: ["Our Story", "The Forest", "Contact Us", "Wholesale", "FAQ"] },
  ];

  return (
    <footer className="bg-[#050402] pt-16 lg:pt-[90px] px-6 lg:px-[72px] pb-10 lg:pb-[48px]">
      <div className="max-w-[1140px] mx-auto pb-12 lg:pb-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-[60px] border-b border-rule">
        <div>
          <div className="font-garamond text-[1.4rem] tracking-[6px] uppercase font-semibold mb-1 text-gold">
            Purewest
          </div>
          <div className="font-garamond text-[0.6rem] tracking-[5px] uppercase mb-5 text-gold-pale">
            Australia
          </div>
          <p className="font-garamond italic text-[0.85rem] mb-4 text-text-muted">
            From the world&apos;s last wild places.
          </p>
          <p className="text-[0.72rem] leading-[1.95] max-w-[270px] text-text-muted">
            Premium raw honey from the ancient Jarrah and Marri forests of south-west Western Australia. Independently certified. Uncompromisingly pure.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[0.55rem] tracking-[4px] uppercase mb-[26px] text-gold">{col.title}</h4>
            <ul className="list-none flex flex-col gap-[14px] p-0">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="no-underline text-[0.72rem] italic transition-colors duration-300 text-text-muted hover:text-gold"
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
        <p className="text-[0.6rem] tracking-[1px] text-text-muted">
          &copy; {new Date().getFullYear()} PureWest Australia. All rights reserved.
        </p>
        <div className="flex gap-7">
          {["Instagram", "Facebook", "Pinterest"].map((s) => (
            <a
              key={s}
              href="#"
              className="no-underline text-[0.58rem] tracking-[3px] uppercase transition-colors duration-300 text-text-muted hover:text-gold"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}