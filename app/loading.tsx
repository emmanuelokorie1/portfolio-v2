"use client";
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute h-24 w-24 rounded-full border-t-4 border-l-4 border-purple-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="h-16 w-16 rounded-full bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 font-medium tracking-widest text-sm uppercase"
        >
          Loading
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
