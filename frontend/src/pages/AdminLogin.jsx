import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
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
        toast.success("Login successful");
        localStorage.setItem("purewest_admin_token", data.token);
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark min-h-[100svh] pt-[120px] pb-[100px] font-baskerville flex justify-center items-center">
      <div className="w-full max-w-md p-10 bg-dark2 border border-rule">
        <h2 className="text-center font-light mb-8 leading-[1.1] font-garamond text-[2rem] text-white">
          Admin <em className="text-gold italic">Login</em>
        </h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-[0.8rem] outline-none bg-dark border border-rule text-text"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-[0.8rem] outline-none bg-dark border border-rule text-text"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-[16px] text-[0.6rem] tracking-[4px] uppercase font-bold transition-all duration-400 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-baskerville bg-gold text-dark border-none hover:bg-gold-light"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
