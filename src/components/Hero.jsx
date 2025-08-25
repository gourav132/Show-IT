import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import HeroIllustration from "./HeroIllustration";
import { PreviewContext } from "../context/PreviewContext";
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

const Hero = () => {
  const [previewData, setPreviewData] = useContext(PreviewContext);

  const socialLinks = [
    { icon: FiGithub, href: previewData.socials?.github || "#", label: "GitHub" },
    { icon: FiLinkedin, href: previewData.socials?.linkedin || "#", label: "LinkedIn" },
    { icon: FiTwitter, href: previewData.socials?.twitter || "#", label: "Twitter" },
    { icon: FiMail, href: `mailto:${previewData.contact?.email || "#"}`, label: "Email" },
  ];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-black/90" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-16 flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
              <span className="text-white/80 text-xs font-medium">Available for opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  {previewData.displayName || "Developer"}
                </span>
              </h1>
              
              <div className="text-sm sm:text-base lg:text-lg text-white/80 font-medium">
                {previewData.tagline || "Full Stack Developer & UI/UX Designer"}
              </div>
            </motion.div>

            {/* Description */}
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-white/70 max-w-2xl leading-relaxed"
            >
              I create exceptional digital experiences that combine cutting-edge technology with beautiful design. 
              Passionate about building scalable solutions and bringing ideas to life.
            </motion.p> */}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                View My Work
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm">
                Download CV
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center space-x-6"
            >
              <span className="text-white/60 text-xs font-medium">Follow me:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="group">
          <div className="flex flex-col items-center space-y-3">
            <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors duration-300">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-4 bg-white/60 rounded-full mt-3"
              />
            </motion.div>
          </div>
        </a>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 border border-white/10 rounded-full"
        />
      </div>
      
      <div className="absolute bottom-20 left-20 hidden lg:block">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-white/10 rounded-full"
        />
      </div>

      {/* Additional Floating Elements */}
      <div className="absolute top-1/3 left-10 hidden xl:block">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-6 border border-white/20 rounded-full"
        />
      </div>
      
      <div className="absolute top-2/3 right-10 hidden xl:block">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 border border-white/20 rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
