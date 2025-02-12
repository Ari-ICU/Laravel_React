import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold bg-[rgba(236,206,152,0.48)] w-full p-4 mb-4 text-black">
        Cart ({cartItems.length} item)
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-black flex justify-center ">Your cart is empty</p>
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
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4 text-xl font-semibold">
            <p>Subtotal: ${totalPrice.toFixed(2)}</p>
          </div>

          <Link to="/checkout">
            <button className="mt-4 w-full bg-[#D9BBB0] text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
