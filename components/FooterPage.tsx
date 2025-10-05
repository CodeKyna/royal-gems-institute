// "use client";
// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
//   Crown,
//   Diamond,
//   Gem,
//   Sparkles,
//   Award,
//   Globe,
//   ArrowUp,
//   Heart,
// } from "lucide-react";

// const Footer = () => {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const footerLinks = {
//     collections: [
//       { name: "Engagement Rings", href: "/collections/engagement" },
//       { name: "Wedding Bands", href: "/collections/wedding" },
//       { name: "Necklaces", href: "/collections/necklaces" },
//       { name: "Earrings", href: "/collections/earrings" },
//       { name: "Bracelets", href: "/collections/bracelets" },
//       { name: "Gemstones", href: "/collections/gemstones" },
//     ],
//     services: [
//       { name: "Custom Design", href: "/services/custom-design" },
//       { name: "Appraisal Services", href: "/services/appraisal" },
//       { name: "Repair & Restoration", href: "/services/repair" },
//       { name: "Certification", href: "/services/certification" },
//       { name: "Consultation", href: "/services/consultation" },
//       { name: "Investment Gems", href: "/services/investment" },
//     ],
//     academy: [
//       { name: "Gemology Courses", href: "/academy/gemology" },
//       { name: "Jewelry Design", href: "/academy/design" },
//       { name: "Appraisal Training", href: "/academy/appraisal" },
//       { name: "Online Learning", href: "/academy/online" },
//       { name: "Certification Programs", href: "/academy/certification" },
//       { name: "Workshops", href: "/academy/workshops" },
//     ],
//     company: [
//       { name: "About Us", href: "/about" },
//       { name: "Our Story", href: "/story" },
//       { name: "Careers", href: "/careers" },
//       { name: "Press", href: "/press" },
//       { name: "Sustainability", href: "/sustainability" },
//       { name: "Contact", href: "/contact" },
//     ],
//   };

//   const socialLinks = [
//     {
//       icon: Facebook,
//       href: "https://facebook.com/royalgemsinstitute",
//       color: "hover:text-blue-400",
//     },
//     {
//       icon: Instagram,
//       href: "https://instagram.com/royalgemsinstitute",
//       color: "hover:text-pink-400",
//     },
//     {
//       icon: Twitter,
//       href: "https://twitter.com/royalgems_lk",
//       color: "hover:text-blue-300",
//     },
//     {
//       icon: Youtube,
//       href: "https://youtube.com/royalgemsinstitute",
//       color: "hover:text-red-400",
//     },
//   ];

//   return (
//     <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Floating orbs */}
//         <motion.div
//           className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-amber-400/8 to-orange-500/8 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-l from-purple-400/8 to-pink-500/8 rounded-full blur-2xl "
//           animate={{
//             scale: [1, 0.7, 1],
//             x: [0, -40, 0],
//             y: [0, 60, 0],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Floating particles */}
//         {[15, 35, 55, 75, 25, 45, 65, 85, 20, 40, 60, 80].map((left, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
//             style={{
//               left: `${left}%`,
//               top: `${(i * 25) % 100}%`,
//             }}
//             animate={{
//               y: [0, -50, 0],
//               opacity: [0, 1, 0],
//               scale: [0, 1, 0],
//             }}
//             transition={{
//               duration: (i % 3) + 4,
//               repeat: Infinity,
//               delay: (i % 4) * 0.8,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10">
//         {/* Main Footer Content */}
//         <div className="max-w-[168em] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//             {/* Company Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="lg:col-span-1"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <motion.div
//                   animate={{ rotate: [0, 360] }}
//                   transition={{
//                     duration: 20,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                 >
//                   <Crown size={32} className="text-amber-400" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
//                     Royal Gems
//                   </h3>
//                   <p className="text-amber-400 text-sm font-medium">
//                     Institute
//                   </p>
//                 </div>
//               </div>

//               <p className="text-slate-300 leading-relaxed mb-6">
//                 Sri Lanka's premier gemstone institute, blending 2000 years of
//                 heritage with world-class expertise in gems, jewelry, and
//                 education.
//               </p>

