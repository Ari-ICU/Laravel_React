// src/context/SearchContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://your-api.com/search?q=${searchText}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <SearchContext.Provider
      value={{ searchText, searchResults, handleSearchChange, loading }}
    >
      {children}
    </SearchContext.Provider>
  );
};
