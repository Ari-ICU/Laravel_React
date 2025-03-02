import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayPalPayment = ({ total }) => {
  const navigate = useNavigate();

  const initialPayPalOptions = {
    "client-id":
      "AZsg0CU6mNHveGmpF90bMucCtWGs2ZKPUKg7B2iQzzFYvQoYcH2p_L_MREqXMJgYPtjeZ43Fq11uDhIf", // Replace with actual client ID
    currency: "USD",
  };

  return (
    <PayPalScriptProvider options={initialPayPalOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Payment successful!");
            navigate("/order-success");
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
