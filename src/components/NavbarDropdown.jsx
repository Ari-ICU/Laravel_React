import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useCategory } from "../context/CategoryContext"; // Import the hook to consume context
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const NavbarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const dropdownRef = useRef(null);

  const { filterOptions, loading, error, changeFilter } = useCategory(); // Ensure changeFilter is properly consumed

  // Handle button click to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when a filter link is clicked and set the active filter
  const handleFilterClick = (filter, value) => {
    if (changeFilter) { // Ensure changeFilter exists before calling
      changeFilter(filter, value);
      setActiveFilter(value);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show a loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if filters data is valid
  const isFiltersValid = Object.keys(filterOptions).length > 0;

  return (
    <div className="relative group">
      <button
        className="text-white font-semibold flex items-center"
        onClick={toggleDropdown}
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="dropdown-menu"
      >
        <span className="mr-2">Perfume</span>

        {/* Change the icon dynamically based on dropdown state */}
        {isOpen ? (
          <FaChevronUp className="h-5 w-5" />
        ) : (
          <FaChevronDown className="h-5 w-5" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && isFiltersValid && (
        <motion.div
          ref={dropdownRef}
          className="fixed left-0 w-full mt-2 bg-[#bbab9e] divide-y divide-gray-100 shadow-lg rounded-lg z-50 dark:bg-gray-800 dark:divide-gray-600 dark:text-white"
          id="dropdown-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-screen-xl mx-auto">
            {/* Map over each filter category */}
            {Object.entries(filterOptions).map(([filterName, options]) => {
              // Ensure options is an array before rendering
              if (Array.isArray(options) && options.length > 0) {
                return (
                  <div key={filterName} className="col-span-1">
                    <p className="font-bold text-sm text-gray-700 mb-2 dark:text-gray-300">
                      {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
                    </p>
                    <ul>
                      {/* Map over each option in the filter category */}
                      {options.map((option) => (
                        <li
                          key={option.id}
                          className={`text-sm text-gray-600 hover:bg-[#bbab9ed5] hover:shadow-md rounded-md dark:text-gray-300 dark:hover:bg-[#bbab9ed5] dark:hover:text-white ${
                            activeFilter === option.id
                              ? "bg-[#654e2785] text-white dark:bg-[#654e2785]"
                              : ""
                          }`}
                        >
                          {/* Wrap the filter option in a Link to change the URL */}
                          <Link
                            to={`/products?${filterName}=${option.name}`} // Dynamically change URL
                            className="block px-4 py-2"
                            onClick={() => handleFilterClick(filterName, option.name)} // Pass filter name and value (ID)
                          >
                            {option.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null; // Return null if options are invalid
            })}
          </div>
        </motion.div>
      )}

      {/* Display message if filters are invalid or empty */}
      {!isFiltersValid && (
        <div className="text-red-500 p-4">No filters available.</div>
      )}
    </div>
  );
};

export default NavbarDropdown;
