import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useProduct } from "../context/ProductContext";

const ButtonWishlist = () => {
  const { product } = useProduct();
  const { addToWishlist } = useWishlist();

  const handleAddWishlist = (product) => {
    addToWishlist(product);
  };
  return (
    <button
      onClick={() => handleAddWishlist(product)} // Add product to cart when clicked
      className="px-4 py-2 bg-[#864730] text-white text-sm font-medium rounded-md hover:bg-[#4e4040] hover:text-[#F7E6CA] transition"
    >
      Wishlist
    </button>
  );
};

export default ButtonWishlist;
