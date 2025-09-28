// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Gem, ShoppingBag, Sparkles, Crown, Diamond } from "lucide-react";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { motion } from "framer-motion";
// import ExclusiveCard, { ExclusiveContent } from "@/components/ExclusiveCard";
// import ITemDisplayCard from "@/components/ITemDisplayCard";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// function Page() {
//   const [exclusiveContent, setExclusiveContent] = useState<ExclusiveContent[]>([
//     {
//       id: 1,
//       title: "Omnix",
//       description: "Awesome work",
//       image: "/ring-1.png",
//     },
//     {
//       id: 2,
//       title: "Gemify",
//       description: "Brilliant design",
//       image: "/ring-1.png",
//     },
//     {
//       id: 3,
//       title: "Sparkle",
//       description: "Shiny creation",
//       image: "/ring-1.png",
//     },
//   ]);
//   const router = useRouter();

//   const exploreBtnHandler = () => {
//     toast.success("Navigating to Collection Page!", { duration: 1500 });
//     setTimeout(() => {
//       router.push("/collection");
//     }, 1500);
//   };

//   return (
//     <div className="lg:h-screen lg:overflow-y-scroll lg:snap-y lg:snap-mandatory scroll-smooth hide-scrollbar relative">
//       {/* Floating background elements */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         {/* Animated geometric shapes */}
//         <motion.div
//           className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full blur-xl "
//           animate={{
//             scale: [1, 1.2, 1],
//             x: [0, 30, 0],
//             y: [0, -20, 0],
//           }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
//           animate={{
//             scale: [1, 0.8, 1],
//             x: [0, -25, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-300/15 to-blue-400/15 rounded-full blur-2xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//         />
//       </div>

//       {/* ===================== SECTION 1 ===================== */}
//       <section className="lg:h-screen lg:snap-start relative overflow-hidden pt-[16em]">
//         {/* Particle system with fixed positions */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[
//             10, 25, 40, 60, 75, 20, 85, 35, 55, 70, 15, 45, 80, 30, 65, 50, 90,
//             5, 72, 28,
//           ].map((left, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
//               style={{
//                 left: `${left}%`,
//                 top: `${(i * 37) % 100}%`,
//               }}
//               animate={{
//                 y: [0, -100, 0],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: (i % 3) + 2,
//                 repeat: Infinity,
//                 delay: (i % 4) * 0.5,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </div>

//         <div>
//           <section className="flex flex-col md:flex-row w-full">
//             {/* Left Section */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               viewport={{ once: true }}
//               className="relative w-full md:w-3/5 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-[50vh] md:min-h-[64em] flex flex-col justify-between px-8 py-20 overflow-hidden"
//             >
//               {/* Enhanced Background Lines with glow effects */}
//               <motion.div
//                 className="absolute top-0 left-0 w-[2px] h-[200%] bg-gradient-to-b from-amber-400 via-orange-400 to-red-400 rotate-45 shadow-[0_0_20px_#fbbf24]"
//                 initial={{ x: -150, opacity: 0.1 }}
//                 animate={{ x: 150, opacity: [0.3, 0.8, 0.3] }}
//                 transition={{
//                   duration: 12,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   ease: "easeInOut",
//                 }}
//               />
//               <motion.div
//                 className="absolute top-0 left-0 w-[1px] h-[200%] bg-gradient-to-b from-purple-400 via-pink-400 to-red-400 rotate-45 shadow-[0_0_15px_#a855f7]"
//                 initial={{ x: -200 }}
//                 animate={{ x: 200, opacity: [0.2, 0.6, 0.2] }}
//                 transition={{
//                   duration: 18,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   ease: "easeInOut",
//                 }}
//               />

