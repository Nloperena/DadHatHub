import React from 'react';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { cart, getTotalPrice } = useCart();

  return (
    <div>
      <h1>Cart Summary</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;
