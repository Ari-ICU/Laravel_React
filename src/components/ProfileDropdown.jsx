import { motion } from "framer-motion";
import React from "react";

const ProfileDropdown = ({ user }) => {
  return (
    <motion.div
      className="absolute top-8 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {user?.username}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {user?.email}
        </span>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
