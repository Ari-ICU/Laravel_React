import React from "react";
import { useSearch } from "../context/SearchContext"; // Importing context

const Search = () => {
  const { searchText, searchResults, handleSearchChange, loading } =
    useSearch();

  return (
    <div className="relative hidden md:block">
      {/* Search Input with Icon */}
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-600"
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

      {/* Input Field */}
      <input
        type="text"
        id="search-navbar"
        className="block w-full p-2 ps-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
      />

      {/* Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-full max-h-60 overflow-y-auto z-10">
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

      {/* No Results Found */}
      {searchResults.length === 0 && searchText.trim() !== "" && (
        <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-full p-2 text-sm text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default Search;
