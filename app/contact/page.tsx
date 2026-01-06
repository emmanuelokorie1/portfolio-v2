"use client";

import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { email, socialMedia, navItems } from "@/data";
import MagicButton from "@/components/ui/MagicButton";
import { FloatingNav } from "@/components/ui/FloatingNav";
import MobileNav from "@/components/MobileNav";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import Image from "next/image";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // ... state logic remains same ...

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ... handleSubmit and helpers remain same ...
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Portfolio Inquiry",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSocialName = (id: number) => {
    switch (id) {
      case 1: return "GitHub";
      case 2: return "WhatsApp";
      case 3: return "LinkedIn";
      default: return "Social";
    }
  };
  
  const getSocialCta = (id: number) => {
    switch (id) {
      case 1: return "Explore Code";
      case 2: return "Chat on WhatsApp";
      case 3: return "Connect on LinkedIn";
      default: return "Connect";
    }
  };

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
      <div className="max-w-7xl w-full relative">
        <FloatingNav navItems={navItems} />
        <div className="block md:hidden">
          <MobileNav />
        </div>

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

        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center pointer-events-none">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="relative z-10 w-full mt-32 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left Section: Info */}
            <div className="flex flex-col gap-3">
              <TextGenerateEffect
                words="Let's build something extraordinary together"
                className="text-left text-[30px] md:text-4xl lg:text-5xl"
              />
              <p className="text-white-200 text-lg md:text-xl">
                 Whether you have a groundbreaking idea or need to elevate your current platform, I&apos;m here to help you achieve your goals with precision and creativity.
              </p>

              {/* Email Card */}
              <a 
                href={`mailto:${email}`}
                className="mt-4 p-6 rounded-2xl bg-[#10132E] border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition"
              >
                <div className="w-12 h-12 rounded-full bg-black-200 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-purple"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Email</p>
                  <p className="text-white-200 text-sm sm:text-base break-all">
                    {email}
                  </p>
                </div>
              </a>

               {/* Social Cards */}
               {socialMedia.map((social) => (
                <a 
                  key={social.id} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-[#10132E] border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-black-200 flex items-center justify-center shrink-0">
                    <Image src={social.img} alt="icon" width={24} height={24} />
                  </div>
                  <div>
                     <p className="text-white font-semibold text-lg">{getSocialName(social.id)}</p>
                     <p className="text-white-200">
                      {getSocialCta(social.id)}
                    </p>
                  </div>
                </a>
               ))}
            </div>

            {/* Right Section: Form */}
            <div className="bg-[#10132E] border border-white/10 p-8 rounded-3xl w-full shadow-2xl relative">
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-white-200 mb-8 text-sm">
                Use our convenient contact form to reach out with questions, feedback, or collaboration inquiries.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/60">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-black/30 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/60">Enter your email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@gmail.com"
                      className="bg-black/30 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/60">Type your message here...</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message..."
                      className="bg-black/30 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full"
                  >
                     <MagicButton
                      title={isSubmitting ? "Sending..." : "Get in touch"}
                      icon={!isSubmitting && <FaLocationArrow />}
                      position="right"
                      otherClasses="!bg-[#161A31] w-full"
                    />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                    <FaLocationArrow className="text-green-500 text-3xl" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/60 text-sm">
                      Thanks for reaching out.<br />I&apos;ll be in touch shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
