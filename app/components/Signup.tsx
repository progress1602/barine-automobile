"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    address: "",
    driversLicense: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const mutation = `
      mutation RegisterUser($fullName: String!, $email: String!, $phoneNumber: String!, $address: String!, $driversLicense: String!, $password: String!) {
        register(
          fullName: $fullName
          email: $email
          phoneNumber: $phoneNumber
          address: $address
          driversLicense: $driversLicense
          password: $password
        ) {
          user {
            id
            fullName
            email
             role
          }
        }
      }
    `;

    const variables = {
      fullName: formData.fullname,
      email: formData.email,
      phoneNumber: formData.phonenumber,
      address: formData.address,
      driversLicense: formData.driversLicense,
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

     
      setSuccess(true);
      toast.success("Signup successful....");
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

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [success, router]);

  return (
    <div className="min-h-screen bg-[#1e2235] flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign up
        </h1>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-center mb-4">
            Signup successful....
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
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
          {/* Phone Number Input */}
          <div>
            <label
              htmlFor="phonenumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter your phone number"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={formData.phonenumber}
              onChange={handleChange}
            />
          </div>
          {/* Address Input */}
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          {/* Driver's License Input */}
          <div>
            <label
              htmlFor="driversLicense"
              className="block text-gray-700 font-medium mb-2"
            >
              Drivers License
            </label>
            <input
              type="text"
              id="driversLicense"
              name="driversLicense"
              placeholder="Enter your driver's license number"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={formData.driversLicense}
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
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
