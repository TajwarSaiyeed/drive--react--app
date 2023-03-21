import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";

function Profile() {
  const { user } = useAuth();
  return (
    <div className="bg-gray-900 h-screen text-center text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to your Dashboard</h1>
      <div className="max-w-md mx-auto text-center">
        <p className="mb-4">
          Here you can manage your profile and view your account information.
        </p>
        <p className="mb-4">
          You can update your profile by clicking the button below.
        </p>
        <Link
          to={"/update-profile"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Update Profile
        </Link>
        <p className="mt-8">
          Your email address is <span className="font-bold">{user?.email}</span>
          .
        </p>
      </div>
    </div>
  );
}

export default Profile;
