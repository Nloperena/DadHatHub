import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.variant_id === item.variant_id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.variant_id === item.variant_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id, variant_id) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== id || cartItem.variant_id !== variant_id)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