//               {/* Contact Information */}
//               <div className="space-y-4">
//                 <motion.div
//                   className="flex items-start gap-3 group cursor-pointer"
//                   whileHover={{ x: 5 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <MapPin
//                     size={18}
//                     className="text-amber-400 mt-0.5 group-hover:text-amber-300 transition-colors"
//                   />
//                   <div>
//                     <p className="text-white font-medium">Head Office</p>
//                     <p className="text-slate-400 text-sm">
//                       123 Galle Road, Colombo 03, Sri Lanka
//                     </p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   className="flex items-center gap-3 group cursor-pointer"
//                   whileHover={{ x: 5 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Phone
//                     size={18}
//                     className="text-amber-400 group-hover:text-amber-300 transition-colors"
//                   />
//                   <div>
//                     <p className="text-white font-medium">+94 11 234 5678</p>
//                     <p className="text-slate-400 text-sm">Mon-Sat 9AM-6PM</p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   className="flex items-center gap-3 group cursor-pointer"
//                   whileHover={{ x: 5 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Mail
//                     size={18}
//                     className="text-amber-400 group-hover:text-amber-300 transition-colors"
//                   />
//                   <div>
//                     <p className="text-white font-medium">info@royalgems.lk</p>
//                     <p className="text-slate-400 text-sm">
//                       Quick response guaranteed
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Certifications */}
//               <div className="mt-8">
//                 <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
//                   <Award size={18} className="text-amber-400" />
//                   Certifications
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {["GIA", "SSEF", "Gübelin", "AIGS"].map((cert, i) => (
//                     <div
//                       key={cert}
//                       className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-slate-300 text-sm border border-white/20"
//                     >
//                       {cert}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Navigation Links */}
//             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
//               {/* Collections */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.1 }}
//               >
//                 <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                   <Diamond size={20} className="text-purple-400" />
//                   Collections
//                 </h4>
//                 <ul className="space-y-3">
//                   {footerLinks.collections.map((link, i) => (
//                     <motion.li
//                       key={i}
//                       whileHover={{ x: 5 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Link
//                         href={link.href}
//                         className="text-slate-400 hover:text-amber-300 transition-colors duration-200 flex items-center gap-2 group"
//                       >
//                         <Sparkles
//                           size={12}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400"
//                         />
//                         {link.name}
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>

//               {/* Services */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                   <Gem size={20} className="text-emerald-400" />
//                   Services
//                 </h4>
//                 <ul className="space-y-3">
//                   {footerLinks.services.map((link, i) => (
//                     <motion.li
//                       key={i}
//                       whileHover={{ x: 5 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Link
//                         href={link.href}
//                         className="text-slate-400 hover:text-amber-300 transition-colors duration-200 flex items-center gap-2 group"
//                       >
//                         <Sparkles
//                           size={12}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400"
//                         />
//                         {link.name}
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>

//               {/* Academy & Company */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 className="space-y-8"
//               >
//                 {/* Academy */}
//                 <div>
//                   <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                     <Globe size={20} className="text-blue-400" />
//                     Academy
//                   </h4>
//                   <ul className="space-y-3">
//                     {footerLinks.academy.slice(0, 4).map((link, i) => (
//                       <motion.li
//                         key={i}
//                         whileHover={{ x: 5 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <Link
//                           href={link.href}
//                           className="text-slate-400 hover:text-amber-300 transition-colors duration-200 flex items-center gap-2 group"
//                         >
//                           <Sparkles
//                             size={12}
//                             className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400"
//                           />
//                           {link.name}
//                         </Link>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Company */}
//                 <div>
//                   <h4 className="text-xl font-bold text-white mb-6">Company</h4>
//                   <ul className="space-y-3">
//                     {footerLinks.company.slice(0, 4).map((link, i) => (
//                       <motion.li
//                         key={i}
//                         whileHover={{ x: 5 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <Link
//                           href={link.href}
//                           className="text-slate-400 hover:text-amber-300 transition-colors duration-200 flex items-center gap-2 group"
//                         >
//                           <Sparkles
//                             size={12}
//                             className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400"
//                           />
//                           {link.name}
//                         </Link>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Newsletter Subscription */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="mt-16 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 relative overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5" />

//             <div className="relative z-10 text-center max-w-2xl mx-auto">
//               <h4 className="text-2xl font-bold text-white mb-2">
//                 Stay Connected
//               </h4>
//               <p className="text-slate-300 mb-6">
//                 Subscribe to receive exclusive offers, gemstone insights, and
//                 updates from the world of precious stones.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
//                 />
//                 <motion.button
//                   className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-xl font-bold hover:from-amber-400 hover:to-orange-500 transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Subscribe
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//               {/* Copyright */}
//               <div className="text-slate-400 text-sm text-center md:text-left">
//                 <p>© 2024 Royal Gems Institute. All rights reserved.</p>
//                 <p className="mt-1">
//                   Crafted with{" "}
//                   <Heart size={12} className="inline text-red-400" /> in Sri
//                   Lanka
//                 </p>
//               </div>

//               {/* Social Media */}
//               <div className="flex items-center gap-4">
//                 {socialLinks.map((social, i) => (
//                   <motion.a
//                     key={i}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 border border-white/20`}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <social.icon size={18} />
//                   </motion.a>
//                 ))}
//               </div>

//               {/* Legal Links */}
//               <div className="flex items-center gap-6 text-sm text-slate-400">
//                 <Link
//                   href="/privacy"
//                   className="hover:text-amber-300 transition-colors"
//                 >
//                   Privacy Policy
//                 </Link>
//                 <Link
//                   href="/terms"
//                   className="hover:text-amber-300 transition-colors"
//                 >
//                   Terms of Service
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll to Top Button */}
//         <motion.button
//           onClick={scrollToTop}
//           className="fixed bottom-8 left-28 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full flex items-center justify-center shadow-2xl hover:from-amber-400 hover:to-orange-500 transition-all duration-300 z-50"
//           whileHover={{ scale: 1.1, y: -2 }}
//           whileTap={{ scale: 0.95 }}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1 }}
//         >
//           <ArrowUp size={20} />
//         </motion.button>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Crown,
  Diamond,
  Gem,
  Sparkles,
  Award,
  Globe,
  ArrowUp,
  Heart,
  Star,
} from "lucide-react";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document
        .getElementById("footer-container")
        ?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const footerElement = document.getElementById("footer-container");
    footerElement?.addEventListener("mousemove", handleMouseMove);
    return () =>
      footerElement?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    collections: [
      { name: "Engagement Rings", href: "/collections/engagement" },
      { name: "Wedding Bands", href: "/collections/wedding" },
      { name: "Necklaces", href: "/collections/necklaces" },
      { name: "Earrings", href: "/collections/earrings" },
      { name: "Bracelets", href: "/collections/bracelets" },
      { name: "Gemstones", href: "/collections/gemstones" },
    ],
    services: [
      { name: "Custom Design", href: "/services/custom-design" },
      { name: "Appraisal Services", href: "/services/appraisal" },
      { name: "Repair & Restoration", href: "/services/repair" },
      { name: "Certification", href: "/services/certification" },
      { name: "Consultation", href: "/services/consultation" },
      { name: "Investment Gems", href: "/services/investment" },
    ],
    academy: [
      { name: "Gemology Courses", href: "/academy/gemology" },
      { name: "Jewelry Design", href: "/academy/design" },
      { name: "Appraisal Training", href: "/academy/appraisal" },
      { name: "Online Learning", href: "/academy/online" },
      { name: "Certification Programs", href: "/academy/certification" },
      { name: "Workshops", href: "/academy/workshops" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Contact", href: "/contact" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/royalgemsinstitute",
      color: "hover:text-blue-400",
      name: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/royalgemsinstitute",
      color: "hover:text-pink-400",
      name: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/royalgems_lk",
      color: "hover:text-blue-300",
      name: "Twitter",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/royalgemsinstitute",
      color: "hover:text-red-400",
      name: "YouTube",
    },
  ];

  return (
    <motion.footer
      id="footer-container"
      style={{ y }}
      className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Mouse Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(255, 215, 0, 0.06) 0%, 
            rgba(255, 165, 0, 0.03) 25%, 
            rgba(128, 0, 128, 0.02) 50%, 
            transparent 70%)`,
        }}
      />

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mega Floating Orbs */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-gradient-to-r from-amber-400/10 via-orange-500/8 to-red-500/6 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.4, 0.8],
            x: [0, 80, 0],
            y: [0, -60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-[35rem] h-[35rem] bg-gradient-to-l from-purple-400/12 via-pink-500/10 to-indigo-600/8 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 0.6, 1.2],
            x: [0, -100, 0],
            y: [0, 80, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Prismatic Light Beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-amber-400/40 via-transparent to-transparent"
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0.5, 2, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-purple-400/30 via-transparent to-transparent"
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Constellation Effect */}
        {Array.from({ length: 25 }).map((_, i) => {
          // Use deterministic positioning based on index
          const leftPos = (i * 37) % 100;
          const topPos = (i * 23 + 17) % 100;
          const duration = (i % 5) + 6;
          const delay = (i % 8) * 0.6;

          return (
            <motion.div
              key={i}
              className="absolute w-0.3 h-0.3 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1.5, 1, 1.5, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Animated Geometric Patterns */}
        <motion.div
          className="absolute top-1/4 left-1/2 w-40 h-40 border border-amber-400/20 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-purple-400/30 rounded-full"
          animate={{
            rotate: [0, -360],
            scale: [0.8, 1.5, 0.8],
            borderWidth: ["1px", "3px", "1px"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-[140em] mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Enhanced Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-1 relative"
            >
              {/* Glowing Background for Logo Section */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-amber-400/10 to-purple-400/10 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="relative"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Crown size={40} className="text-amber-400" />
                    <motion.div
                      className="absolute inset-0 text-amber-400"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Crown size={40} />
                    </motion.div>
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3.2rem font-bold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent"
                      whileHover={{
                        backgroundImage:
                          "linear-gradient(45deg, #ffffff, #fbbf24, #f59e0b, #ffffff)",
                      }}
                    >
                      Royal Gems
                    </motion.h3>
                    <motion.p
                      className="text-amber-400 text-1.6rem font-medium"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(251, 191, 36, 0.5)",
                          "0 0 20px rgba(251, 191, 36, 0.8)",
                          "0 0 5px rgba(251, 191, 36, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Institute
                    </motion.p>
                  </div>
                </div>

                <motion.p
                  className="text-slate-300 leading-relaxed mb-8 text-1.8rem"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Sri Lanka&apos;s premier gemstone institute, blending 2000
                  years of heritage with world-class expertise in gems, jewelry,
                  and education.
                </motion.p>

                {/* Enhanced Contact Information */}
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Head Office",
                      content: "123 Galle Road, Colombo 03, Sri Lanka",
                      color: "text-amber-400",
                    },
                    {
                      icon: Phone,
                      title: "+94 11 234 5678",
                      content: "Mon-Sat 9AM-6PM",
                      color: "text-emerald-400",
                    },
                    {
                      icon: Mail,
                      title: "info@royalgems.lk",
                      content: "Quick response guaranteed",
                      color: "text-blue-400",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
                      whileHover={{ x: 8, scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon
                          size={22}
                          className={`${item.color} mt-1 group-hover:drop-shadow-lg transition-all`}
                        />
                      </motion.div>
                      <div>
                        <p className="text-white font-medium text-1.8rem">
                          {item.title}
                        </p>
                        <p className="text-slate-400 text-1.4rem">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Certifications */}
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h4 className="text-white font-semibold mb-6 flex items-center gap-3 text-2rem">
                    <Award size={20} className="text-amber-400" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["GIA", "SSEF", "Gübelin", "AIGS"].map((cert, i) => (
                      <motion.div
                        key={cert}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-slate-300 text-1.4rem border border-white/20 cursor-pointer"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(251, 191, 36, 0.5)",
                          boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        {cert}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Navigation Links */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Collections */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <h4 className="text-2.4rem font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Diamond size={24} className="text-purple-400" />
                  </motion.div>
                  Collections
                </h4>
                <ul className="space-y-4">
                  {footerLinks.collections.map((link, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 8, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-slate-400 hover:text-amber-300 transition-all duration-300 flex items-center gap-3 group text-1.6rem p-2 rounded-lg hover:bg-white/5"
                        whileHover={{
                          textShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sparkles size={14} className="text-amber-400" />
                        </motion.div>
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-l from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.4, 0.9, 0.4],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <h4 className="text-2.4rem font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Gem size={24} className="text-emerald-400" />
                  </motion.div>
                  Services
                </h4>
                <ul className="space-y-4">
                  {footerLinks.services.map((link, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 8, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-slate-400 hover:text-amber-300 transition-all duration-300 flex items-center gap-3 group text-1.6rem p-2 rounded-lg hover:bg-white/5"
                        whileHover={{
                          textShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sparkles size={14} className="text-amber-400" />
                        </motion.div>
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Academy & Company */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-12 relative"
              >
                <motion.div
                  className="absolute top-0 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
                  animate={{
                    x: [-20, 20, -20],
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Academy */}
                <div className="relative z-10">
                  <h4 className="text-2.4rem font-bold text-white mb-8 flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Globe size={24} className="text-blue-400" />
                    </motion.div>
                    Academy
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks.academy.slice(0, 4).map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 8, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                      >
                        <motion.a
                          href={link.href}
                          className="text-slate-400 hover:text-amber-300 transition-all duration-300 flex items-center gap-3 group text-1.6rem p-2 rounded-lg hover:bg-white/5"
                          whileHover={{
                            textShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Sparkles size={14} className="text-amber-400" />
                          </motion.div>
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="relative z-10">
                  <h4 className="text-2.4rem font-bold text-white mb-8 flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Star size={24} className="text-yellow-400" />
                    </motion.div>
                    Company
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks.company.slice(0, 4).map((link, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 8, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                      >
                        <motion.a
                          href={link.href}
                          className="text-slate-400 hover:text-amber-300 transition-all duration-300 flex items-center gap-3 group text-1.6rem p-2 rounded-lg hover:bg-white/5"
                          whileHover={{
                            textShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Sparkles size={14} className="text-amber-400" />
                          </motion.div>
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
          >
            {/* Enhanced Background Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/8 to-blue-500/10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Floating Elements */}
            {Array.from({ length: 8 }).map((_, i) => {
              // Use deterministic positioning based on index
              const leftPos = (i * 29 + 11) % 100;
              const topPos = (i * 41 + 7) % 100;
              const duration = 4 + (i % 3);
              const delay = (i % 4) * 0.8;
              const xOffset = i % 2 === 0 ? 20 : -20;

              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400/40 rounded-full"
                  style={{
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, xOffset, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h4
                className="text-3.2rem font-bold text-white mb-3"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 40px rgba(251, 191, 36, 0.8)",
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Stay Connected
              </motion.h4>
              <motion.p
                className="text-slate-300 mb-10 text-1.8rem leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Subscribe to receive exclusive offers, gemstone insights, and
                updates from the world of precious stones.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-1.6rem backdrop-blur-sm"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)",
                  }}
                />
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-2xl font-bold hover:from-amber-400 hover:to-orange-500 transition-all duration-300 text-1.6rem relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(251, 191, 36, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Subscribe</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[120em] mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Enhanced Copyright */}
              <motion.div
                className="text-slate-400 text-1.4rem text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p>© 2024 Royal Gems Institute. All rights reserved.</p>
                <motion.div
                  className="mt-1 flex items-center justify-center md:justify-start gap-1"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Crafted with{" "}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart size={14} className="text-red-400" />
                  </motion.div>{" "}
                  in Kynasoft - Kanchana , Deshan
                </motion.div>
              </motion.div>

              {/* Enhanced Social Media */}
              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 border border-white/20 relative overflow-hidden group`}
                    whileHover={{
                      scale: 1.2,
                      y: -4,
                      boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-purple-400/20 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon size={20} className="relative z-10" />

                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-full"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.a>
                ))}
              </motion.div>

              {/* Enhanced Legal Links */}
              <motion.div
                className="flex items-center gap-8 text-1.4rem text-slate-400"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.a
                  href="/privacy"
                  className="hover:text-amber-300 transition-all duration-300 relative"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
                  }}
                >
                  Privacy Policy
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-amber-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <motion.a
                  href="/terms"
                  className="hover:text-amber-300 transition-all duration-300 relative"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
                  }}
                >
                  Terms of Service
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-amber-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll to Top Button */}
        <AnimatePresence>
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-12 left-12 w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full flex items-center justify-center shadow-2xl hover:from-amber-400 hover:to-orange-500 transition-all duration-300 z-50  overflow-hidden group"
            whileHover={{
              scale: 1.15,
              y: -6,
              boxShadow: "0 20px 50px rgba(251, 191, 36, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-amber-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Shimmering Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%", skewX: -20 }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />

            <motion.div
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp size={24} className="relative z-10" />
            </motion.div>
          </motion.button>
        </AnimatePresence>

        {/* Magical Particle System for Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => {
                // Use deterministic positioning based on index
                const leftPos = (i * 43 + 13) % 100;
                const topPos = (i * 31 + 19) % 100;
                const xOffset = i % 2 === 0 ? 50 : -50;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      y: [0, -100],
                      x: [0, xOffset],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
};

export default Footer;
