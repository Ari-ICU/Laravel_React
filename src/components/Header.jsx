import React, { useState, useEffect } from "react";
import { useCategory } from "../context/CategoryContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const ProfileDropdown = ({ user, signOut }) => {
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="z-50 absolute top-8 right-1 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
      id="user-dropdown"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={dropdownVariants}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: "auto" }} // Ensure it's clickable
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {user?.name}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {user?.email}
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        {user && (
          <li className="relative text-center">
            <button
              onClick={signOut} // Trigger sign-out from the AuthContext
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        )}
      </ul>
    </motion.div>
  );
};

const NavbarDropdown = () => {
  const { changeCategory } = useCategory();
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="z-10 absolute mt-2 left-0 bg-white divide-y divide-gray-100 shadow-sm shadow-gray-400 w-full rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      id="doubleDropdown"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={dropdownVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 p-4 h-full">
        {/* Gender Dropdown */}
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="#"
              className="block px-4 py-2 font-bold underline dark:text-gray-200"
            >
              Gender
            </Link>
          </li>
          <li>
            <Link
              to="/category/women"
              className="block text-[12px] px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={() => changeCategory("women")}
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to="/category/men"
              onClick={() => changeCategory("mens")}
              className="block text-[12px] px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Men
            </Link>
          </li>
        </ul>

        {/* Personality Dropdown */}
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="#"
              className="block px-4 py-2 font-bold underline dark:text-gray-200"
            >
              Personality
            </Link>
          </li>
          <li>
            <Link
              to="/category/romantic"
              onClick={() => changeCategory("romantic")}
              className="block px-4 text-[12px] py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Romantic
            </Link>
          </li>
          <li>
            <Link
              to="/category/fresh"
              onClick={() => changeCategory("fresh")}
              className="block px-4 text-[12px] py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Fresh
            </Link>
          </li>
        </ul>
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="#"
              className="block px-4 py-2 font-bold underline  dark:text-gray-200 "
            >
              Brand
            </Link>
          </li>
          <li>
            <Link
              to="/category/dior"
              onClick={() => changeCategory("dior")}
              className="block px-4 text-[12px] py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dior
            </Link>
          </li>
          <li>
            <Link
              to="/category/channel"
              onClick={() => changeCategory("channel")}
              className="block px-4 text-[12px] py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Channel
            </Link>
          </li>
        </ul>
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="#"
              className="block px-4 py-2 font-bold underline  dark:text-gray-200 "
            >
              Origin
            </Link>
          </li>
          <li>
            <Link
              to="/category/france"
              onClick={() => changeCategory("france")}
              className="block px-4 text-[12px] py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              France
            </Link>
          </li>
          <li>
            <Link
              to="/category/italy"
              onClick={() => changeCategory("italy")}
              className="block px-4 text-[12px] py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Italy
            </Link>
          </li>
        </ul>

        {/* Other categories can be added similarly */}
      </div>
    </motion.div>
  );
};

const IconBtn = () => {
  return (
    <div className="relative">
      <ul className="flex justify-between items-center space-x-8 rtl:space-x-reverse">
        {/* Cart Icon */}
        <li>
          <Link
            to="/cart"
            className="text-gray-900 dark:text-white hover:underline"
          >
            <FaShoppingCart className="w-6 h-6" />
            <span className=" sr-only">Cart</span>
          </Link>
        </li>
        {/* Wishlist Icon */}
        <li>
          <Link
            to="/wishlist"
            className="text-gray-900 dark:text-white hover:underline"
          >
            <FaHeart className="w-6 h-6" />
            <span className=" sr-only">Wishlist</span>
          </Link>
        </li>
      </ul>

      <div className="absolute md:hidden  left-26 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <FaSearch
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false); // State for hover
  const [isProfileClicked, setIsProfileClicked] = useState(false); // State for click
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { user, signOut } = useAuth();

  useEffect(() => {
    // Reset the menu states when the route changes
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsProfileHovered(false); // Reset hover state
    setIsProfileClicked(false); // Reset click state
    setIsMobileDropdownOpen(false);
  }, [location]); // Depend on location, so the effect runs on route change

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false); // Close dropdown when mobile menu is opened
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsMobileMenuOpen(false); // Close mobile menu when dropdown is opened
  };

  const toggleProfileDropdown = () => {
    if (isProfileHovered || isProfileClicked) {
      setIsProfileClicked(false);
      setIsProfileHovered(false); // Close if clicked or hovered again
    } else {
      setIsProfileClicked(true); // Stay open on click
      setIsProfileHovered(true); // Keep it open when hovered
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="bg-[#8174A0] text-black shadow sticky top-0 z-100">
      <nav className=" border-gray-200 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Perfume Logo" />
            <span className="sr-only">Perfume</span>
          </Link>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-600 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark: dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="tel:855888639316" className="text-sm  hover:underline">
              (855) 888-639-316
            </Link>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {user ? (
                // If user is logged in, show profile icon
                <Link
                  to="/profile"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={toggleProfileDropdown}
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                >
                  <span className="sr-only">Open user menu</span>
                  <FaUserAlt className="w-8 h-8 text-white" />
                  {/* Logged-in icon */}
                </Link>
              ) : (
                // If user is not logged in, show sign-in icon
                <Link
                  to="/auth"
                  className="text-sm text-gray-900 dark:text-white hover:underline"
                >
                  <FaSignInAlt className="w-6 h-6 text-gray-300" />
                  {/* Sign-in icon */}
                </Link>
              )}
              {(isProfileHovered || isProfileClicked) && user && (
                // Only show profile dropdown if user is logged in
                <ProfileDropdown user={user} signOut={signOut} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl h-full px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="hidden md:flex flex-row font-medium items-center mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  About Us
                </Link>
              </li>
              <li aria-labelledby="dropdownNavbarLink">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="flex items-center  dark:text-white justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Perfume
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isDropdownOpen && NavbarDropdown()}
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Review
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            {IconBtn()}
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-8 shadow-lg flex flex-col space-y-4 p-10"
            >
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleMobileDropdown}
                  className="flex items-center justify-between py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Perfume
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isMobileDropdownOpen && NavbarDropdown()}
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Review
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </motion.ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
