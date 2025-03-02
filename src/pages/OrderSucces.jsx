import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // For navigation and access to URL params
import { useCart } from "../context/CartContext"; // To clear cart after successful order

const OrderSuccessPage = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [orderDetails, setOrderDetails] = useState(null); // Store the fetched order details
  const [loading, setLoading] = useState(true); // Loading state for fetching order data
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Clear cart after successful order

  // Fetch order details from the API using the orderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://your-laravel-api.com/api/orders/${orderId}` 
        );
        const data = await response.json();
        if (data.success) {
          setOrderDetails(data.order); // Store the order details in state
          clearCart(); 
        } else {
          alert("Order not found");
          navigate("/"); 
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        alert("An error occurred. Please try again.");
        navigate("/"); // Redirect to home if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate, clearCart]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="container text-black mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Successful</h1>
      {orderDetails ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Thank you for your order!</h2>
          <p>Your order has been placed successfully. Below are your order details:</p>

          {/* Display order details */}
          <div className="order-summary mt-4">
            <h3 className="font-semibold">Order Information</h3>
            <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p><strong>Total Amount:</strong> ${orderDetails.total.toFixed(2)}</p>
            <p><strong>Shipping Address:</strong> {orderDetails.customer.address}</p>
            <p><strong>Phone Number:</strong> {orderDetails.customer.phone}</p>
            <p><strong>Email:</strong> {orderDetails.customer.email}</p>
          </div>

          {/* Optional: Order tracking or next steps */}
          <div className="order-actions mt-6">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#D9BBB0] text-white"
            >
              Go to Home
            </button>
          </div>
        </div>
      ) : (
        <p>Order details not available.</p>
      )}
    </div>
  );
};

export default OrderSuccessPage;
