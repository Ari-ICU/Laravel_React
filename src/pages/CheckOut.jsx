import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import PayPalPayment from "../components/PayPalPayment";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    billingAddress: "",
    paymentMethod: "paypal",
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isSticky, setIsSticky] = useState(false); // State to handle sticky behavior

  useEffect(() => {
    console.log("Cart Items:", cartItems);

    const calculatedTotal = cartItems.reduce((sum, item) => {
      const price = Number(item.perfume?.price);
      const quantity = Number(item.quantity);

      return sum + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0);

    setTotal(calculatedTotal);

    // Listen to scroll event to toggle sticky class
    const handleScroll = () => {
      if (window.scrollY > 100) { // Trigger sticky after 100px of scroll
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cartItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
          total: total,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Order placed successfully!");
        clearCart(); // Clear the cart after order success
        navigate("/order-success");
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Billing Form */}
          <div className="w-full">
            <div style={{ zIndex: 10, position: "relative" }}>
              <PayPalPayment total={total} onSuccess={() => navigate("/order-success")} />
            </div>
            <p className="text-center text-gray-600 my-4">or</p>
            <form onSubmit={handleCheckout} className="space-y-6 p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  name="address"
                  type="text"
                  placeholder="Shipping Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    name="state"
                    type="text"
                    placeholder="State/Province"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  name="zip"
                  type="text"
                  placeholder="Zip/Postal Code"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  name="country"
                  type="text"
                  placeholder="Country"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
              >
                {loading ? "Processing..." : "Complete Purchase"}
              </motion.button>
            </form>
          </div>

          {/* Order Summary - Sticky after scroll */}
          <div className={`w-full ${isSticky ? "sticky top-10 z-10" : ""}`}>
            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between p-2 border-b">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${((item.perfume?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CheckoutPage;
