import React from 'react';
import { motion } from 'framer-motion';

const StaticTechDisplay = ({ icon, name, level }) => {
  // Get gradient colors based on skill level
  const getGradientColors = (level) => {
    switch (level) {
      case "Beginner": return "from-green-500/20 to-emerald-500/20 border-green-500/30 group-hover:border-green-400/50";
      case "Intermediate": return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30 group-hover:border-yellow-400/50";
      case "Advanced": return "from-red-500/20 to-pink-500/20 border-red-500/30 group-hover:border-red-400/50";
      case "Expert": return "from-purple-500/20 to-indigo-500/20 border-purple-500/30 group-hover:border-purple-400/50";
      default: return "from-purple-500/20 to-blue-500/20 border-purple-500/30 group-hover:border-purple-400/50";
    }
  };

  const getGlowColors = (level) => {
    switch (level) {
      case "Beginner": return "from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10";
      case "Intermediate": return "from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10";
      case "Advanced": return "from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10";
      case "Expert": return "from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/10 group-hover:to-indigo-500/10";
      default: return "from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10";
    }
  };

  const renderIcon = () => {
    // Handle new icon structure with type and data
    if (icon && typeof icon === 'object' && icon.type) {
      if (icon.type === "image") {
        return (
          <img
            src={icon.src}
            alt={name}
            className="w-8 h-8 object-contain filter group-hover:brightness-110 transition-all duration-300 drop-shadow-sm"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        );
      } else if (icon.type === "component") {
        return React.createElement(icon.component, {
          className: "w-8 h-8 text-white filter group-hover:brightness-110 transition-all duration-300"
        });
      }
    }
    
    // Handle legacy icon structure (function or string)
    if (icon && typeof icon === 'function') {
      return React.createElement(icon, {
        className: "w-8 h-8 text-white filter group-hover:brightness-110 transition-all duration-300"
      });
    } else if (icon && typeof icon === 'string' && icon.startsWith('http')) {
      return (
        <img
          src={icon}
          alt={name}
          className="w-8 h-8 object-contain filter group-hover:brightness-110 transition-all duration-300"
        />
      );
    }
    
    // Fallback to first letter
    return (
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs font-bold">{name.charAt(0).toUpperCase()}</span>
      </div>
    );
  };

  return (
    <motion.div
      className="group relative w-28 h-28 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background circle with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(level)} rounded-full transition-all duration-300`} />
      
      {/* Icon container */}
      <div className="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
        {renderIcon()}
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {name}
          {level && <span className="block text-gray-300 text-xs">{level}</span>}
        </div>
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGlowColors(level)} rounded-full transition-all duration-300 blur-sm`} />
    </motion.div>
  );
};

export default StaticTechDisplay;
