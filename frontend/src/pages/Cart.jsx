import { useState } from "react";
import { useCart } from "../CartContext";

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

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutStatus(null);
    try {
      console.log("[Data Fetch] Initiating checkout at /api/checkout...");
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          total: cartTotal.toFixed(2),
          customerDetails: { name: "Guest User", email: "guest@example.com" }
        })
      });

      const data = await res.json();
      console.log("[Data Fetch] Checkout response status:", res.status, "data:", data);
      
      if (!res.ok) throw new Error("Checkout failed");

      setCheckoutStatus("success");
      clearCart();
    } catch (err) {
      console.error(err);
      setCheckoutStatus("error");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div style={{ background: C.dark, minHeight: "100svh", paddingTop: "120px", paddingBottom: "100px", fontFamily: "'Libre Baskerville', serif" }}>
      <div className="max-w-[1000px] mx-auto px-[40px]">
        <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6" style={{ color: C.gold }}>
          Your Selection
        </p>
        <h2
          className="text-center font-light mb-10 leading-[1.1]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#fff", letterSpacing: "-0.5px" }}
        >
          Shopping <em style={{ color: C.gold, fontStyle: "italic" }}>Cart</em>
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-20" style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}>
            <p className="text-[1.2rem] font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.text }}>
              Your cart is currently empty.
            </p>
            <a
              href="/#products"
              className="inline-block px-9 py-[13px] text-[0.58rem] tracking-[3px] uppercase no-underline font-bold transition-all duration-400"
              style={{ background: C.gold, color: C.dark }}
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
            <div>
              <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_auto] gap-4 pb-4 mb-6 text-[0.6rem] tracking-[3px] uppercase" style={{ color: C.textMuted, borderBottom: `1px solid ${C.rule}` }}>
                <div>Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
                <div></div>
              </div>

              <div className="flex flex-col gap-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_auto] gap-4 items-center pb-6" style={{ borderBottom: `1px solid ${C.rule}` }}>
                    <div className="flex gap-6 items-center">
                      <img src={item.product.img} alt={item.product.name} className="w-24 h-24 object-cover" style={{ filter: "brightness(0.9)" }} />
                      <div>
                        <h3 className="text-[1.4rem] font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                          {item.product.name}
                        </h3>
                        <p className="text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>
                          {item.size.s}
                        </p>
                        <p className="text-[0.8rem]" style={{ color: C.textMuted }}>
                          {item.size.p}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size.s, -1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
                        style={{ border: `1px solid ${C.rule}`, background: "transparent", color: C.gold }}
                      >
                        -
                      </button>
                      <span className="text-[1rem] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size.s, 1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
                        style={{ border: `1px solid ${C.rule}`, background: "transparent", color: C.gold }}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right text-[1.2rem] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}>
                      ${(parseFloat(item.size.p.replace("$", "")) * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.size.s)}
                      className="ml-4 w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                      aria-label="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-fit p-8" style={{ background: C.dark2, border: `1px solid ${C.rule}` }}>
              <h3 className="text-[1.2rem] font-light mb-6 pb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", borderBottom: `1px solid ${C.rule}` }}>
                Order Summary
              </h3>
              
              <div className="flex justify-between items-center mb-4 text-[0.85rem]" style={{ color: C.textMuted }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-[0.85rem]" style={{ color: C.textMuted }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between items-center py-6 mb-8 text-[1.4rem] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold, borderTop: `1px solid ${C.rule}` }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className="w-full py-[16px] text-[0.6rem] tracking-[4px] uppercase font-bold transition-all duration-400"
                style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark, border: "none", opacity: isCheckingOut ? 0.7 : 1 }}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>

              {checkoutStatus === "success" && (
                <p className="text-center mt-4 text-[0.7rem] tracking-[1px]" style={{ color: C.goldPale }}>
                  Thank you! Your order has been placed.
                </p>
              )}
              {checkoutStatus === "error" && (
                <p className="text-center mt-4 text-[0.7rem] tracking-[1px] text-red-500">
                  Failed to process order. Please try again.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
