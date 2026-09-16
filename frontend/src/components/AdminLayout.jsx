import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  {
    label: "Lab Tests",
    href: "/admin/lab-tests",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
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
    <div className="bg-dark min-h-[100svh] font-baskerville text-text flex">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col shrink-0 w-[240px] bg-dark2 border-r border-rule sticky top-0 h-[100svh]">
        {/* Brand */}
        <div className="px-7 py-8 border-b border-rule">
          <Link to="/" className="no-underline block text-inherit">
            <div className="text-lg tracking-[5px] uppercase font-semibold leading-none mb-1 font-garamond text-gold">
              Purewest
            </div>
            <div className="text-[0.42rem] tracking-[4px] uppercase text-text-muted font-garamond">
              Admin Panel
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-6 px-4 flex flex-col gap-1">
          <p className="text-[0.45rem] tracking-[3px] uppercase px-3 mb-3 text-text-muted">
            Content
          </p>
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-[10px] no-underline transition-all duration-200 rounded-none font-baskerville text-[0.7rem] tracking-[1px] uppercase border-l-2 hover:text-gold-pale ${
                  active ? "bg-[rgba(168,144,96,0.12)] text-gold border-gold" : "bg-transparent text-text-muted border-transparent"
                }`}
              >
                <span className={active ? "opacity-100" : "opacity-50"}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-rule">
            <p className="text-[0.45rem] tracking-[3px] uppercase px-3 mb-3 text-text-muted">
              Store
            </p>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-[10px] no-underline transition-all duration-200 text-text-muted font-baskerville text-[0.7rem] tracking-[1px] uppercase hover:text-gold-pale"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              View Store
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-rule">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-[10px] w-full cursor-pointer transition-colors duration-200 bg-transparent border-none text-text-muted font-baskerville text-[0.7rem] tracking-[1px] uppercase hover:text-[#ff6b6b]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
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
          className="fixed inset-0 z-40 md:hidden bg-[rgba(0,0,0,0.7)]"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="flex flex-col h-full w-[240px] bg-dark2 border-r border-rule"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-7 py-8 border-b border-rule">
              <div className="text-lg tracking-[5px] uppercase font-semibold leading-none mb-1 font-garamond text-gold">
                Purewest
              </div>
              <div className="text-[0.42rem] tracking-[4px] uppercase text-text-muted font-garamond">
                Admin Panel
              </div>
            </div>
            <nav className="flex-1 py-6 px-4 flex flex-col gap-1">
              <p className="text-[0.45rem] tracking-[3px] uppercase px-3 mb-3 text-text-muted">Content</p>
              {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-[10px] no-underline transition-all duration-200 font-baskerville text-[0.7rem] tracking-[1px] uppercase border-l-2 hover:text-gold-pale ${
                      active ? "bg-[rgba(168,144,96,0.12)] text-gold border-gold" : "bg-transparent text-text-muted border-transparent"
                    }`}
                  >
                    <span className={active ? "opacity-100" : "opacity-50"}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-6 border-t border-rule">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-[10px] w-full cursor-pointer transition-colors duration-200 bg-transparent border-none text-text-muted font-baskerville text-[0.7rem] tracking-[1px] uppercase hover:text-[#ff6b6b]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
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
        <header className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0 bg-dark2 border-b border-rule sticky top-0 z-30">
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer border-none bg-transparent"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-5 h-px bg-gold" />
            ))}
          </button>

          <h1 className="text-[1.4rem] md:text-[1.7rem] font-light leading-none font-garamond text-white">
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
