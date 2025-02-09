import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import React from "react";

const IconBtn = () => {
  return (
    <div className="relative">
      <ul className="flex justify-between items-center space-x-8 rtl:space-x-reverse">
        <li>
          <Link
            to="/cart"
            className="text-gray-900 dark:text-white hover:underline"
          >
            <FaShoppingCart className="w-6 h-6" />
            <span className="sr-only">Cart</span>
          </Link>
        </li>
        <li>
          <Link
            to="/wishlist"
            className="text-gray-900 dark:text-white hover:underline"
          >
            <FaHeart className="w-6 h-6" />
            <span className="sr-only">Wishlist</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default IconBtn;
