import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import Chevron Icons

const NavbarDropdown = ({ changeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // Track the active category
  const dropdownRef = useRef(null); // Ref to the dropdown content
  const location = useLocation(); // Get the current location

  const categories = [
    {
      title: "Gender",
      links: [
        { label: "Women", path: "/category/womens", category: "womens" },
        { label: "Men", path: "/category/mens", category: "mens" },
      ],
    },
    {
      title: "Personality",
      links: [
        { label: "Romantic", path: "/category/romantic", category: "romantic" },
        { label: "Fresh", path: "/category/fresh", category: "fresh" },
      ],
    },
    {
      title: "Brand",
      links: [
        { label: "Dior", path: "/category/dior", category: "dior" },
        { label: "Channel", path: "/category/channel", category: "channel" },
      ],
    },
    {
      title: "Origin",
      links: [
        { label: "France", path: "/category/france", category: "france" },
        { label: "Italy", path: "/category/italy", category: "italy" },
      ],
    },
  ];

  // Handle button click to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when a category link is clicked and set the active category
  const handleCategoryClick = (category) => {
    changeCategory(category); // Optionally trigger category change
    setActiveCategory(category); // Set the active category
    setIsOpen(false); // Close the dropdown menu
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

  return (
    <div className="relative group">
      <button
        className="text-white font-semibold flex items-center"
        onClick={toggleDropdown} // Toggle dropdown on button click
      >
        <span className="mr-2">Perfume</span>

        {/* Change the icon dynamically based on dropdown state */}
        {isOpen ? (
          <FaChevronUp className="h-5 w-5" /> // Show Chevron Up when dropdown is open
        ) : (
          <FaChevronDown className="h-5 w-5" /> // Show Chevron Down when dropdown is closed
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          ref={dropdownRef} // Attach ref to dropdown menu
          className="fixed w-screen mt-2 bg-[#bbab9e] divide-y divide-gray-100 shadow-lg rounded-lg z-50"
          style={{
            left: "0%", // Centers it horizontally
            transform: "translateX(-100%)", // Shifts it to the center
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-screen-xl mx-auto">
            {categories.map((section, index) => (
              <div key={index} className="col-span-1">
                <p className="font-bold text-sm text-gray-700 mb-2">
                  {section.title}
                </p>
                <ul>
                  {section.links.map((link, idx) => (
                    <li
                      key={idx}
                      className={`text-sm text-gray-600 hover:bg-[#bbab9ed5] hover:shadow-md rounded-md ${
                        activeCategory === link.category
                          ? "bg-[#654e2785] text-white"
                          : ""
                      }`} // Add active class if category is selected
                    >
                      <Link
                        to={link.path}
                        className="block px-4 py-2"
                        onClick={() => handleCategoryClick(link.category)} // Close dropdown on click
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NavbarDropdown;
