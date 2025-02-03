import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Correct import
import { useNavigate } from "react-router-dom"; // For navigation after checkout


const CheckoutPage = () => {
  const { cartItems } = useCart(); // Get cart items from the context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total price based on cart items
    setTotal(
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send checkout request to the Laravel API
      const response = await fetch("https://your-laravel-api.com/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
          total: total,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment successful!");
        navigate("/order-success"); // Redirect to a success page
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-black mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4">
          {/* Billing Information */}
          <div>
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <input
              name="name"
              placeholder="Full Name"
              className="bg-[#FFF5E1]"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="bg-[#FFF5E1]"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="address"
              placeholder="Shipping Address"
              className="bg-[#FFF5E1]"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between p-2">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#D9BBB0] text-white"
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