//               {/* Additional diagonal light beams */}
//               <motion.div
//                 className="absolute top-1/4 left-0 w-[1px] h-[150%] bg-gradient-to-b from-cyan-400 to-blue-400 rotate-[30deg] shadow-[0_0_10px_#06b6d4]"
//                 animate={{
//                   opacity: [0, 0.5, 0],
//                   x: [0, 300],
//                 }}
//                 transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />

//               <div className="max-w-5xl ml-0 md:ml-36 relative z-10">
//                 {/* Enhanced accent bar with glow */}
//                 <motion.div
//                   className="relative mb-4"
//                   initial={{ opacity: 0, scaleX: 0 }}
//                   whileInView={{ opacity: 1, scaleX: 1 }}
//                   transition={{ duration: 1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="w-[110px] h-[6px] bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 shadow-[0_0_20px_#fbbf24] rounded-full" />
//                   <motion.div
//                     className="absolute inset-0 w-[110px] h-[6px] bg-gradient-to-r from-white to-amber-200 rounded-full"
//                     animate={{ opacity: [0, 0.8, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   />
//                 </motion.div>

//                 {/* Enhanced title with gradient text */}
//                 <motion.h1
//                   className="font-max font-sans font-black py-10 text-3xl md:text-6xl bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl leading-tight whitespace-nowrap"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                 >
//                   Master the Art of Gemalogy
//                   <span className="relative">
//                     gemology
//                     <motion.div
//                       className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-lg -z-10 rounded-lg"
//                       animate={{
//                         scale: [1, 1.05, 1],
//                         opacity: [0.3, 0.6, 0.3],
//                       }}
//                       transition={{
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     />
//                   </span>
//                 </motion.h1>
//               </div>

//               {/* Enhanced model image with multiple effects */}
//               <motion.div
//                 className="absolute bottom-0 right-0 w-3/4 md:w-[650px] h-auto"
//                 initial={{ opacity: 0, x: 20, scale: 0.9 }}
//                 whileInView={{ opacity: 1, x: 10, scale: 1 }}
//                 transition={{ duration: 1.5, ease: "easeOut" }}
//                 viewport={{ once: true }}
//               >
//                 {/* Glow effect behind image */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl rounded-full scale-110" />
//                 <Image
//                   src="/gem_girl_1.png"
//                   alt="model-gem"
//                   width={650}
//                   height={650}
//                   className="w-full h-auto relative z-10 drop-shadow-2xl"
//                   priority
//                 />
//                 {/* Sparkle effects around the image */}
//                 {[25, 45, 65, 35, 75, 15, 55, 85].map((top, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute w-2 h-2 bg-gradient-to-r from-white to-amber-400 rounded-full"
//                     style={{
//                       top: `${top}%`,
//                       left: `${20 + i * 15}%`,
//                     }}
//                     animate={{
//                       scale: [0, 1, 0],
//                       rotate: [0, 180, 360],
//                       opacity: [0, 1, 0],
//                     }}
//                     transition={{
//                       duration: 2 + (i % 2),
//                       repeat: Infinity,
//                       delay: (i % 3) * 0.5,
//                     }}
//                   />
//                 ))}
//               </motion.div>
//             </motion.div>

//             {/* Right Section */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               viewport={{ once: true }}
//               className="w-full md:w-2/5 flex flex-col justify-between relative"
//             >
//               <div className="text-xl md:text-2xl mb-4 bg-gradient-to-bl from-amber-100 via-orange-50 to-red-50 relative overflow-hidden">
//                 {/* Subtle background pattern */}
//                 <div className="absolute inset-0 opacity-5">
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#fbbf24_1px,_transparent_1px)] bg-[length:20px_20px]" />
//                 </div>

