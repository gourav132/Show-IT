import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { ProjectContext } from "../context/ProjectContext";
import { FiGithub, FiExternalLink, FiEye, FiCode, FiStar } from "react-icons/fi";

const ProjectCard = ({
  index,
  projectTitle,
  projectDescription,
  projectLink,
  githubLink,
  projectFileURL,
  technologies = [],
  liveDemo = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-xs">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl blur-lg"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Main Card */}
        <motion.div
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden h-full"
          whileHover={{ 
            y: -8,
            scale: 1.02,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Project Image */}
          <div className="relative h-32 overflow-hidden">
            <img
              src={projectFileURL || "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Project"}
              alt={projectTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
              {githubLink && (
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  <FiGithub className="w-4 h-4 text-white" />
                </motion.a>
              )}
              
              {projectLink && (
                <motion.a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  <FiExternalLink className="w-4 h-4 text-white" />
                </motion.a>
              )}
            </div>

            {/* Live Badge */}
            {liveDemo && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500/90 backdrop-blur-sm rounded-full border border-green-400/50">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-white text-xs font-medium">Live</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="text-white text-sm font-bold group-hover:text-purple-400 transition-colors duration-300">
              {projectTitle}
            </h3>
            
            {/* Description */}
            <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
              {projectDescription}
            </p>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60 border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 3 && (
                  <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60 border border-white/20">
                    +{technologies.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Project Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center space-x-3 text-white/60 text-xs">
                <div className="flex items-center space-x-1">
                  <FiStar className="w-3 h-3" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiCode className="w-3 h-3" />
                  <span>12</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-white/60 text-xs">
                <FiEye className="w-3 h-3" />
                <span>1.2k</span>
              </div>
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

const Works = () => {
  const [projects, setProjects, PRloading] = useContext(ProjectContext);
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ui", label: "UI/UX" },
  ];

  const filteredProjects = projects.projects || [];

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
            className="text-purple-400 font-semibold text-sm mb-3"
          >
            My work
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Projects
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="max-w-3xl mx-auto mb-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm text-white/80 leading-relaxed text-center"
          >
            Following projects showcases my skills and experience through real-world examples of my work. 
            Each project is briefly described with links to code repositories and live demos. 
            It reflects my ability to solve complex problems, work with different technologies, 
            and manage projects effectively.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs ${
                filter === filterOption.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {!PRloading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`project-${index}`}
                index={index}
                {...project}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-16"
          >
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white/60 text-sm">Loading projects...</p>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-white mb-3">
              Have a Project in Mind?
            </h3>
            <p className="text-white/70 mb-4 text-sm">
              I'm always excited to work on new and challenging projects. 
              Let's discuss how we can bring your ideas to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-xs">
                Start a Project
              </button>
              <button className="px-6 py-2 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-xs">
                View More Work
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");
