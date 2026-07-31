import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

const SERIF = "'Cormorant Garamond', serif";
const BODY = "'Libre Baskerville', serif";

function SectionRule() {
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
      <div className="w-[5px] h-[5px] rotate-45" style={{ background: C.gold }} />
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
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
      className="group no-underline block"
      style={{ color: "inherit" }}
    >
      <article
        className="h-full flex flex-col transition-all duration-400"
        style={{ background: C.dark3, border: `1px solid ${C.rule}` }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "rgba(168,144,96,0.35)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = C.rule)
        }
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {article.featured_image ? (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: C.dark2 }}
            >
              <span className="text-4xl opacity-20">🌿</span>
            </div>
          )}
          {/* Gold overlay line at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: C.gold }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {formattedDate && (
            <p
              className="text-[0.5rem] tracking-[3px] uppercase mb-3"
              style={{ color: C.gold, fontFamily: BODY }}
            >
              {formattedDate}
            </p>
          )}
          <h3
            className="font-light mb-3 leading-[1.2] flex-1"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
              color: "#fff",
            }}
          >
            {article.title}
          </h3>
          {article.subtitle && (
            <p
              className="text-[0.8rem] leading-relaxed mb-5"
              style={{ color: C.textMuted, fontFamily: BODY }}
            >
              {article.subtitle.length > 100
                ? article.subtitle.slice(0, 100) + "…"
                : article.subtitle}
            </p>
          )}
          <div className="flex items-center gap-2 mt-auto">
            <span
              className="text-[0.5rem] tracking-[2px] uppercase transition-colors duration-300"
              style={{
                color: C.gold,
                fontFamily: BODY,
              }}
            >
              Read Article
            </span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: C.gold, fontSize: "0.7rem" }}
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
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
    <div
      style={{
        background: C.dark,
        minHeight: "100svh",
        fontFamily: BODY,
        color: C.text,
      }}
    >
      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          borderBottom: `1px solid ${C.rule}`,
          background: `linear-gradient(to bottom, ${C.dark2}, ${C.dark})`,
        }}
      >
        {/* Decorative diamond */}
        <div
          className="w-[6px] h-[6px] rotate-45 mx-auto mb-6"
          style={{ background: C.gold }}
        />
        <p
          className="text-[0.55rem] tracking-[6px] uppercase mb-5"
          style={{ color: C.gold, fontFamily: BODY }}
        >
          Knowledge · Wellness · Nature
        </p>
        <h1
          className="font-light leading-[1.05] mb-6"
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            color: "#fff",
            letterSpacing: "-0.5px",
          }}
        >
          The{" "}
          <em style={{ color: C.gold, fontStyle: "italic" }}>Education</em>{" "}
          Journal
        </h1>
        <p
          className="max-w-xl text-[0.9rem] leading-relaxed"
          style={{ color: C.textMuted }}
        >
          Explore the science, tradition, and stories behind Australia's most
          extraordinary honeys — written by the people who live it.
        </p>

        {/* Bottom rule */}
        <div className="flex items-center gap-4 mt-12">
          <div className="w-16 h-px opacity-30" style={{ background: C.gold }} />
          <div className="w-[4px] h-[4px] rotate-45" style={{ background: C.gold, opacity: 0.5 }} />
          <div className="w-16 h-px opacity-30" style={{ background: C.gold }} />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div
              className="w-[6px] h-[6px] rotate-45 animate-pulse"
              style={{ background: C.gold }}
            />
            <p
              className="text-[0.6rem] tracking-[4px] uppercase"
              style={{ color: C.textMuted, fontFamily: BODY }}
            >
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
            <p
              className="text-[0.6rem] tracking-[4px] uppercase mb-3"
              style={{ color: C.gold, fontFamily: BODY }}
            >
              Coming Soon
            </p>
            <p
              className="text-[0.9rem]"
              style={{ color: C.textMuted, fontFamily: BODY }}
            >
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
                  className="group no-underline block"
                  style={{ color: "inherit" }}
                >
                  <article
                    className="grid md:grid-cols-2 gap-0 transition-all duration-400"
                    style={{ background: C.dark3, border: `1px solid ${C.rule}` }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(168,144,96,0.35)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = C.rule)
                    }
                  >
                    <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
                      {articles[0].featured_image ? (
                        <img
                          src={articles[0].featured_image}
                          alt={articles[0].title}
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          className="w-full h-full absolute inset-0 flex items-center justify-center"
                          style={{ background: C.dark2 }}
                        >
                          <span className="text-6xl opacity-20">🍯</span>
                        </div>
                      )}
                      <div
                        className="absolute top-4 left-4 px-3 py-1 text-[0.45rem] tracking-[2px] uppercase"
                        style={{
                          background: C.gold,
                          color: C.dark,
                          fontFamily: BODY,
                        }}
                      >
                        Featured
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      {articles[0].date && (
                        <p
                          className="text-[0.5rem] tracking-[3px] uppercase mb-4"
                          style={{ color: C.gold, fontFamily: BODY }}
                        >
                          {new Date(articles[0].date).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                      <h2
                        className="font-light leading-[1.15] mb-4"
                        style={{
                          fontFamily: SERIF,
                          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                          color: "#fff",
                        }}
                      >
                        {articles[0].title}
                      </h2>
                      {articles[0].subtitle && (
                        <p
                          className="text-[0.85rem] leading-relaxed mb-6"
                          style={{ color: C.textMuted, fontFamily: BODY }}
                        >
                          {articles[0].subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[0.5rem] tracking-[2px] uppercase"
                          style={{ color: C.gold, fontFamily: BODY }}
                        >
                          Read Article
                        </span>
                        <span
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: C.gold, fontSize: "0.7rem" }}
                        >
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