//                 {/* Enhanced Header */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                   viewport={{ once: true }}
//                   className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 py-10 md:py-10 px-6 md:px-12 relative"
//                 >
//                   <motion.div
//                     className="relative"
//                     animate={{ rotate: [0, 5, -5, 0] }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-60" />
//                     <Gem
//                       size={60}
//                       className="md:w-[90px] md:h-[90px] relative z-10 text-amber-600 drop-shadow-lg"
//                     />
//                   </motion.div>
//                   <motion.h1
//                     className="font-max font-mono text-center md:text-left md:text-3xl bg-gradient-to-r from-slate-800 to-amber-800 bg-clip-text text-transparent"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     Royal Gems <br />
//                     Institute
//                   </motion.h1>
//                 </motion.div>

//                 {/* Enhanced Paragraph */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                   viewport={{ once: true }}
//                   className="relative"
//                 >
//                   <p className="font-mono font-lite max-w-xl px-6 md:px-10 py-6 md:py-10 mx-auto text-center md:text-left text-base md:text-lg text-slate-700 leading-relaxed">
//                     Blending Sri Lanka's rich gemstone heritage with world-class
//                     training, Royal Gems Institute empowers you to master the
//                     art and science of gems.
//                   </p>
//                   {/* Subtle highlight effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent"
//                     initial={{ x: "-100%" }}
//                     animate={{ x: "100%" }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                       repeatDelay: 3,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 </motion.div>

//                 {/* Enhanced Buttons */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                   viewport={{ once: true }}
//                   className="relative"
//                 >
//                   <Stack
//                     spacing={{ xs: 2, md: 4 }}
//                     direction={{ xs: "column", md: "row" }}
//                     sx={{
//                       padding: "10px",
//                       margin: "0 auto",
//                       display: "flex",
//                       justifyContent: "center",
//                       maxWidth: "500px",
//                     }}
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.05, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="relative"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg blur opacity-60" />
//                       <Button
//                         variant="contained"
//                         sx={{
//                           fontSize: { xs: "1rem", md: "1.5rem" },
//                           padding: { xs: "12px 20px", md: "14px 28px" },
//                           background:
//                             "linear-gradient(45deg, #2F4858 30%, #3a5a6b 90%)",
//                           boxShadow: "0 8px 32px rgba(47, 72, 88, 0.3)",
//                           position: "relative",
//                           zIndex: 10,
//                         }}
//                         fullWidth
//                         onClick={() => exploreBtnHandler()}
//                       >
//                         Explore Collection
//                       </Button>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.05, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="relative"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg blur opacity-60" />
//                       <Button
//                         variant="contained"
//                         sx={{
//                           fontSize: { xs: "1rem", md: "1.5rem" },
//                           padding: { xs: "12px 20px", md: "14px 28px" },
//                           background:
//                             "linear-gradient(45deg, #D8A496 30%, #e6b5a8 90%)",
//                           boxShadow: "0 8px 32px rgba(216, 164, 150, 0.3)",
//                           position: "relative",
//                           zIndex: 10,
//                         }}
//                         fullWidth
//                       >
//                         Academy
//                       </Button>
//                     </motion.div>
//                   </Stack>
//                 </motion.div>
//               </div>

//               {/* Enhanced Cards Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 viewport={{ once: true }}
//                 className="text-lg md:text-xl relative"
//               >
//                 <div className="flex justify-center gap-6 relative">
//                   {/* Background glow for cards */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl blur-xl" />
//                   {exclusiveContent.map((card, index) => (
//                     <motion.div
//                       key={card.id}
//                       initial={{ opacity: 0, y: 30 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: index * 0.1 }}
//                       whileHover={{ y: -5, scale: 1.02 }}
//                     >
//                       <ExclusiveCard
//                         id={card.id}
//                         title={card.title}
//                         description={card.description}
//                         image={card.image}
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>
//           </section>
//         </div>
//       </section>

