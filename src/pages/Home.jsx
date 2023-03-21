import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider/AuthProvider";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

function Home() {
  const { loading } = useAuth();

  const features = [
    {
      title: "Feature 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.",
    },
    {
      title: "Feature 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.",
    },
    {
      title: "Feature 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.",
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Welcome to My App
            </h2>
            <p className="mt-3 text-xl text-gray-500">
              A simple and easy-to-use app for all your needs.
            </p>
            <div className="mt-10">
              <Link
                to="/get-started"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-8">
            Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <svg
                  className="h-6 w-6 mt-5 text-indigo-500 mb-4 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Ready to get started?
            </h2>
            <p className="mt-3 text-xl text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-10">
              <Link
                to="/get-started"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
