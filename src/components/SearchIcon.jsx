import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "../context/SearchContext"; // Import the search context

const SearchIcon = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle search input visibility
  const { searchText, handleSearchChange, searchResults, loading } =
    useSearch(); // Use search context

  const toggleSearchInput = () => {
    console.log("Button clicked");
    setIsOpen(!isOpen);
  };

  // Check if the state changes
  useEffect(() => {
    console.log(`isOpen changed: ${isOpen}`);
  }, [isOpen]);

  return (
    <div className="relative md:hidden">
      {/* Search Icon */}
      <button
        className="absolute inset-y-0 left-28 top-0 flex items-center ps-3 cursor-pointer"
        onClick={toggleSearchInput} // Toggle input visibility on click
      >
        <FaSearch
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
      </button>

      {/* Conditionally render the input on icon click */}
      {isOpen && (
        <div
          className="absolute left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)} // Close the search modal when clicked outside
        >
          <div
            className="w-full h-full bg-white p-4 rounded-lg shadow-lg z-10"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="block w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {loading && (
              <div className="text-sm text-gray-500 mt-1">Loading...</div>
            )}
            {searchResults.length > 0 && (
              <div className="bg-white shadow-lg rounded-lg mt-2 w-full max-h-60 overflow-y-auto">
                <ul>
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{result.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchResults.length === 0 && searchText.trim() !== "" && (
              <div className="bg-white shadow-lg rounded-lg mt-2 w-full p-2 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchIcon;
