import React from "react";

const NotFound = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="sm:text-3xl md:text-5xl text-white font-bold mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-500 text-center text-lg mb-8">
        Sorry, the page you are looking for could not be found.
      </p>
      <a
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
      >
        Go back to home
      </a>
    </div>
  );
};

export default NotFound;
