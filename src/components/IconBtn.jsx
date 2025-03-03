import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import React from "react";

const IconBtn = () => {
  return (
    <div className="relative">
      <ul className="flex justify-between items-center space-x-4 rtl:space-x-reverse">
        <li>
          <Link
            to="/wishlist"
            className=" dark:text-white hover:underline"
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
