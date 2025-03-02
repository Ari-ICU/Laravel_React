import React, { useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useProduct } from "../context/ProductContext";
import PropTypes from 'prop-types';

const ButtonWishlist = ({ product }) => {
  const { addToWishlist } = useWishlist();

  // Log product to make sure it's available
  useEffect(() => {
    console.log("Product available:", product); // Check if product is available
  }, [product]);

  // Guard condition to ensure product is available before adding to wishlist
  const handleAddWishlist = () => {
    if (!product || !product.id) {
      console.log("No product available to add.");
      alert("No product available to add.");
      return;
    }
    addToWishlist(product); // Add the product to the wishlist
  };

  return (
    <button
      onClick={handleAddWishlist}
      className="px-4 py-2 bg-[#864730] text-white text-sm font-medium rounded-md hover:bg-[#4e4040] hover:text-[#F7E6CA] transition"
    >
      Wishlist
    </button>
  );
};

ButtonWishlist.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ButtonWishlist;
