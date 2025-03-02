import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaSignInAlt,
  FaUserAlt,
  FaHeart,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useCategory } from "../context/CategoryContext";
import { useWishlist } from "../context/WishlistContext";
import NavbarDropdown from "./NavbarDropdown";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/logo.png";

// Lazy load components
const LazyCart = lazy(() => import("../pages/Cart"));

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { cartItems, loading } = useCart();
  const { wishlist } = useWishlist(); // Get wishlist items from context
  const { changeCategory } = useCategory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    }
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  if (loading) {
    return <div>Loading...</div>;
  }
  const wishlistItemCount = Array.isArray(wishlist) 
    ? wishlist.length 
    : 0;

  console.log("Cart Item Count:", cartItemCount); // Debugging line to check cart count
  console.log("Wishlist Item Count:", wishlistItemCount); // Debugging line to check wishlist count

  return (
    <header className="text-[#F7E6CA] dark:text-[#EAEAEA] shadow sticky top-0 z-50 w-full">
      <nav className="border-gray-200 max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-16" alt="Logo" />
        </Link>

        <ul className="hidden md:flex items-center space-x-8 font-medium text-sm">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover:underline ${location.pathname === item.path ? "text-[#FFD700]" : ""
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <NavbarDropdown changeCategory={changeCategory} />
          </li>
          {[
            // { name: "Review", path: "/reviews" },
            { name: "Contact Us", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover:underline ${location.pathname === item.path ? "text-[#FFD700]" : ""
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-white cursor-pointer"
          >
            <FaSearch className="w-6 h-6" />
          </button>

          {/* Cart Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative text-white cursor-pointer"
          >
            <FaShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          <Link to="/wishlist" className="relative text-white cursor-pointer">
            <FaHeart className="w-6 h-6" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistItemCount}
              </span>
            )}
          </Link>

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

          <button onClick={toggleDarkMode} className="text-white">
            {isDarkMode ? (
              <FaSun className="w-6 h-6" />
            ) : (
              <FaMoon className="w-6 h-6" />
            )}
          </button>

          <button
            className="md:hidden text-white"
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
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-[rgba(141,72,72)] z-50">
          <div className=" h-full p-4 flex flex-col space-y-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-right text-gray-600"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-lg ${location.pathname === item.path ? "text-[#FFD700]" : ""
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex justify-center items-center">
              <NavbarDropdown changeCategory={changeCategory} />
            </div>

            {[
              // { name: "Review", path: "/reviews" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-lg ${
                  location.pathname === item.path ? "text-[#FFD700]" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {isCartOpen && (
        <Suspense fallback={<div>Loading Cart...</div>}>
          <motion.div
            ref={cartRef}
            className="fixed right-0 top-0 w-80 h-full bg-[rgba(125,99,50)] text-white p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LazyCart />
          </motion.div>
        </Suspense>
      )}
    </header>
  );
};

export default Header;
