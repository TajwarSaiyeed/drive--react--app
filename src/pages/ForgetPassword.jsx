import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you can add your Firebase functionality to send the reset password email

    setIsLoading(false);
    setMessage(
      "We've sent you an email with instructions to reset your password. Please check your inbox."
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col justify-center px-8">
          <div className="max-w-md mx-auto">
            <div className="text-3xl font-bold text-center text-gray-900">
              Forgot your password?
            </div>
            <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
              No worries, just enter your email and we'll send you instructions
              to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-300 sm:text-sm"
                  />
                </div>
              </div>
              {message && (
                <div
                  className={`${
                    isLoading ? "text-yellow-500" : "text-green-500"
                  } text-sm text-center mt-2`}
                >
                  {message}
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Reset password"}
                </button>
              </div>
            </form>
            <div className="mt-6 flex justify-center items-center">
              <Link
                to="/login"
                className="text-center block bg-gray-50 hover:bg-gray-100 w-[200px] py-2 px-4 border-gray-700 border hover:border-none duration-500 rounded text-sm font-medium text-gray-500 hover:text-gray-700 "
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Ready to start?
              <br />
              Create an account today.
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
