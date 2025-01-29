// src/context/CartContext.jsx

import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react"; // Add useState import
import axios from "axios";

// Create the CartContext
const CartContext = createContext();

// Define the reducer for cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from the API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart");

        // Dispatch the data to the reducer
        dispatch({ type: "SET_CART", payload: response.data });
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Failed to fetch cart", error);
        setError("Failed to load cart data."); // Set error state if fetching fails
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (item) => {
    try {
      const response = await axios.post("/api/cart", item);
      dispatch({ type: "ADD_TO_CART", payload: response.data });
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, loading, error }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

export default CartContext;
