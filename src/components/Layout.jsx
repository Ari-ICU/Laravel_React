import React from "react";
import Header from "./Header"; // Your header component
import Footer from "./Footer"; // Your footer component

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7E6CA] text-[#AD9C8E]">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
