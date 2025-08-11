"use client";

import Link from "next/link";
import { useState } from "react";

import { FiMenu, FiX, FiHome, FiStar, FiLogIn } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (pathname.includes("/dashboard") || pathname.includes("/admin")) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Text Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Utility<span className="text-orange-700">Apps</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-primary transition"
          >
            <FiHome className="mr-1" /> Home
          </Link>
          {/* <Link
            href="/features"
            className="flex items-center text-gray-600 hover:text-primary transition"
          >
            <FiStar className="mr-1" /> Features
          </Link> */}
          {isSignedIn ? (
            <Link href="/dashboard">
              <Button variant="default" className="ml-4 cursor-pointer">
                <FiLogIn className="mr-2" /> Dashboard
              </Button>
            </Link>
          ) : (
            // <Link href="/sign-in">
            //   <Button variant="default" className="ml-4 cursor-pointer">
            //     <FiLogIn className="mr-2" /> Login
            //   </Button>
            // </Link>
            <></>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-primary transition p-2"
                onClick={toggleMenu}
              >
                <FiHome className="mr-2" /> Home
              </Link>
              <Link
                href="#"
                className="flex items-center text-gray-600 hover:text-primary transition p-2"
                onClick={toggleMenu}
              >
                <FiStar className="mr-2" /> Features
              </Link>
              <Link href="/login">
                <Button
                  variant="default"
                  className="w-full mt-2 cursor-pointer"
                >
                  <FiLogIn className="mr-2" /> Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
