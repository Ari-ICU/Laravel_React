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
import { ProductProvider } from "./context/ProductContext";
import SingleProduct from "./pages/SingleProduct";
import Product from "./pages/Product";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import UserProfile from "./pages/UserProfile";
import AuthPage from "./pages/Auth";

function App() {
  return (
    <ProductProvider>
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
                path="/product"
                element={
                  <Layout>
                    <Product />
                  </Layout>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <Layout>
                    <SingleProduct />
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
                path="/cart"
                element={
                  <Layout>
                    <Cart />
                  </Layout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <Layout>
                    <Wishlist />
                  </Layout>
                }
              />

              <Route
                path="/profile"
                element={
                  <Layout>
                    <UserProfile />
                  </Layout>
                }
              />
              <Route
                path="/auth"
                element={
                  <Layout>
                    <AuthPage />
                  </Layout>
                }
              />

              <Route
                path="/terms"
                element={
                  <Layout>
                    <TermsAndConditions />
                  </Layout>
                }
              />
              <Route
                path="/privacy"
                element={
                  <Layout>
                    <PrivacyPolicy />{" "}
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
    </ProductProvider>
  );
}

export default App;
