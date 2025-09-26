"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sparkles, Diamond, Crown } from "lucide-react";

function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Don't render navbar on admin routes
  if (isAdminRoute) {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items with icons
  const navItems = [
    { name: "Home", href: "/", icon: <Crown size={16} /> },
    {
      name: "Engagement Rings",
      href: "/engagement",
      icon: <Diamond size={16} />,
    },
    { name: "Wedding Rings", href: "/wedding", icon: <Sparkles size={16} /> },
    { name: "Academy", href: "/academy", icon: <Diamond size={16} /> },
    { name: "About", href: "/about", icon: <Crown size={16} /> },
  ];

  // Variants for animations
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 },
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      {/* Navbar Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl"
            : "bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900"
        }`}
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-2xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-l from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Subtle animated line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
            animate={{
              width: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Logo Section */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className="text-center py-4 relative z-10"
        >
          <motion.h1
            className="font-sans font-title-max flex flex-col items-center justify-center relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="text-2xl md:text-7xl font-bold bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Royal
            </motion.span>

            {/* Enhanced SVG line with animation */}
            <motion.div
              className="my-2 relative"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              <svg
                width="325"
                height="8"
                viewBox="0 0 325 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3/4 md:w-[325px] drop-shadow-lg"
              >
                <defs>
                  <linearGradient
                    id="goldGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FFE100" />
                    <stop offset="50%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FFE100" />
                  </linearGradient>
                </defs>
                <rect width="325" height="8" fill="url(#goldGradient)" rx="4" />
              </svg>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-amber-400/50 blur-sm rounded-full" />

              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.span
              className="text-xl md:text-5xl font-bold bg-gradient-to-r from-slate-200 via-white to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Gems Institute
            </motion.span>

            {/* Decorative sparkles */}
            <motion.div
              className="absolute -top-2 -right-4"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles size={16} className="text-amber-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-4"
              animate={{
                rotate: [360, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Diamond size={14} className="text-purple-300" />
            </motion.div>
          </motion.h1>
        </motion.div>

        {/* Navigation Bar */}
        <div className="max-w-[168em] mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-4 flex items-center justify-between md:justify-center relative z-10">
          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-8 font-nav">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={i}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 relative px-3 py-2 rounded-lg"
                >
                  {/* Background glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    layoutId="navHover"
                  />

                  <motion.div
                    className="relative flex items-center gap-2 px-0.5"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-amber-400 group-hover:text-amber-300 transition-colors">
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap font-medium">
                      {item.name}
                    </span>
                  </motion.div>

                  {/* Underline animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Enhanced Hamburger Button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.15)" }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-t border-white/10 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />

              <div className="px-4 pb-4 space-y-1 font-nav relative z-10">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/90 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-amber-400 group-hover:text-amber-300 transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>

                      {/* Hover arrow */}
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Spacer with dynamic height */}
      <motion.div
        className={`transition-all duration-300 ${
          scrolled ? "pt-20" : "pt-32"
        }`}
        animate={{
          paddingTop: scrolled ? "5rem" : "8rem",
        }}
      />
    </div>
  );
}

export default Navbar;
