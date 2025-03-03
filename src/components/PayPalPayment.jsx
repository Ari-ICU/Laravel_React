import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayPalPayment = ({ total }) => {
  const navigate = useNavigate();

  const initialPayPalOptions = {
    "client-id": "AZsg0CU6mNHveGmpF90bMucCtWGs2ZKPUKg7B2iQzzFYvQoYcH2p_L_MREqXMJgYPtjeZ43Fq11uDhIf", // Your sandbox client ID
    currency: "USD",
    intent: "capture",
  };

  // Ensure total is a valid number and format it correctly
  const formattedTotal = total && !isNaN(total) ? parseFloat(total).toFixed(2) : "0.00";

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: formattedTotal, 
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Payment successful!");
            navigate("/order-success"); // Redirect to success page
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Payment error. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
