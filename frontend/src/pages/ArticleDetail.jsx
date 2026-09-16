import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
    <div className="bg-dark min-h-[100svh] font-baskerville text-text">
      {/* ── Loading ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[100svh]">
          <div className="w-[6px] h-[6px] rotate-45 animate-pulse mb-4 bg-gold" />
          <p className="text-[0.6rem] tracking-[4px] uppercase text-text-muted font-baskerville">
            Loading…
          </p>
        </div>
      )}

      {/* ── Error ── */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center gap-6 text-center px-6 min-h-[100svh]">
          <p className="text-red-400 text-sm">{error}</p>
          <Link
            to="/education"
            className="text-[0.55rem] tracking-[3px] uppercase no-underline transition-colors duration-300 text-gold font-baskerville"
          >
            ← Back to Education
          </Link>
        </div>
      )}

      {/* ── Article ── */}
      {!loading && !error && article && (
        <>
          {/* Hero */}
          <div className="relative pt-[120px] border-b border-rule">
            {article.featured_image && (
              <>
                {/* Blurred background */}
                <div
                  className="absolute inset-0 scale-[1.1] blur-[60px] brightness-20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.featured_image})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(14,10,5,0.8),#0e0a05)]" />
              </>
            )}

            <div className="relative max-w-[800px] mx-auto px-6 md:px-10 pb-12 text-center">
              {/* Back link */}
              <Link
                to="/education"
                className="inline-flex items-center gap-2 no-underline mb-10 transition-colors duration-300 text-text-muted font-baskerville hover:text-gold"
              >
                <span className="text-[0.7rem]">←</span>
                <span className="text-[0.5rem] tracking-[3px] uppercase">
                  Education Journal
                </span>
              </Link>

              {formattedDate && (
                <p className="text-[0.55rem] tracking-[4px] uppercase mb-4 text-gold font-baskerville">
                  {formattedDate}
                </p>
              )}

              <h1 className="font-light leading-[1.1] mb-6 font-garamond text-[clamp(2.2rem,5vw,4rem)] text-white tracking-[-0.5px]">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-[0.9rem] leading-relaxed max-w-lg mx-auto text-text-muted font-baskerville">
                  {article.subtitle}
                </p>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="w-10 h-px opacity-30 bg-gold" />
                <div className="w-[4px] h-[4px] rotate-45 opacity-60 bg-gold" />
                <div className="w-10 h-px opacity-30 bg-gold" />
              </div>
            </div>
          </div>

          {/* Featured image */}
          {article.featured_image && (
            <div className="max-w-[900px] mx-auto px-6 md:px-10 -mt-0 pt-12">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full object-cover max-h-[480px] border border-rule"
              />
            </div>
          )}

          {/* Body */}
          <div className="max-w-[720px] mx-auto px-6 md:px-10 py-16">
            {article.content ? (
              <div
                className="article-body leading-[1.9] text-[0.95rem] text-text"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-text-muted">No content available.</p>
            )}

            {/* Footer ornament */}
            <div className="flex items-center gap-4 mt-16">
              <div className="w-16 h-px opacity-30 bg-gold" />
              <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
              <div className="w-16 h-px opacity-30 bg-gold" />
            </div>

            {/* Back */}
            <div className="mt-10">
              <Link
                to="/education"
                className="inline-flex items-center gap-2 no-underline transition-colors duration-300 text-text-muted font-baskerville hover:text-gold"
              >
                <span className="text-[0.7rem]">←</span>
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
          font-family: 'Cormorant Garamond', serif;
          color: #fff;
          font-weight: 300;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .article-body h1 { font-size: clamp(1.8rem, 3vw, 2.4rem); }
        .article-body h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); }
        .article-body h3 { font-size: clamp(1.1rem, 2vw, 1.4rem); }
        .article-body p { margin-bottom: 0.7rem; }
        .article-body strong { color: #C8AE80; font-weight: 600; }
        .article-body em { color: #C4AA7A; font-style: italic; }
        .article-body a { color: #A89060; text-decoration: underline; text-underline-offset: 3px; }
        .article-body a:hover { color: #C4AA7A; }
        .article-body ul, .article-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .article-body li { margin-bottom: 0.4rem; }
        .article-body blockquote {
          border-left: 2px solid #A89060;
          padding-left: 1.5rem;
          margin: 2rem 0;
          color: #7a6a55;
          font-style: italic;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid rgba(168,144,96,0.12);
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
