"use client";

import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulate API call
    // setTimeout(() => {
    //   setMessage(
    //     "Reset link sent! Please check your email. If you don't see it, please check your spam folder."
    //   );
    //   setIsLoading(false);
    //   setEmail("");
    // }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e2235] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="text-sm text-gray-500">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
        </div>

        {message && (
          <div className="text-center text-green-600 mb-4">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            disabled={isLoading || !email}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <a
              href="/login"
              className="text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors duration-200"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
