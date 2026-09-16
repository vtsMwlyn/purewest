import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SectionRule() {
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <div className="w-10 h-px opacity-50 bg-gold" />
      <div className="w-[5px] h-[5px] rotate-45 bg-gold" />
      <div className="w-10 h-px opacity-50 bg-gold" />
    </div>
  );
}

function ArticleCard({ article }) {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <Link
      to={`/education/${article.id}`}
      className="group no-underline block text-inherit"
    >
      <article className="h-full flex flex-col transition-all duration-400 bg-dark3 border border-rule hover:border-gold/35">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/9]">
          {article.featured_image ? (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark2">
              <span className="text-4xl opacity-20">🌿</span>
            </div>
          )}
          {/* Gold overlay line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gold" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {formattedDate && (
            <p className="font-baskerville text-[0.5rem] tracking-[3px] uppercase mb-3 text-gold">
              {formattedDate}
            </p>
          )}
          <h3 className="font-garamond font-light mb-3 leading-[1.2] flex-1 text-white text-[clamp(1.3rem,2.5vw,1.6rem)]">
            {article.title}
          </h3>
          {article.subtitle && (
            <p className="font-baskerville text-[0.8rem] leading-relaxed mb-5 text-text-muted">
              {article.subtitle.length > 100
                ? article.subtitle.slice(0, 100) + "…"
                : article.subtitle}
            </p>
          )}
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-baskerville text-[0.5rem] tracking-[2px] uppercase transition-colors duration-300 text-gold">
              Read Article
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 text-gold text-[0.7rem]">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function HoneyComparison() {
  const pClass = "leading-[2.1] text-[0.82rem] mb-[22px] text-text-muted";
  
  return (
    <div className="w-full pt-6 pb-12">
      {/* Manuka Honey vs Jarrah Honey */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center max-w-[1140px] mx-auto mt-20">
        {/* Text */}
        <div>
          <h2 className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]">
            Manuka Honey vs <em className="text-gold italic">Jarrah Honey</em>
          </h2>
          <p className={pClass}>Manuka and Jarrah honeys, both renowned for their therapeutic properties, offer distinct qualities that set them apart.</p>
          <p className={pClass}><strong className="text-gold-pale">Manuka honey</strong>, sourced from New Zealand, is revered for its potent antibacterial powers, particularly effective in wound care and immune support. Its robust, earthy flavor carries subtle medicinal nuances, adding to its distinctive character.</p>
          <p className={pClass}><strong className="text-gold-pale">Jarrah honey</strong>, a rare treasure from Western Australia, boasts elevated levels of hydrogen peroxide, delivering powerful antibacterial and antifungal benefits. Its flavor profile is notably smoother, with refined notes of caramel and toffee, offering a more elegant and versatile culinary experience.</p>
          <p className={pClass}>While both honeys are esteemed for their healing properties, Jarrah’s rarity and sophisticated taste elevate it as a luxurious alternative to Manuka.</p>
        </div>

        {/* Image */}
        <div className="flex flex-col items-center justify-center relative h-120 border border-rule">
          <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

          <img src="/images/smiling-beehive.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

          <div className="relative z-5 bg-linear-to-t from-[rgba(14,10,5,1)] to-[rgba(26,18,10,0)] px-10 py-[50px] h-full w-full flex flex-col justify-end"></div>
        </div>
      </div>

      {/* Medicinal Qualities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center max-w-[1140px] mx-auto mt-20">
        {/* Image */}
        <div className="flex flex-col items-center justify-center relative h-120 border border-rule">
          <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

          <img src="/images/with-lemon.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

          <div className="relative z-5 bg-linear-to-t from-[rgba(14,10,5,1)] to-[rgba(26,18,10,0)] px-10 py-[50px] h-full w-full flex flex-col justify-end"></div>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]">
            <em className="text-gold italic">Medicinal</em> Qualities
          </h2>
          <p className={pClass}>Both Jarrah and Manuka honeys offer significant health benefits, particularly their antibacterial properties.</p>
          <p className={pClass}><strong className="text-gold-pale">Manuka honey</strong> is renowned for its high methylglyoxal (MGO) content, making it highly effective for wound healing, soothing inflammation, and combating bacterial infections.</p>
          <p className={pClass}><strong className="text-gold-pale">Jarrah honey</strong> not only provides antibacterial and antifungal benefits due to its high hydrogen peroxide content but also has a low glycemic index, making it a healthier option for blood sugar control.</p>
          <p className={pClass}>Additionally, its higher antioxidant levels support immune health. While both are potent, Jarrah honey stands out for its versatility and suitability for a broader range of health concerns.</p>
        </div>
      </div>

      {/* The Science Behind their Unique Healing Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center max-w-[1140px] mx-auto mt-20">
        {/* Text */}
        <div>
          <h2 className="font-garamond font-light mb-5 leading-[1.1] text-white text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-[-0.5px]">
            <em className="text-gold italic">The Science Behind their</em> Unique Healing Properties
          </h2>
          <p className={pClass}><strong className="text-gold-pale">Manuka honey</strong>’s antibacterial power comes from methylglyoxal (MGO), which gives it unique healing properties. Since it lacks hydrogen peroxide, it is classified as a "non-peroxide" honey, relying on MGO for its antimicrobial effects.</p>
          <p className={pClass}><strong className="text-gold-pale">Jarrah honey</strong> gains its antimicrobial qualities from glucose oxidase, an enzyme introduced by bees. When the honey’s glucose and water interact, the enzyme produces hydrogen peroxide. This reaction gives Jarrah honey its antibacterial, antimicrobial, and antifungal properties. With three times more antioxidants than Manuka, it also offers enhanced immune support.</p>
        </div>

        {/* Image */}
        <div className="flex flex-col items-center justify-center relative h-120 border border-rule">
          <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

          <img src="/images/holding-marri.webp" className="absolute inset-0 h-full w-full object-cover object-center" alt="Jarah Forest" />

          <div className="relative z-5 bg-linear-to-t from-[rgba(14,10,5,1)] to-[rgba(26,18,10,0)] px-10 py-[50px] h-full w-full flex flex-col justify-end"></div>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="font-baskerville min-h-[100svh] bg-dark text-text">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center h-screen w-full bg-[linear-gradient(to_bottom,#120d07,#0e0a05)]">
        <img src="/images/bee-flower.webp" className="absolute inset-0 w-full h-full object-cover z-0" />
        
        <div className="relative z-8 bg-linear-to-t from-[rgba(14,10,5,1)] from-10% to-[rgba(26,18,10,0)] h-full w-full flex flex-col items-center justify-end px-6">
          {/* Decorative diamond */}
          <div className="w-[6px] h-[6px] rotate-45 mx-auto mb-6 bg-gold" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12.5 h-px bg-linear-to-r from-transparent to-gold" />
            <p className="font-baskerville text-[0.55rem] tracking-[6px] uppercase text-white">
              Knowledge · Wellness · Nature
            </p>
            <div className="w-12.5 h-px bg-linear-to-l from-transparent to-gold" />
          </div>
          <h1 className="font-garamond font-light leading-[1.05] mb-6 text-white tracking-[-0.5px] text-[clamp(2.8rem,6vw,5rem)]">
            The <em className="text-gold italic">Education</em> Journal
          </h1>
          <p className="max-w-xl text-[0.9rem] leading-relaxed text-text-muted">
            Explore the science, tradition, and stories behind Australia's most
            extraordinary honeys — written by the people who live it.
          </p>

          {/* Bottom rule */}
          <div className="flex items-center gap-4 my-8">
            <div className="w-16 h-px opacity-30 bg-gold" />
            <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
            <div className="w-16 h-px opacity-30 bg-gold" />
          </div>
        </div>
      </div>

      {/* Static Comparison Content */}
      <HoneyComparison />
      <SectionRule />

      {/* Articles Grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-[6px] h-[6px] rotate-45 animate-pulse bg-gold" />
            <p className="font-baskerville text-[0.6rem] tracking-[4px] uppercase text-text-muted">
              Loading articles…
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-32">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="text-5xl opacity-20 mb-4">🌿</div>
            <p className="font-baskerville text-[0.6rem] tracking-[4px] uppercase mb-3 text-gold">
              Coming Soon
            </p>
            <p className="font-baskerville text-[0.9rem] text-text-muted">
              Our first articles are being crafted. Check back soon.
            </p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            {/* Featured — first article large */}
            {articles.length > 0 && (
              <div className="mb-12">
                <Link
                  to={`/education/${articles[0].id}`}
                  className="group no-underline block text-inherit"
                >
                  <article className="grid md:grid-cols-2 gap-0 transition-all duration-400 bg-dark3 border border-rule hover:border-gold/35">
                    <div className="relative overflow-hidden min-h-[320px]">
                      {articles[0].featured_image ? (
                        <img
                          src={articles[0].featured_image}
                          alt={articles[0].title}
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-dark2">
                          <span className="text-6xl opacity-20">🍯</span>
                        </div>
                      )}
                      <div className="font-baskerville absolute top-4 left-4 px-3 py-1 text-[0.45rem] tracking-[2px] uppercase bg-gold text-dark">
                        Featured
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      {articles[0].date && (
                        <p className="font-baskerville text-[0.5rem] tracking-[3px] uppercase mb-4 text-gold">
                          {new Date(articles[0].date).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                      <h2 className="font-garamond font-light leading-[1.15] mb-4 text-white text-[clamp(1.8rem,3.5vw,2.6rem)]">
                        {articles[0].title}
                      </h2>
                      {articles[0].subtitle && (
                        <p className="font-baskerville text-[0.85rem] leading-relaxed mb-6 text-text-muted">
                          {articles[0].subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="font-baskerville text-[0.5rem] tracking-[2px] uppercase text-gold">
                          Read Article
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1 text-gold text-[0.7rem]">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Rest of articles in grid */}
            {articles.length > 1 && (
              <>
                <SectionRule />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(1).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
