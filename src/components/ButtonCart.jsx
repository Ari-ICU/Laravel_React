import React from "react";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

const ButtonCart = () => {
  const { product } = useProduct();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  return (
    <button
      className="px-4 py-2 bg-[#D9BBB0] text-white text-sm font-medium rounded-md hover:bg-[#4e4040] hover:text-[#F7E6CA] transition"
      onClick={() => handleAddToCart(product)}
    >
      Add to Cart
    </button>
  );
};

export default ButtonCart;