//       {/* ===================== SECTION 2 ===================== */}
//       <motion.section
//         className="lg:h-screen lg:snap-start pt-[168px] relative"
//         id="shop-section"
//         initial={{ opacity: 0, y: 80 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         {/* Animated background with multiple gradients */}
//         <div className="absolute inset-0">
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
//             animate={{
//               background: [
//                 "linear-gradient(45deg, #0f172a, #581c87, #312e81)",
//                 "linear-gradient(45deg, #1e293b, #7c2d92, #3730a3)",
//                 "linear-gradient(45deg, #0f172a, #581c87, #312e81)",
//               ],
//             }}
//             transition={{ duration: 10, repeat: Infinity }}
//           />

//           {/* Floating elements with fixed positions */}
//           {[15, 35, 55, 75, 25, 45, 65, 85, 20, 40, 60, 80, 10, 30, 50].map(
//             (left, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-2 h-2 bg-gradient-to-r from-white/60 to-purple-300/60 rounded-full"
//                 style={{
//                   left: `${left}%`,
//                   top: `${(i * 23) % 100}%`,
//                 }}
//                 animate={{
//                   y: [0, -50, 0],
//                   x: [0, i % 2 === 0 ? 25 : -25, 0],
//                   opacity: [0, 1, 0],
//                   scale: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: (i % 2) + 3,
//                   repeat: Infinity,
//                   delay: (i % 5) * 0.6,
//                   ease: "easeInOut",
//                 }}
//               />
//             )
//           )}
//         </div>

//         <section className="relative py-20 z-10">
//           <div className="max-w-[168em] mx-auto flex flex-col lg:flex-row items-center gap-16 px-4 md:px-10">
//             {/* Enhanced Left: Hero & Intro */}
//             <motion.div
//               className="w-full lg:w-1/2 flex flex-col items-start justify-center mb-12 lg:mb-0"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.div
//                 className="flex items-center gap-4 mb-6 relative"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <motion.div
//                   className="relative"
//                   animate={{ rotate: [0, 360] }}
//                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60" />
//                   <ShoppingBag
//                     size={48}
//                     className="text-purple-300 relative z-10 drop-shadow-lg"
//                   />
//                 </motion.div>
//                 <h2 className="font-max text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//                   Shop Exquisite Jewellery
//                 </h2>
//               </motion.div>

//               <motion.p
//                 className="font-mono text-lg md:text-xl text-purple-100 mb-8 leading-relaxed"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//               >
//                 Discover our curated collection of rings, necklaces, and
//                 earrings—each piece crafted to perfection for your most
//                 unforgettable moments.
//               </motion.p>

//               <motion.div
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//                 className="relative"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-60" />
//                 <Button
//                   variant="contained"
//                   sx={{
//                     fontSize: { xs: "1.1rem", md: "1.3rem" },
//                     padding: { xs: "14px 28px", md: "16px 40px" },
//                     background:
//                       "linear-gradient(45deg, #9D798F 30%, #b88ca0 90%)",
//                     color: "#fff",
//                     fontWeight: 700,
//                     borderRadius: "0.75rem",
//                     boxShadow: "0 8px 32px rgba(157, 121, 143, 0.4)",
//                     position: "relative",
//                     zIndex: 10,
//                     "&:hover": {
//                       background:
//                         "linear-gradient(45deg, #7c5e6b 30%, #8d6f7a 90%)",
//                     },
//                   }}
//                   onClick={() =>
//                     window.scrollTo({ top: 9999, behavior: "smooth" })
//                   }
//                   className="mt-2"
//                   startIcon={<Sparkles />}
//                 >
//                   Explore Full Collection
//                 </Button>
//               </motion.div>
//             </motion.div>

//             {/* Enhanced Right: Product Grid */}
//             <motion.div
//               className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 whileHover={{ scale: 1.02, y: -5 }}
//               >
//                 <ITemDisplayCard
//                   title="Omnix"
//                   image="/item-image.png"
//                   description="A beautiful gemstone necklace."
//                 />
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//                 whileHover={{ scale: 1.02, y: -5 }}
//               >
//                 <ITemDisplayCard
//                   title="Lunaria"
//                   image="/item-image.png"
//                   description="Elegant earrings for special occasions."
//                 />
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

