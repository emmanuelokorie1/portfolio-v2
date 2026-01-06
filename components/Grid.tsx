"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { gridItems } from "@/data";
import { motion } from "framer-motion";

const Grid = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h1 className="heading mb-12">
          Peek into my <span className="text-purple">digital space</span>
        </h1>
        <BentoGrid className="w-full">
          {gridItems.map((item) => (
            <BentoGridItem
              id={item.id}
              key={item.id}
              description={item?.description}
              title={item?.title}
              className={item?.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  );
};

export default Grid;