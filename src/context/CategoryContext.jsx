import React, { createContext, useState, useEffect, useCallback, useContext } from "react";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    gender: null,
    brand: null,
    origin: null,
    personality: null,
  });

  const [filterOptions, setFilterOptions] = useState({
    gender: [],
    brand: [],
    origin: [],
    personality: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Build the URL based on filters; only include truthy parameters.
  const buildUrl = () => {
    const baseUrl = "http://127.0.0.1:8000/api/perfumes/";
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(`${key}_id`, value); // Send the filter as '_id'
      }
    });
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  // Memoize the fetch function so its identity is stable.
  const fetchCategoryProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildUrl();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);  // Set products response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch filters from API and set them in the state
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/perfume-filters");
        const data = await response.json();
        if (data.filters) {
          setFilterOptions(data.filters);  // Set the filter options from API
        }
      } catch (err) {
        setError("Error fetching filters");
      }
    };

    fetchFilters();
  }, []);

  // Fetch products when filters change.
  useEffect(() => {
    if (filters.gender || filters.brand || filters.origin || filters.personality) {
      fetchCategoryProducts(); // Fetch only if filters are set
    }
  }, [filters, fetchCategoryProducts]);

  // Expose a function to change filters.
  const changeFilter = useCallback((filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        filters,
        filterOptions,
        products,
        loading,
        error,
        changeFilter, // Pass down the changeFilter function
        fetchCategoryProducts, // Available for manual refresh if needed
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
