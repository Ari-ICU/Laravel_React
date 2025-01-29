import React from "react";
import { useProfile } from "../context/ProfileContext";

const UserProfile = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mt-10 mb-20 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{profile.name}</h1>
      <p className="text-lg text-gray-600 mb-2">{profile.email}</p>
      <p className="text-md text-gray-500 mb-4">Age: {profile.age || "N/A"}</p>
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Address:</h3>
        <p className="text-gray-600">
          {profile.address || "Address not provided"}
        </p>
      </div>
      {/* Add more profile fields as needed */}
    </div>
  );
};

export default UserProfile;
