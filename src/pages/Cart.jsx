import React, { useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Assuming useCart provides cart state management
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems = [], removeFromCart, updateQuantity, addToCart } = useCart();

  // Calculate totalPrice using useMemo for optimization
  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const itemPrice = item.perfume?.price || 0; // Ensure price is valid
        return total + itemPrice * item.quantity;
      }, 0),
    [cartItems]
  );

  // Handle adding items to the cart with stock validation
  const handleAddToCart = (item) => {
    if (item.quantity < item.perfume?.stock) {
      addToCart(item); // Assuming addToCart will handle adding or updating the cart item
    } else {
      alert("Sorry, you cannot add more of this item. Stock limit reached.");
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < item.perfume?.stock) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      alert("Sorry, you cannot add more of this item. Stock limit reached.");
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]); // To track changes in cartItems

  return (
    <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-800 bg-yellow-100 p-4 rounded-lg shadow-md mb-6">
        Cart ({cartItems.length} item{cartItems.length !== 1 && "s"})
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10 text-xl text-gray-400">
          <p>Your cart is empty.</p>
          <Link
            to="/product"
            className="text-blue-500 mt-4 inline-block font-sans underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6 max-h-96 overflow-y-auto overflow-x-auto">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex flex-col sm:flex-row justify-between gap-2 items-center p-6 border border-gray-300 bg-[#9e7070] rounded-lg shadow-lg space-y-4 sm:space-y-0 hover:bg-[#555] transition-all duration-200 relative"
              >
                {/* Trash button positioned at the top-right */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2 right-2 text-white rounded-lg font-medium w-auto flex items-center justify-center transition-all duration-200"
                >
                  <FaTrash className="text-xl" />
                </button>

                <div className="flex items-center space-x-4">
                  <img
                    src={item.images ? `http://localhost:8000${item.images}` : "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md shadow-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                    <span>
                      ${((Number(item.perfume?.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity === 1}
                        className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        disabled={item.quantity >= item.perfume?.stock}
                        className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                      >
                        +
                      </button>
                    </div>
                    {item.quantity >= item.perfume?.stock && (
                      <p className="text-sm text-red-500 mt-1">Stock limit reached</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-semibold text-gray-800">Subtotal:</p>
            <p className="text-xl font-bold text-gray-900">
              ${totalPrice === 0 ? "0.00" : totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <Link to="/checkout">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-colors">
                Proceed to Checkout
              </button>
            </Link>
            <Link to="/product">
              <button className="w-full bg-gray-300 text-black py-3 rounded-lg text-lg font-semibold hover:bg-gray-400 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
