import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCategory } from "../context/CategoryContext";
import NavbarDropdown from "./NavbarDropdown";
import ProfileDropdown from "./ProfileDropdown";
import IconBtn from "./IconBtn";
import Cart from "../pages/Cart"; // Assuming Cart is a separate component
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { changeCategory } = useCategory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility
  const cartRef = useRef(null); // Ref for cart container

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false); // Close the cart when location changes
  }, [location]);

  // Close cart if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false); // Close the cart when clicking outside
      }
    };

    // Add event listener to close cart
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#AD9C8E] text-[#F7E6CA] shadow sticky top-0 z-50 w-full">
      <nav className="border-gray-200 max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-16" alt="Perfume Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-sm">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <NavbarDropdown changeCategory={changeCategory} />
          </li>
          <li>
            <Link to="/reviews" className="hover:underline">
              Review
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Profile, Search, Cart & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="text-white">
            <FaSearch className="w-6 h-6" />
          </button>
          <IconBtn />
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileDropdownOpen(true)}
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <button className="text-white">
                <FaUserAlt className="w-6 h-6" />
              </button>
              {isProfileDropdownOpen && <ProfileDropdown user={user} />}
            </div>
          ) : (
            <Link to="/auth" className="text-white">
              <FaSignInAlt className="w-6 h-6" />
            </Link>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="text-white"
          >
            <FaShoppingCart className="w-6 h-6" />
          </button>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-16 left-0 w-full bg-[#AD9C8E] shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center space-y-4 p-6 text-sm">
            <li>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <NavbarDropdown changeCategory={changeCategory} />
            </li>
            <li>
              <Link
                to="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:underline"
              >
                Review
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:underline"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </motion.div>
      )}

      {/* Search Popup */}
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-gray-500 p-4 rounded-lg shadow-lg w-96">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AD9C8E]"
            />
          </div>
        </motion.div>
      )}

      {/* Full Height Cart Component */}
      {isCartOpen && (
        <motion.div
          ref={cartRef} // Attach ref to the cart container
          className="fixed right-0 top-0 w-80 h-full bg-[rgba(125,99,50)] shadow-lg z-50"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button inside the cart */}
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <Cart />
        </motion.div>
      )}
    </header>
  );
};

export default Header;
