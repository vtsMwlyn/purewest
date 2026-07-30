import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from local storage if available
    const saved = localStorage.getItem("purewest_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("purewest_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, sizeInfo, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size.s === sizeInfo.s
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size.s === sizeInfo.s
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size: sizeInfo, quantity }];
    });
  };

  const removeFromCart = (productId, sizeString) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size.s === sizeString))
    );
  };

  const updateQuantity = (productId, sizeString, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.size.s === sizeString) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ > 0 ? newQ : 1 };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.size.p.replace("$", ""));
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
