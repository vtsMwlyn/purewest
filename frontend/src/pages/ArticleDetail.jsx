import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

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
      {loading && <Spinner className="min-h-[100svh]" />}

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
          <div className="relative flex flex-col items-center justify-center text-center h-screen w-full bg-[linear-gradient(to_bottom,#120d07,#0e0a05)]">
            {article.featured_image && <img src={article.featured_image} className="absolute inset-0 w-full h-full object-cover z-0" />}
            
            <div className="relative z-8 bg-linear-to-t from-[rgba(14,10,5,1)] from-10% to-[rgba(26,18,10,0)] h-full w-full flex flex-col items-center justify-end px-6">
              {/* Decorative diamond */}
              <div className="w-[6px] h-[6px] rotate-45 mx-auto mb-6 bg-gold" />
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12.5 h-px bg-linear-to-r from-transparent to-gold" />
                <p className="font-baskerville text-[0.55rem] tracking-[6px] uppercase text-white">
                  {formattedDate}
                </p>
                <div className="w-12.5 h-px bg-linear-to-l from-transparent to-gold" />
              </div>
              <h1 className="font-garamond font-light leading-[1.05] mb-6 text-white tracking-[-0.5px] text-[clamp(2.8rem,6vw,5rem)]">
                {article.title}
              </h1>
              <p className="max-w-xl text-[0.9rem] leading-relaxed text-text-muted">
                {article.subtitle}
              </p>

              {/* Bottom rule */}
              <div className="flex items-center gap-4 my-8">
                <div className="w-16 h-px opacity-30 bg-gold" />
                <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
                <div className="w-16 h-px opacity-30 bg-gold" />
              </div>
            </div>
          </div>

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
            <div className="w-full flex justify-center mt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px opacity-30 bg-gold" />
                <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
                <div className="w-16 h-px opacity-30 bg-gold" />
              </div>
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
