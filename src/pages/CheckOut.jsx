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

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    
    const calculatedTotal = cartItems.reduce((sum, item) => {
      const price = Number(item.perfume?.price); 
      const quantity = Number(item.quantity);

      return sum + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0);
  
    setTotal(calculatedTotal);
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
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-wrap space-y-4">
          <div className="w-full md:w-1/2 pr-4">
            <PayPalPayment total={total} onSuccess={() => navigate("/order-success")} />
            <p className="text-center">or</p>
            <form onSubmit={handleCheckout} className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Billing Information</h2>
              <input name="name" placeholder="Full Name" className="w-full p-2 border rounded mt-2" value={formData.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email Address" className="w-full p-2 border rounded mt-2" value={formData.email} onChange={handleChange} required />
              <input name="address" placeholder="Shipping Address" className="w-full p-2 border rounded mt-2" value={formData.address} onChange={handleChange} required />
              <motion.button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition" disabled={loading} whileHover={{ scale: 1.05 }}>
                {loading ? "Processing..." : "Complete Purchase"}
              </motion.button>
            </form>
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <div className="border rounded p-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between p-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>
  ${((item.perfume?.price || 0) * item.quantity).toFixed(2)}
</span>

                </div>
              ))}
              <div className="flex justify-between font-semibold mt-2">
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
