import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category"; // Import the new Category component
import Contact from "./pages/Contact";

function App() {
  return (
    <CategoryProvider>
      <ReviewsProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/reviews"
              element={
                <Layout>
                  <Reviews />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                <Layout>
                  <Category />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </ReviewsProvider>
    </CategoryProvider>
  );
}

export default App;