//         {/* Bottom decorative elements */}
//         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/50 to-transparent" />
//         <motion.div
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//           animate={{ y: [0, -10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <Crown size={32} className="text-amber-400 opacity-60" />
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// }

// export default Page;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Gem,
  ShoppingBag,
  Sparkles,
  Crown,
  Diamond,
  Star,
  Globe,
  CheckCircle,
} from "lucide-react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import ExclusiveCard, { ExclusiveContent } from "@/components/ExclusiveCard";
import ITemDisplayCard from "@/components/ITemDisplayCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Page() {
  const [exclusiveContent, setExclusiveContent] = useState<ExclusiveContent[]>([
    {
      id: 1,
      title: "Omnix",
      description: "Awesome work",
      image: "/ring-1.png",
    },
    {
      id: 2,
      title: "Gemify",
      description: "Brilliant design",
      image: "/ring-1.png",
    },
    {
      id: 3,
      title: "Sparkle",
      description: "Shiny creation",
      image: "/ring-1.png",
    },
  ]);
  const router = useRouter();

  const exploreBtnHandler = () => {
    toast.success("Navigating to Collection Page!", { duration: 1500 });
    setTimeout(() => {
      router.push("/collection");
    }, 1500);
  };

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative lg:h-screen lg:overflow-y-scroll lg:snap-y  scroll-smooth hide-scrollbar">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -25, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-300/15 to-blue-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        {/* ===================== SECTION 1 ===================== */}
        <section className="min-h-screen relative overflow-hidden py-20 lg:snap-start pt-[16em]">
          {/* Particle system with fixed positions */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              10, 25, 40, 60, 75, 20, 85, 35, 55, 70, 15, 45, 80, 30, 65, 50,
              90, 5, 72, 28,
            ].map((left, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${(i * 37) % 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: (i % 3) + 2,
                  repeat: Infinity,
                  delay: (i % 4) * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="max-w-[168em] mx-auto px-4">
            <section className="flex flex-col md:flex-row w-full gap-8">
              {/* Left Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full md:w-3/5 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-[600px] flex flex-col justify-between px-8 py-20 overflow-hidden rounded-3xl"
              >
                {/* Enhanced Background Lines */}
                <motion.div
                  className="absolute top-0 left-0 w-[2px] h-[200%] bg-gradient-to-b from-amber-400 via-orange-400 to-red-400 rotate-45 shadow-[0_0_20px_#fbbf24]"
                  initial={{ x: -150, opacity: 0.1 }}
                  animate={{ x: 150, opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />

                <div className="max-w-5xl relative z-10">
                  {/* Enhanced accent bar */}
                  <motion.div
                    className="relative mb-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-[110px] h-[6px] bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 shadow-[0_0_20px_#fbbf24] rounded-full" />
                  </motion.div>

                  {/* Enhanced title */}
                  <motion.h1
                    className="font-black py-10 text-4xl md:text-6xl bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Master the art of{" "}
                    <motion.span className="relative bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent">
                      gemology
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-lg -z-10 rounded-lg"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.span>
                  </motion.h1>
                </div>

                {/* Model image */}
                <motion.div
                  className="absolute bottom-0 right-0 w-3/4 md:w-[500px] h-auto"
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 10, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl rounded-full scale-110" />
                  <Image
                    src="/gem_girl_1.png"
                    alt="model-gem"
                    width={600}
                    height={600}
                    className="w-full h-auto relative z-10 drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Redesigned Right Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full md:w-2/5 flex flex-col justify-between relative"
              >
                {/* Premium Heritage Card */}
                <motion.div
                  className="bg-gradient-to-br from-amber-50/95 via-orange-50/95 to-red-50/95 backdrop-blur-2xl rounded-3xl border border-amber-200/50 shadow-2xl overflow-hidden relative mb-8"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative p-8 text-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-16 h-16 mx-auto mb-6 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-60" />
                      <Crown
                        size={64}
                        className="relative z-10 text-amber-600 mx-auto"
                      />
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-amber-800 bg-clip-text text-transparent mb-4">
                      Royal Gems Institute
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6 rounded-full" />

                    <p className="text-2xl text-slate-700 leading-relaxed max-w-lg mx-auto mb-8">
                      Discover the ancient secrets of Sri Lankan gemstones,
                      where every stone tells a story of heritage,
                      craftsmanship, and timeless beauty.
                    </p>

                    {/* Premium Statistics */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { number: "2500+", label: "Precious Gems" },
                        { number: "50+", label: "Years Heritage" },
                        { number: "15K+", label: "Happy Clients" },
                      ].map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {stat.number}
                          </div>
                          <div className="text-sm text-slate-600 font-medium">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        onClick={() => exploreBtnHandler()}
                        className="flex-1 relative bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 overflow-hidden group"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Diamond size={20} />
                          Explore Gems
                        </span>
                      </motion.button>

                      <motion.button
                        className="flex-1 relative bg-gradient-to-r from-amber-500 to-orange-600 text-black px-6 py-4 rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 overflow-hidden group"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Sparkles size={20} />
                          Academy
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Featured Collections */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Featured Collections
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {exclusiveContent.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-xl overflow-hidden">
                        <div className="relative z-10 text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                            <Diamond size={24} className="text-white" />
                          </div>
                          <h4 className="text-white font-bold text-sm mb-1">
                            {card.title}
                          </h4>
                          <p className="text-slate-300 text-xs">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </section>

        {/* ===================== HERITAGE SECTION ===================== */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative lg:h-screen lg:snap-start flex items-center">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent mb-6">
                Treasures of Ceylon
              </h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                For over 2000 years, Sri Lanka has been the world's premier
                source of the finest sapphires, rubies, and precious gemstones.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: Crown,
                  title: "Royal Heritage",
                  description:
                    "Gems that have adorned crowns and kingdoms for millennia",
                  highlight: "2000+ Years",
                },
                {
                  icon: Diamond,
                  title: "World's Finest",
                  description:
                    "Home to the legendary Star of India and Blue Belle of Asia",
                  highlight: "Legendary Stones",
                },
                {
                  icon: Gem,
                  title: "Certified Authentic",
                  description:
                    "Every gem certified by international gemological institutes",
                  highlight: "100% Genuine",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden group-hover:bg-white/10 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={32} className="text-white" />
                    </div>

                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                      {item.highlight}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== SHOP SECTION ===================== */}
        <motion.section
          className="py-32 relative"
          id="shop-section"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" />

          <section className="relative py-20 z-10 lg:h-screen lg:snap-start flex items-center">
            <div className="max-w-[168em] mx-auto flex flex-col lg:flex-row items-center gap-16 px-4 md:px-10">
              {/* Left: Hero & Intro */}
              <motion.div
                className="w-full lg:w-1/2 flex flex-col items-start justify-center mb-12 lg:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6 relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Shop Exquisite Jewellery
                  </h2>
                </div>

                <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
                  Discover our curated collection of rings, necklaces, and
                  earrings—each piece crafted to perfection for your most
                  unforgettable moments.
                </p>

                <motion.button
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    exploreBtnHandler();
                  }}
                >
                  <Sparkles size={20} />
                  Explore Full Collection
                </motion.button>
              </motion.div>

              {/* Right: Product Grid */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ITemDisplayCard
                  title="Omnix"
                  image="/item-image.png"
                  description="A beautiful gemstone necklace."
                />
                <ITemDisplayCard
                  title="Lunaria"
                  image="/item-image.png"
                  description="Elegant earrings for special occasions."
                />
              </div>
            </div>
          </section>
        </motion.section>
      </div>
    </div>
  );
}

export default Page;
