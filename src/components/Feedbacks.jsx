import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { FiStar, FiMessageSquare, FiLinkedin, FiTwitter } from "react-icons/fi";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  rating = 5,
  date = "2024",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-sm">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl blur-xl"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Main Card */}
        <motion.div
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full"
          whileHover={{ 
            y: -8,
            scale: 1.02,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Quote Icon */}
          <div className="absolute top-4 right-4">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <FiMessageSquare className="w-4 h-4 text-white" />
            </motion.div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-white/30"
                }`}
              />
            ))}
          </div>

          {/* Testimonial Text */}
          <motion.p
            className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-4"
            animate={{ color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            "{testimonial}"
          </motion.p>

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={image}
                  alt={`feedback_by-${name}`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
              </div>
              
              {/* Author Details */}
              <div>
                <h4 className="text-white font-semibold text-sm">{name}</h4>
                <p className="text-white/60 text-xs">
                  {designation} at {company}
                </p>
                <p className="text-white/40 text-xs">{date}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-1">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <FiLinkedin className="w-3 h-3 text-white/70" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <FiTwitter className="w-3 h-3 text-white/70" />
              </motion.a>
            </div>
          </div>

          {/* Hover Effect Border */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 to-blue-500/50 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Reviews" },
    { id: "clients", label: "Client Reviews" },
    { id: "colleagues", label: "Colleague Reviews" },
    { id: "recent", label: "Recent Reviews" },
  ];

  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          variants={textVariant()}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-purple-400 font-semibold text-sm mb-2"
          >
            What others say
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Testimonials
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-xs ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={testimonial.name}
              index={index}
              {...testimonial}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "50+", label: "Happy Clients" },
            { number: "4.9", label: "Average Rating" },
            { number: "100%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-white/60 text-xs font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-3">
              Ready to Work Together?
            </h3>
            <p className="text-white/70 mb-4 text-sm">
              Join the list of satisfied clients who have transformed their ideas into reality. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-xs">
                Start a Project
              </button>
              <button className="px-6 py-2 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-all duration-300 text-xs">
                View More Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");