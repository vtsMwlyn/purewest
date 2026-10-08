import { Link } from "react-router-dom";

export default function Footer() {
  const cols = [
    { 
      title: "Shop",
      links: [
        { label: 'Jarrah Honey TA 35+', link: '/product', external: false },
        { label: 'Marri Honey TA 35+', link: '/product', external: false },
        { label: 'Marri Honey TA 15+', link: '/product', external: false },
      ] 
    },
    {
      title: "Learn",
      links: [
        { label: 'About Jarrah Honey', link: '/education', external: false },
        { label: 'TA vs MGO Explained', link: '/education', external: false },
        { label: 'Health Benefits', link: '/education', external: false },
        { label: 'Blog', link: '/education', external: false },
      ]
    },
    { 
      title: "Company",
      links: [
        { label: 'Our Story', link: '/', external: false },
        { label: 'The Forest', link: '/', external: false },
        { label: 'Contact Us', link: 'mailto:info@purewesthoney.com.au', external: true, target: '_self' },
        { label: 'FAQ', link: '/faq', external: false },
      ]
    },
  ];

  return (
    <footer className="bg-[#050402] pt-16 lg:pt-[90px] px-6 lg:px-[72px] pb-10 lg:pb-[48px] text-muted font-semibold">
      <div className="max-w-[1140px] mx-auto pb-12 lg:pb-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-[60px] border-b border-rule">
        <div>
          <div className="font-garamond text-[1.4rem] tracking-[6px] uppercase font-semibold text-gold">
            Purewest
          </div>
          <div className="font-garamond text-[0.6rem] tracking-[5px] uppercase mb-2 text-gold-pale">
            Australia
          </div>
          <p className="font-garamond italic text-[0.85rem] mb-4">
            From the world&apos;s last natural places.
          </p>
          <a href="https://purewest.com.ph" target="_blank" className="text-text underline hover:text-gold block mb-4">Our Philippines Website</a>
          <p className="text-[0.72rem] leading-[1.95] max-w-[270px] ">
            Premium raw honey from the ancient Jarrah and Marri forests of south-west Western Australia. Independently certified. Uncompromisingly pure.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[0.55rem] tracking-[4px] uppercase mb-[26px] text-gold">{col.title}</h4>
            <ul className="list-none flex flex-col gap-[14px] p-0">
              {col.links.map((l) => (
                <li key={l}>
                  {l.external ? (
                    <a
                      href={l.link} target={l.target || '_blank'}
                      className="no-underline text-[0.72rem] italic transition-colors duration-300  hover:text-gold"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.link}
                      className="no-underline text-[0.72rem] italic transition-colors duration-300  hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1140px] mx-auto mt-12 flex justify-between items-center flex-wrap gap-4">
        <p className="text-[0.6rem] tracking-[1px] ">
          &copy; {new Date().getFullYear()} PureWest Australia. All rights reserved.
        </p>
        <div className="flex gap-7">
          {["Instagram", "Facebook", "Pinterest"].map((s) => (
            <a
              key={s}
              href="#"
              className="no-underline text-[0.58rem] tracking-[3px] uppercase transition-colors duration-300  hover:text-gold"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}