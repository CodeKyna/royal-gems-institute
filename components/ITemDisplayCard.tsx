import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ITemDisplayCardProps {
  title?: string;
  image?: string;
  description?: string;
}

function ITemDisplayCard({ title, image, description }: ITemDisplayCardProps) {
  return (
    <motion.div
      className="p-4 border rounded-xl shadow-lg bg-[#BF8C93] 
                 flex flex-col items-center text-center 
                 sm:p-6 md:flex-row md:text-left md:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col items-center justify-space-between ">
        <h1 className="font-mono text-4xl sm:text-3xl md:text-4xl">
          {title ? title : "Default Title"}
        </h1>
        <Image
          src={image ? image : "/default-image.jpg"}
          alt="Item Image"
          width={300}
          height={400}
          className="rounded-lg object-cover w-full h-auto"
        />
        <p className="font-mono text-base sm:text-lg md:text-xl font-light mt-2">
          {description ? description : "Description of the item goes here."}
        </p>
      </div>
    </motion.div>
  );
}

export default ITemDisplayCard;
