import React, { useState } from "react";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  // const { currentUser, updateEmail, updatePassword } = useAuth();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     return setError("Passwords do not match");
  //   }

  //   try {
  //     setError("");
  //     setLoading(true);
  //     const promises = [];

  //     if (email !== currentUser.email) {
  //       promises.push(updateEmail(email));
  //     }
  //     if (password) {
  //       promises.push(updatePassword(password));
  //     }
  //     await Promise.all(promises);
  //     setLoading(false);
  //   } catch {
  //     setError("Failed to update account");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-8 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-200 mb-3">
                Update Profile
              </h1>
            </div>
            {error && (
              <div className="bg-red-400 text-white p-3 mb-4 rounded-md">
                {error}
              </div>
            )}
            <form
            // onSubmit={handleSubmit}
            >
              <div className="divide-y divide-gray-600">
                <div className="py-5 text-base leading-6 space-y-4 text-gray-200 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <label htmlFor="email" className="leading-7 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      // placeholder={currentUser.email}
                      placeholder="Leave blank to keep the same"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="leading-7 font-semibold"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Leave blank to keep the same"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="leading-7 font-semibold"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Leave blank to keep the same"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-center items-center space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
