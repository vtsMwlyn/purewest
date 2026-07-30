import { useState } from "react";

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

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("[Data Fetch] Attempting admin login at /api/auth/login...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("[Data Fetch] Login response status:", res.status);
      if (res.ok) {
        localStorage.setItem("purewest_admin_token", data.token);
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ background: C.dark, minHeight: "100svh", paddingTop: "120px", paddingBottom: "100px", fontFamily: "'Libre Baskerville', serif", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="w-full max-w-md p-10" style={{ background: C.dark2, border: `1px solid ${C.rule}` }}>
        <h2
          className="text-center font-light mb-8 leading-[1.1]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#fff" }}
        >
          Admin <em style={{ color: C.gold, fontStyle: "italic" }}>Login</em>
        </h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-[0.8rem] outline-none"
            style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-[0.8rem] outline-none"
            style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }}
          />
          <button
            type="submit"
            className="w-full py-[16px] text-[0.6rem] tracking-[4px] uppercase font-bold transition-all duration-400 mt-4 cursor-pointer"
            style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark, border: "none" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
