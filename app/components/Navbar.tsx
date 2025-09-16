"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem("token"); // Changed to match LoginPage
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, [checkAuthStatus]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    setIsDropdownOpen(false);
    router.push("/");
  };

  const navItems = [
    { name: "About", path: "/" },
    { name: "Faq", path: "/" },
    { name: "Catalogue", path: "/catalogue" },
  
  ];

  const dropdownItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout", path: "#", onClick: handleLogout },
  ];

  return (
    <nav className="p-4 rounded-3xl backdrop-blur-3xl bg-opacity-30 text-space-cadet bg-slate-50 fixed top-3 right-5 left-5 md:whitespace-nowrap md:right-8 md:left-8 lg:right-40 lg:left-40 z-50">
      <div className="text-sm container flex justify-between items-center h-16 font-medium mx-auto">
        <div className="flex justify-between items-center w-full">
          <Link
            href="/"
            className="text-2xl font-semibold flex items-center text-space-cadet"
          >
            <Image
              src="/b1.png"
              alt="Logo"
              width={150}
              height={10}
              className="h-36 w-36"
            />
          </Link>

          <ul className="hidden md:flex text-black z-50 text-base space-x-6 md:space-x-9 lg:space-x-10">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className="block cursor-pointer hover:underline decoration-red-600 decoration-2 transition-colors"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                    {dropdownItems.map(({ name, path, onClick }) => (
                      <Link
                        key={name}
                        href={path}
                        className="block px-4 py-2 text-black hover:bg-red-100 transition-colors"
                        onClick={(e) => {
                          if (onClick) {
                            e.preventDefault();
                            onClick();
                          }
                          setIsDropdownOpen(false);
                        }}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/signup">
                  <button className="flex w-36 h-12 md:ml-4 items-center justify-center space-x-2 font-semibold shadow-inner shadow-red-600 active:bg-red-600 transition-colors text-base border-2 active:transform active:scale-95 text-white bg-red-600 border-red-600 py-2 px-4 duration-200 rounded-2xl hover:text-black">
                    <span>Signup</span>
                  </button>
                </Link>
                <Link href="/login">
                  <button className="flex w-36 h-12 md:ml-4 items-center justify-center space-x-2 font-semibold shadow-inner transition-colors text-base border text-black active:transform active:scale-95 hover:bg-red-600 border-red-600 py-2 px-4 duration-200 rounded-2xl hover:text-white">
                    <span>Login</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none text-xl">
              {isMenuOpen ? (
                <X className="w-6 h-6 mt-6 text-space-cadet text-black" />
              ) : (
                <Menu className="w-6 h-6 text-space-cadet text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 right-0 left-0 bg-white h-screen rounded-2xl border-gray-200 shadow-lg p-6 md:hidden">
          <ul className="space-y-4">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  onClick={toggleMenu}
                  className="block text-black hover:text-slate-grey transition-colors cursor-pointer"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <div className="mt-6 flex flex-col space-y-4">
              {dropdownItems.map(({ name, path, onClick }) => (
                <Link
                  key={name}
                  href={path}
                  onClick={(e) => {
                    if (onClick) {
                      e.preventDefault();
                      onClick();
                    }
                    toggleMenu();
                  }}
                  className="block text-black hover:text-slate-grey transition-colors cursor-pointer"
                >
                  {name}
                </Link>
              ))}
            </div>
          ) : (
            <>
              <Link href="/signup">
                <div className="mt-6 flex flex-col space-y-4">
                  <button className="border-space-cadet py-2 px-4 text-center transition-all duration-300 rounded-2xl border border-red-600 hover:bg-red-600 hover:text-white bg-white font-bold">
                    <span>Signup</span>
                  </button>
                </div>
              </Link>
              <Link href="/login">
                <div className="mt-6 flex flex-col space-y-4">
                  <button className="border-space-cadet py-2 px-4 text-center transition-all duration-300 rounded-2xl border border-red-600 hover:bg-red-600 hover:text-white bg-white font-bold">
                    <span>Login</span>
                  </button>
                </div>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;