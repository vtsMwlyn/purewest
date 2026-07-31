import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Article not found");
          throw new Error("Failed to fetch article");
        }
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const formattedDate = article?.date
    ? new Date(article.date).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div
      style={{
        background: C.dark,
        minHeight: "100svh",
        fontFamily: BODY,
        color: C.text,
      }}
    >
      {/* ── Loading ── */}
      {loading && (
        <div
          className="flex flex-col items-center justify-center"
          style={{ minHeight: "100svh" }}
        >
          <div
            className="w-[6px] h-[6px] rotate-45 animate-pulse mb-4"
            style={{ background: C.gold }}
          />
          <p
            className="text-[0.6rem] tracking-[4px] uppercase"
            style={{ color: C.textMuted, fontFamily: BODY }}
          >
            Loading…
          </p>
        </div>
      )}

      {/* ── Error ── */}
      {error && !loading && (
        <div
          className="flex flex-col items-center justify-center gap-6 text-center px-6"
          style={{ minHeight: "100svh" }}
        >
          <p className="text-red-400 text-sm">{error}</p>
          <Link
            to="/education"
            className="text-[0.55rem] tracking-[3px] uppercase no-underline transition-colors duration-300"
            style={{ color: C.gold, fontFamily: BODY }}
          >
            ← Back to Education
          </Link>
        </div>
      )}

      {/* ── Article ── */}
      {!loading && !error && article && (
        <>
          {/* Hero */}
          <div
            className="relative"
            style={{
              paddingTop: "120px",
              borderBottom: `1px solid ${C.rule}`,
            }}
          >
            {article.featured_image && (
              <>
                {/* Blurred background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${article.featured_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(60px) brightness(0.2)",
                    transform: "scale(1.1)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${C.dark}cc, ${C.dark})`,
                  }}
                />
              </>
            )}

            <div className="relative max-w-[800px] mx-auto px-6 md:px-10 pb-12 text-center">
              {/* Back link */}
              <Link
                to="/education"
                className="inline-flex items-center gap-2 no-underline mb-10 transition-colors duration-300"
                style={{ color: C.textMuted, fontFamily: BODY }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
              >
                <span style={{ fontSize: "0.7rem" }}>←</span>
                <span className="text-[0.5rem] tracking-[3px] uppercase">
                  Education Journal
                </span>
              </Link>

              {formattedDate && (
                <p
                  className="text-[0.55rem] tracking-[4px] uppercase mb-4"
                  style={{ color: C.gold, fontFamily: BODY }}
                >
                  {formattedDate}
                </p>
              )}

              <h1
                className="font-light leading-[1.1] mb-6"
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                {article.title}
              </h1>

              {article.subtitle && (
                <p
                  className="text-[0.9rem] leading-relaxed max-w-lg mx-auto"
                  style={{ color: C.textMuted, fontFamily: BODY }}
                >
                  {article.subtitle}
                </p>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="w-10 h-px opacity-30" style={{ background: C.gold }} />
                <div className="w-[4px] h-[4px] rotate-45" style={{ background: C.gold, opacity: 0.6 }} />
                <div className="w-10 h-px opacity-30" style={{ background: C.gold }} />
              </div>
            </div>
          </div>

          {/* Featured image */}
          {article.featured_image && (
            <div className="max-w-[900px] mx-auto px-6 md:px-10 -mt-0 pt-12">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full object-cover"
                style={{
                  maxHeight: "480px",
                  border: `1px solid ${C.rule}`,
                }}
              />
            </div>
          )}

          {/* Body */}
          <div className="max-w-[720px] mx-auto px-6 md:px-10 py-16">
            {article.content ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  lineHeight: "1.9",
                  fontSize: "0.95rem",
                  color: C.text,
                }}
              />
            ) : (
              <p style={{ color: C.textMuted }}>No content available.</p>
            )}

            {/* Footer ornament */}
            <div className="flex items-center gap-4 mt-16">
              <div className="w-16 h-px opacity-30" style={{ background: C.gold }} />
              <div className="w-[4px] h-[4px] rotate-45" style={{ background: C.gold, opacity: 0.5 }} />
              <div className="w-16 h-px opacity-30" style={{ background: C.gold }} />
            </div>

            {/* Back */}
            <div className="mt-10">
              <Link
                to="/education"
                className="inline-flex items-center gap-2 no-underline transition-colors duration-300"
                style={{ color: C.textMuted, fontFamily: BODY }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
              >
                <span style={{ fontSize: "0.7rem" }}>←</span>
                <span className="text-[0.5rem] tracking-[3px] uppercase">
                  Back to Education Journal
                </span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Article body styles for Quill HTML */}
      <style>{`
        .article-body h1, .article-body h2, .article-body h3 {
          font-family: ${SERIF};
          color: #fff;
          font-weight: 300;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .article-body h1 { font-size: clamp(1.8rem, 3vw, 2.4rem); }
        .article-body h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); }
        .article-body h3 { font-size: clamp(1.1rem, 2vw, 1.4rem); }
        .article-body p { margin-bottom: 1.4rem; }
        .article-body strong { color: ${C.goldPale}; font-weight: 600; }
        .article-body em { color: ${C.goldLight}; font-style: italic; }
        .article-body a { color: ${C.gold}; text-decoration: underline; text-underline-offset: 3px; }
        .article-body a:hover { color: ${C.goldLight}; }
        .article-body ul, .article-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .article-body li { margin-bottom: 0.4rem; }
        .article-body blockquote {
          border-left: 2px solid ${C.gold};
          padding-left: 1.5rem;
          margin: 2rem 0;
          color: ${C.textMuted};
          font-style: italic;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid ${C.rule};
          margin: 2.5rem 0;
        }
        .article-body img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
