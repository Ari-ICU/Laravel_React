import React from "react";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";

const ButtonCart = ({ product, quantity = 1 }) => {
  const { addToCart, fetchCart } = useCart();

  const handleAddToCart = async () => {
    console.log("Product to add to cart:", product);
    console.log("Quantity:", quantity);

    if (!product || !product.id || quantity <= 0) {
      console.error("Invalid product or quantity");
      return;
    }

    try {
      // Add the item to the cart
      await addToCart({
        perfume_id: product.id,
        name: product.name || product.title,
        price: typeof product.price === "number" ? product.price : 0,
        quantity: quantity,
      });

      // Fetch the updated cart data from the server
      await fetchCart();

      console.log("Cart updated after adding:", product);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data?.detail || error.message);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-[#d5a835] text-white text-sm font-medium rounded-md hover:bg-[#4e4040] hover:text-[#F7E6CA] transition"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

ButtonCart.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  quantity: PropTypes.number,
};

export default ButtonCart;
