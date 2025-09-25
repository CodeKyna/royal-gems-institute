"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import { ShoppingCart, Search, Filter } from "lucide-react";

function page() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <section className="max-w-[164em] mx-auto flex items-start flex-col min-h-screen py-2 pt-[220px]">
        <div>
          <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-center">
            The Royal Gems Collection
          </h1>
        </div>
        {/* featured section */}
        <div className="flex w-full flex-col md:flex-row md:justify-between gap-10 mt-20 px-5">
          {/* left side on the featured section */}
          <div className="py-10 md:w-1/2 flex flex-col justify-center items-center text-center gap-5">
            <h1 className="font-sans font-bold text-3xl md-text-4xl lg:text-5xl ">
              This Month's Highlight
            </h1>
            <p className="font-mono text-2xl md:text-3xl lg:text-4xl py-5">
              Introducing our most celebrated piece — a masterpiece of
              craftsmanship and heritage. Designed with precision, ethically
              sourced gemstones, and a timeless aesthetic.
            </p>
            <p className="font-mono text-2xl md:text-3xl lg:text-4xl">
              Available for a limited time, this exclusive design embodies the
              artistry and authenticity of the Royal Gems Institute. Don’t miss
              the chance to own a true collector’s piece
            </p>
            <div className="flex justify-center py-10">
              <Button
                sx={{
                  bgcolor: "#6b46c1",
                  "&:hover": { bgcolor: "#9f7aea" },
                  fontSize: "1.5rem",
                  padding: "10px 30px",
                }}
                variant="contained"
                className="mt-5"
              >
                Own This Masterpiece
              </Button>
            </div>
          </div>

          {/* right side on the featured section */}
          <div className="flex justify-center items-center bg-gradient-to-br from-[rgb(145,134,157.0.5)] to-[rgb(255,255,255,0.1)] p-5 rounded-lg md:w-1/2 shadow-lg shadow-gray-400">
            <Image
              src="/lions-heart-necklace.png"
              alt="featured"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* filter gonna be applied here */}
      <section>
        <div className="max-w-[164em] mx-auto flex flex-col items-center py-10">
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl">
            Explore the Collection
          </h1>
        </div>
        <div className="bg-[#6b46c1] rounded-lg shadow-sm  p-6 mb-8 max-w-[164em] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-2"
              />
            </div>
          </div>
        </div>
        {/* add the dropdown filter of catagoriies  */}

        {/* adding scrolable to make the product later make sure to delete */}
        <div className="pt-[100px]"></div>
      </section>
    </div>
  );
}

export default page;
