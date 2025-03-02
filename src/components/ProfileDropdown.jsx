import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ user }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      navigate("/auth");
    } else {
      console.error("Logout failed:", result.error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
      <div className="px-4 py-2 text-gray-700 dark:text-gray-300">
        {user.name} <br />
        <span className="text-xs">{user.email}</span>
      </div>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
