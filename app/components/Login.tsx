"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const mutation = `
      mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            email
            role
          }
        }
      }
    `;

    const variables = {
      email: formData.email,
      password: formData.password,
    };
    
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://car-rental-system-wgtb.onrender.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ query: mutation, variables }),
        }
      );

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      console.log("Login successful:", result.data);

      if (result.data?.login?.token) {
        localStorage.setItem("token", result.data.login.token);
        window.dispatchEvent(new Event("authChange"));
        toast.success("Login successful");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2235] flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <a href="/forgottenpassword">
            <div className="hover:underline ml-[13rem] mt-2">
              Forgotten Password?
            </div>
          </a>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="flex items-center justify-center space-x-1">
            <div className="text-base">Dont have an account?</div>
            <a href="/signup">
              <div className="hover:underline">Sign up</div>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;