import { useState } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutStatus(null);
    try {
      console.log("[Data Fetch] Initiating checkout at /api/checkout...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/checkout`, {
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
    <div className="bg-dark min-h-[100svh] pt-[120px] pb-[100px] font-baskerville">
      <div className="max-w-[1000px] mx-auto px-6 md:px-[40px]">
        <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6 text-gold">
          Your Selection
        </p>
        <h2 className="text-center font-light mb-10 leading-[1.1] font-garamond text-[clamp(2.2rem,4.5vw,3.8rem)] text-white tracking-[-0.5px]">
          Shopping <em className="text-gold italic">Cart</em>
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 border-y border-rule">
            <p className="text-[1.2rem] font-light mb-6 font-garamond text-text">
              Your cart is currently empty.
            </p>
            <Link
              to="/products"
              className="font-baskerville px-9 py-3.25 text-[0.58rem] tracking-[3px] uppercase border-none cursor-pointer font-bold transition-all duration-400 bg-gold hover:bg-gold-light text-dark"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
            <div>
              <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_auto] gap-4 pb-4 mb-6 text-[0.6rem] tracking-[3px] uppercase text-text-muted border-b border-rule">
                <div>Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
                <div></div>
              </div>

              <div className="flex flex-col gap-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_auto] gap-4 items-center pb-6 border-b border-rule">
                    <div className="flex gap-6 items-center">
                      <img src={item.product.img} alt={item.product.name} className="w-24 h-24 object-cover brightness-90" />
                      <div>
                        <h3 className="text-[1.4rem] font-light mb-1 font-garamond text-white">
                          {item.product.name}
                        </h3>
                        <p className="text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">
                          {item.size.s}
                        </p>
                        <p className="text-[0.8rem] text-text-muted">
                          {item.size.p}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size.s, -1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-300 border border-rule bg-transparent text-gold cursor-pointer hover:border-gold"
                      >
                        -
                      </button>
                      <span className="text-[1rem] font-light font-garamond text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size.s, 1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors duration-300 border border-rule bg-transparent text-gold cursor-pointer hover:border-gold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right text-[1.2rem] font-light font-garamond text-gold">
                      ${(parseFloat(item.size.p.replace("$", "")) * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.size.s)}
                      className="ml-4 w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent"
                      aria-label="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-fit p-8 bg-dark2 border border-rule">
              <h3 className="text-[1.2rem] font-light mb-6 pb-4 font-garamond text-white border-b border-rule">
                Order Summary
              </h3>
              
              <div className="flex justify-between items-center mb-4 text-[0.85rem] text-text-muted">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-[0.85rem] text-text-muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between items-center py-6 mb-8 text-[1.4rem] font-light font-garamond text-gold border-t border-rule">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className="w-full py-[16px] text-[0.6rem] tracking-[4px] uppercase font-bold transition-all duration-400 font-baskerville bg-gold text-dark border-none cursor-pointer disabled:opacity-70 hover:bg-gold-light"
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>

              {checkoutStatus === "success" && (
                <p className="text-center mt-4 text-[0.7rem] tracking-[1px] text-gold-pale">
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
