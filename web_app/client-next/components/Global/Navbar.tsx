"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = () => {
    console.log("Signing out...");
    // Add sign-out logic here
  };

  return (
    <nav className="flex items-center justify-between px-8 py-0 shadow-md bg-white">
      {/* Left Side: Logo */}
      <div className="text-xl font-bold">
        <Link href="/">
          <img
            src="/logo.png" // Replace with the path to your logo image
            alt="Logo"
            className="w-12 h-12 object-contain" // Adjust size as needed
          />
        </Link>
      </div>

      {/* Center: Links */}
      <div className="space-x-6">
        <Link href="/" className="text-gray-800 hover:text-blue-600">
            Dashboard
        </Link>
        <Link href="/workout_section" className="text-gray-800 hover:text-blue-600">
            Workouts section
        </Link>
        <Link href="/" className="text-gray-800 hover:text-blue-600">
            Food section
        </Link>
        <Link href="/" className="text-gray-800 hover:text-blue-600">
            Community section
        </Link>
      </div>

      {/* Right Side: User Avatar */}
      <div className="relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          <img
            src="/avatar-placeholder.png" // Replace with user's avatar URL
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
            <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Edit Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
