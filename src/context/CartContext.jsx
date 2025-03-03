import React, { createContext, useReducer, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create a CartContext for providing cart data throughout the app
const CartContext = createContext();

// Reducer for managing cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : [];
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + action.payload.quantity, item.perfume?.stock || item.quantity),
              }
            : item
        );
      }
      return [...state, action.payload];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000/api/cart"; // Your API endpoint

  // Fetch cart on initial load
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      if (response.data && Array.isArray(response.data)) {
        dispatch({ type: "SET_CART", payload: response.data });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to fetch cart.");
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart on mount
  }, []);

  // Add item to cart
  const addToCart = async (cartData) => {
    try {
      setLoading(true);
  
      // Optimistic update
      dispatch({
        type: "ADD_TO_CART",
        payload: cartData,
      });
  
      const response = await axios.post(`${API_BASE_URL}/add`, cartData);
  
      // Check if the response is just a success message
      if (response.data && response.data.message) {
        console.log(response.data.message); 
        await fetchCart();
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setError("Failed to add item to cart.");
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/update/${itemId}`, { quantity });
      dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id: itemId, quantity } });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setError("Failed to update item quantity.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/remove/${itemId}`);
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      setError("Failed to remove item from cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/clear`);
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      setError("Failed to clear cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems: state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
        error,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);

export default CartContext;
