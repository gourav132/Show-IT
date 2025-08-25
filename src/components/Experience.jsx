import React, { useContext } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { PreviewContext } from "../context/PreviewContext";
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink } from "react-icons/fi";

const ExperienceCard = ({ experience, index }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        padding: "1.5rem",
      }}
      contentArrowStyle={{ 
        borderRight: "5px solid rgba(255, 255, 255, 0.1)",
        borderLeft: "5px solid rgba(255, 255, 255, 0.1)",
      }}
      date={experience.date}
      dateClassName="text-white/60 font-medium text-xs"
      iconStyle={{ 
        background: experience.iconBg || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 0 20px rgba(102, 126, 234, 0.4)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-white text-lg font-bold mb-1">
            {experience.title}
          </h3>
          
          <div className="flex items-center space-x-3 text-white/70 text-xs mb-3">
            <div className="flex items-center space-x-1">
              <FiBriefcase className="w-3 h-3" />
              <span>{experience.company_name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiCalendar className="w-3 h-3" />
              <span>{experience.date}</span>
            </div>
          </div>

          {/* Company Badge */}
          <div className="inline-flex items-center px-2 py-0.5 bg-white/10 rounded-full border border-white/20">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />
            <span className="text-white/80 text-xs font-medium">
              {experience.type || "Full-time"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          {experience.description || 
            `Led development initiatives and collaborated with cross-functional teams to deliver high-quality solutions.`
          }
        </p>

        {/* Points */}
        <ul className="space-y-2">
          {experience.points.map((point, pointIndex) => (
            <motion.li
              key={`experience-point-${pointIndex}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: pointIndex * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-2 text-white/70 text-xs leading-relaxed"
            >
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>

        {/* Technologies Used */}
        {experience.technologies && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <h4 className="text-white/80 font-semibold mb-2 text-xs">Technologies Used:</h4>
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60 border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {experience.links && (
          <div className="mt-3 flex space-x-2">
            {experience.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-md text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 text-xs"
              >
                <FiExternalLink className="w-3 h-3" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [previewData, setPreviewData] = useContext(PreviewContext);

  const experienceData = previewData.experiences && previewData.experiences.length > 0 
    ? previewData.experiences 
    : experiences;

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
            What I have done so far
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Work Experience
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Timeline */}
        <div className="mt-16">
          <VerticalTimeline lineColor="rgba(255, 255, 255, 0.1)">
            {experienceData.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-3">
              Ready to Work Together?
            </h3>
            <p className="text-white/70 mb-4 text-sm">
              I'm always open to discussing new opportunities and exciting projects. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-xs">
                View Resume
              </button>
              <button className="px-6 py-2 border-2 border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-all duration-300 text-xs">
                Contact Me
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");