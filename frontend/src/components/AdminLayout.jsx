import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

const navItems = [
  {
    label: "Products",
    href: "/admin/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children, title, action }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("purewest_admin_token");
    window.location.href = "/admin";
  };

  return (
    <div
      style={{
        background: C.dark,
        minHeight: "100svh",
        fontFamily: BODY,
        color: C.text,
        display: "flex",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="hidden md:flex flex-col shrink-0"
        style={{
          width: "240px",
          background: C.dark2,
          borderRight: `1px solid ${C.rule}`,
          position: "sticky",
          top: 0,
          height: "100svh",
        }}
      >
        {/* Brand */}
        <div
          className="px-7 py-8"
          style={{ borderBottom: `1px solid ${C.rule}` }}
        >
          <Link to="/" className="no-underline block">
            <div
              className="text-lg tracking-[5px] uppercase font-semibold leading-none mb-1"
              style={{ fontFamily: SERIF, color: C.gold }}
            >
              Purewest
            </div>
            <div
              className="text-[0.42rem] tracking-[4px] uppercase"
              style={{ color: C.textMuted, fontFamily: SERIF }}
            >
              Admin Panel
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-6 px-4 flex flex-col gap-1">
          <p
            className="text-[0.45rem] tracking-[3px] uppercase px-3 mb-3"
            style={{ color: C.textMuted }}
          >
            Content
          </p>
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-3 py-[10px] no-underline transition-all duration-200 rounded-none"
                style={{
                  background: active ? "rgba(168,144,96,0.12)" : "transparent",
                  color: active ? C.gold : C.textMuted,
                  borderLeft: active ? `2px solid ${C.gold}` : "2px solid transparent",
                  fontFamily: BODY,
                  fontSize: "0.7rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = C.goldPale;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = C.textMuted;
                }}
              >
                <span style={{ opacity: active ? 1 : 0.5 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${C.rule}` }}>
            <p
              className="text-[0.45rem] tracking-[3px] uppercase px-3 mb-3"
              style={{ color: C.textMuted }}
            >
              Store
            </p>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-[10px] no-underline transition-all duration-200"
              style={{
                color: C.textMuted,
                fontFamily: BODY,
                fontSize: "0.7rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.goldPale)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              View Store
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-6" style={{ borderTop: `1px solid ${C.rule}` }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-[10px] w-full cursor-pointer transition-colors duration-200"
            style={{
              background: "transparent",
              border: "none",
              color: C.textMuted,
              fontFamily: BODY,
              fontSize: "0.7rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b6b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <aside
            className="flex flex-col h-full"
            style={{ width: "240px", background: C.dark2, borderRight: `1px solid ${C.rule}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-7 py-8" style={{ borderBottom: `1px solid ${C.rule}` }}>
              <div className="text-lg tracking-[5px] uppercase font-semibold leading-none mb-1" style={{ fontFamily: SERIF, color: C.gold }}>
                Purewest
              </div>
              <div className="text-[0.42rem] tracking-[4px] uppercase" style={{ color: C.textMuted, fontFamily: SERIF }}>
                Admin Panel
              </div>
            </div>
            <nav className="flex-1 py-6 px-4 flex flex-col gap-1">
              <p className="text-[0.45rem] tracking-[3px] uppercase px-3 mb-3" style={{ color: C.textMuted }}>Content</p>
              {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-[10px] no-underline transition-all duration-200"
                    style={{
                      background: active ? "rgba(168,144,96,0.12)" : "transparent",
                      color: active ? C.gold : C.textMuted,
                      borderLeft: active ? `2px solid ${C.gold}` : "2px solid transparent",
                      fontFamily: BODY,
                      fontSize: "0.7rem",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    <span style={{ opacity: active ? 1 : 0.5 }}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-6" style={{ borderTop: `1px solid ${C.rule}` }}>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-[10px] w-full cursor-pointer transition-colors duration-200"
                style={{ background: "transparent", border: "none", color: C.textMuted, fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "1px", textTransform: "uppercase" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0"
          style={{
            background: C.dark2,
            borderBottom: `1px solid ${C.rule}`,
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer border-none bg-transparent"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-5 h-px" style={{ background: C.gold }} />
            ))}
          </button>

          <h1
            className="text-[1.4rem] md:text-[1.7rem] font-light leading-none"
            style={{ fontFamily: SERIF, color: "#fff" }}
          >
            {title}
          </h1>

          {/* Optional action button slot */}
          {action && <div>{action}</div>}
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 md:px-10 py-8 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
