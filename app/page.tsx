"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Gem, ShoppingBag } from "lucide-react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import ExclusiveCard, { ExclusiveContent } from "@/components/ExclusiveCard";
import ITemDisplayCard from "@/components/ITemDisplayCard";

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

  return (
    // 🔹 Added scroll container
    <div className="lg:h-screen lg:overflow-y-scroll lg:snap-y lg:snap-mandatory scroll-smooth hide-scrollbar">
      {/* ===================== SECTION 1 ===================== */}
      <section className="lg:h-screen lg:snap-start pt-[168px]">
        <div>
          <section className="flex flex-col md:flex-row w-full">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative w-full md:w-3/5 bg-animated min-h-[50vh] md:min-h-[64em] flex flex-col justify-between px-8 py-20 -z-50"
            >
              {/* Background Lines */}
              <motion.div
                className="absolute top-0 left-0 w-[2px] h-[200%] bg-[#FFE100]/30 rotate-45 -z-40"
                initial={{ x: -150, opacity: 0.1 }}
                animate={{ x: 150, opacity: 0.3 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-0 left-0 w-[1px] h-[200%] bg-[#FFE100]/20 rotate-45 -z-40"
                initial={{ x: -200 }}
                animate={{ x: 200 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />

              <div className="max-w-5xl ml-0 md:ml-36">
                <motion.svg
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  width="110"
                  height="6"
                  viewBox="0 0 110 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H110V6H0V0Z" fill="#FFE100" />
                </motion.svg>

                <h1 className="font-max font-sans font-black py-10 text-3xl md:text-5xl">
                  Master the art of gemology
                </h1>
              </div>

              <motion.div
                className="absolute bottom-0 right-0 w-3/4 md:w-[650px] h-auto -z-30"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 10 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Image
                  src="/gem_girl_1.png"
                  alt="model-gem"
                  width={650}
                  height={650}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full md:w-2/5 flex flex-col justify-between"
            >
              <div className="text-xl md:text-2xl mb-4 bg-gradient-to-bl from-[#A98F8A] to-[#433937]">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 py-10 md:py-10 px-6 md:px-12"
                >
                  <Gem size={60} className="md:w-[90px] md:h-[90px]" />
                  <h1 className="font-max font-mono text-center md:text-left md:text-3xl">
                    Royal Gems <br />
                    Institute
                  </h1>
                </motion.div>

                {/* Paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="font-mono font-lite max-w-xl px-6 md:px-10 py-6 md:py-10 mx-auto text-center md:text-left text-base md:text-lg"
                >
                  Blending Sri Lanka’s rich gemstone heritage with world-class
                  training, Royal Gems Institute empowers you to master the art
                  and science of gems.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Stack
                    spacing={{ xs: 2, md: 4 }}
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                      padding: "10px",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "center",
                      maxWidth: "500px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: { xs: "1rem", md: "1.5rem" },
                        padding: { xs: "8px 16px", md: "10px 20px" },
                        bgcolor: "#2F4858",
                      }}
                      fullWidth
                    >
                      Explore Collection
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: { xs: "1rem", md: "1.5rem" },
                        padding: { xs: "8px 16px", md: "10px 20px" },
                        bgcolor: "#D8A496",
                      }}
                      fullWidth
                    >
                      Academy
                    </Button>
                  </Stack>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl"
              >
                <div className=" flex justify-center gap-6">
                  {exclusiveContent.map((card) => (
                    <ExclusiveCard
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      description={card.description}
                      image={card.image}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </section>

      {/* ===================== SECTION 2 ===================== */}
      <motion.section
        className="lg:h-screen lg:snap-start pt-[168px]"
        id="shop-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }} // triggers when 30% is in view
      >
        <section className="px-4 md:px-8 lg:px-16 py-2 ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 max-w-4xl -ml-14 py-4 mt-8 bg-[#9D798F] rounded-md px-4">
            <ShoppingBag size={40} className="mx-auto sm:mx-0" />
            <h1 className="font-sans font-max text-center sm:text-left">
              Shop for jewelleries
            </h1>
          </div>

          {/* Content area */}
          <div className="max-w-[164em] mx-auto flex flex-col lg:flex-row mt-8">
            {/* Left side */}
            <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-8 lg:mb-0 relative">
              <div className="absolute inset-0 -z-30 bg-yellow-400 [clip-path:polygon(100%_20%,100%_0%,0%_80%,0%_100%)]"></div>
              <div className="p-10 rounded-md text-center lg:text-left flex  gap-4 justify-between ">
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
                <ITemDisplayCard
                  title="Solara"
                  image="/item-image.png"
                  description="A stunning ring that captures the light."
                />
              </div>
            </div>

            {/* Right side */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#96A9D7] to-[#4F5971] flex flex-col items-center px-4 lg:px-8 py-12 rounded-md">
              <h1 className="font-mono font-max text-center  md:text-3xl py-6">
                SHOP NOW
              </h1>
              <p className="font-mono font-lite text-left max-w-md">
                Your journey to owning extraordinary gemstones begins here.
                Browse our stunning collection of rings, necklaces, and custom
                pieces, all designed to make every moment unforgettable.
              </p>
            </div>
          </div>
        </section>
      </motion.section>
    </div>
  );
}

export default Page;
