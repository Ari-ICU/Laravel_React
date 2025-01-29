// src/pages/Cart.jsx

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // Correct import

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // Correct hook

  return (
    <div className="container text-white mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <h2 className="text-xl">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
