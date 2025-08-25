import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { PreviewContext } from "../context/PreviewContext";
import { FiCode, FiSmartphone, FiDatabase, FiImage, FiZap, FiShield } from "react-icons/fi";

const ServiceCard = ({ index, title, icon, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (title) => {
    const iconMap = {
      "Web Developer": FiCode,
      "React Native Developer": FiSmartphone,
      "Backend Developer": FiDatabase,
      "Content Creator": FiImage,
      "UI/UX Designer": FiImage,
      "DevOps Engineer": FiZap,
      "Security Specialist": FiShield,
    };
    return iconMap[title] || FiCode;
  };

  const IconComponent = getIcon(title);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-sm">
        {/* Background Card */}
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
          {/* Icon Container */}
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl flex items-center justify-center mb-4 mx-auto"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </motion.div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-white text-sm font-bold">
              {title}
            </h3>
            
            <p className="text-white/70 text-xs leading-relaxed">
              {description || `Specialized in ${title.toLowerCase()} with modern technologies and best practices.`}
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-3">
              {getSkillsForService(title).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
                >
                  {skill}
                </span>
              ))}
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

const getSkillsForService = (title) => {
  const skillsMap = {
    "Web Developer": ["React", "Vue", "Angular", "TypeScript"],
    "React Native Developer": ["React Native", "Expo", "Redux", "Firebase"],
    "Backend Developer": ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    "Content Creator": ["Figma", "Adobe", "Motion", "Branding"],
    "UI/UX Designer": ["Figma", "Sketch", "Prototyping", "User Research"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD"],
    "Security Specialist": ["Penetration Testing", "OWASP", "Cryptography", "Compliance"],
  };
  return skillsMap[title] || ["Modern", "Scalable", "Secure", "Efficient"];
};

const About = () => {
  const [previewData, setPreviewData] = useContext(PreviewContext);

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
            Introduction
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Overview
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Overview Text */}
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm text-white/80 leading-relaxed text-center"
          >
            {previewData.overview || 
              "I'm a passionate developer with a keen eye for creating innovative digital experiences. " +
              "With expertise in modern web technologies and a strong foundation in software engineering principles, " +
              "I bring ideas to life through clean, efficient, and scalable code. " +
              "My approach combines technical excellence with creative problem-solving to deliver exceptional results."
            }
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(previewData.services && previewData.services.length > 0 
            ? previewData.services 
            : services
          ).map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "3+", label: "Years Experience" },
            { number: "100%", label: "Client Satisfaction" },
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
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");