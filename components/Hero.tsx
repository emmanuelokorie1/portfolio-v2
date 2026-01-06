"use client";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";
import { email, linkedin, name, role } from "@/data";
import { FaEnvelope, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "./ui/ContactModal";

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-20 pt-36 black-gradient" id="home">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="purple"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="white"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex justify-center relative s500:mt-20 mt-5 z-10"
      >
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="tracking-widest uppercase text-xs text-center text-blue-100 max-w-80 md:max-w-full ">
            {" "}
            More Than Just Code — I Take Ownership
          </h2>

          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Transforming Visions into Reality with Complete Project Ownership"
          />
          {/* Web and Mobile frontend developer */}
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi, I&rsquo;m {name}, a {role} based in Lagos. I don&rsquo;t just
            deliver code; I own the outcome, ensuring your projects are scalable,
            user-centric, and successful.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-8">
            <MagicButton
              title="Contact Me"
              icon={<FaEnvelope />}
              position="right"
              handleClick={() => setIsModalOpen(true)}
            />

            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-full">
              <MagicButton
                title="Connect Via LinkedIn"
                icon={<FaLinkedin />}
                position="right"
                otherClasses="!bg-[#161a31] whitespace-nowrap"
              />
            </a>
          </div>
        </div>
      </motion.div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Hero;
