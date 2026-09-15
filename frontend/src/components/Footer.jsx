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

export default function Footer() {
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