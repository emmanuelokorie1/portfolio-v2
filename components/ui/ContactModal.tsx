"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { github, linkedin } from "@/data";
import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        // Reset form after 2 seconds and close
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
          onClose();
        }, 2000);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[5001]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[5002] pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#10132E] border border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl relative pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition"
              >
                <IoClose size={24} />
              </button>

              <h2 className="text-2xl font-bold text-center mb-2">
                Let&apos;s Connect
              </h2>
              <p className="text-center text-white/60 mb-8 text-sm">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@gmail.com"
                      className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80">Message</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={4}
                      className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full"
                  >
                    <MagicButton
                      title={isSubmitting ? "Sending..." : "Send Message"}
                      icon={!isSubmitting && <FaLocationArrow />}
                      position="right"
                      otherClasses="!bg-[#161A31]" // Darker bg for contrast
                    />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                   <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                     <FaLocationArrow className="text-green-500 text-2xl" />
                   </div>
                   <h3 className="text-xl font-bold">Message Sent!</h3>
                   <p className="text-white/60 text-center text-sm">Thanks for reaching out. I&apos;ll be in touch shortly.</p>
                </div>
              )}

              <div className="flex gap-4 justify-center mt-8 pt-6 border-t border-white/5">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
