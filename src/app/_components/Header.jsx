"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  // Safely parse the user from localStorage
  let user = null;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <header className="bg-gray-900 text-white p-4 md:p-6 shadow-md w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <div className="text-2xl md:text-3xl font-bold tracking-wide mb-4 md:mb-0 cursor-pointer">
            <span className="text-purple-500">Quizz</span>Wiz
          </div>
        </Link>
        {user === null ? (
          <nav className="space-x-20 md:space-x-6 flex flex-col md:flex-row">
            <Link
              href="/auth/student"
              className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 transition-colors duration-300 py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-0 shadow-lg"
            >
              Candidate Login/Signup
            </Link>
            <Link
              href="/auth/teacher"
              className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-md shadow-lg"
            >
              Examiner Login/Signup
            </Link>
          </nav>
        ) : (
          <nav className="mr-10">
            {user?.type === 0 ? (
              <Link
                href="/dashboard/student"
                className="hover:bg-white hover:text-purple-500 bg-purple-500 text-white transition-colors duration-300 py-2 px-8 rounded-md shadow-lg"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/dashboard/teacher"
                className="hover:bg-white hover:text-purple-500 bg-purple-500 text-white transition-colors duration-300 py-2 px-8 rounded-md shadow-lg"
              >
                Dashboard
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
