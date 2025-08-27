// CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartUpdated, setCartUpdated }}>
      {children}
    </CartContext.Provider>
  );
};
