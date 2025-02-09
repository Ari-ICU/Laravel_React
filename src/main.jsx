import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PartnerProvider } from "./context/PartnerContext";
import { CarouselProvider } from "./context/CarouselContext";
import { ContactProvider } from "./context/ContactContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <ProfileProvider>
          <ContactProvider>
            <CarouselProvider>
              <PartnerProvider>
                <WishlistProvider>
                  <CartProvider>
                    <App />
                  </CartProvider>
                </WishlistProvider>
              </PartnerProvider>
            </CarouselProvider>
          </ContactProvider>
        </ProfileProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
