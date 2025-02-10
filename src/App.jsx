import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import { ProductProvider } from "./context/ProductContext";
import Layout from "./components/Layout";

// Lazy Loading Pages for Better Performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Reviews = lazy(() => import("./pages/Reviews"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Category = lazy(() => import("./pages/Category"));
const Contact = lazy(() => import("./pages/Contact"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Product = lazy(() => import("./pages/Product"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const AuthPage = lazy(() => import("./pages/Auth"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const CheckoutPage = lazy(() => import("./pages/CheckOut"));

function App() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <ReviewsProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
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
                  path="/product/:perfumeCode"
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
                  path="/checkout"
                  element={
                    <Layout>
                      <CheckoutPage />
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
                  path="/signup"
                  element={
                    <Layout>
                      <SignUpPage />
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
                      <PrivacyPolicy />
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
            </Suspense>
          </Router>
        </ReviewsProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
