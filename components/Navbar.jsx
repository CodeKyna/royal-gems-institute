"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // variants for desktop links
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div>
      {/* Logo / Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center py-1"
      >
        <h1 className="font-sans font-title-max flex flex-col items-center justify-center">
          Royal
          <svg
            width="325"
            height="8"
            viewBox="0 0 325 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-2 w-3/4 md:w-[325px]"
          >
            <rect width="325" height="8" fill="#FFE100" />
          </svg>
          <span className="font-max"> Gems Institute</span>
        </h1>
      </motion.div>

      {/* Nav Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="bg-gradient-to-r from-[#2F4858] to-[#659BBE] w-full"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-4 flex items-center justify-between">
          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-8 font-nav">
            {[
              "Home",
              "Engagement Rings",
              "Wedding Rings",
              "Academy",
              "About",
            ].map((item, i) => (
              <motion.div
                key={item}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Link href="/" className="whitespace-nowrap">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Hamburger Button */}
          <button
            className="md:hidden flex items-center text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gradient-to-r from-[#2F4858] to-[#659BBE] px-4 pb-4 space-y-2 font-nav text-center flex flex-col"
            >
              <Link href="/">Home</Link>
              <Link href="/">Engagement Rings</Link>
              <Link href="/">Wedding Rings</Link>
              <Link href="/">Academy</Link>
              <Link href="/">About</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Navbar;
