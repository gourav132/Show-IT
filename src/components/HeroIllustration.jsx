import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiMonitor, FiSmartphone, FiDatabase, FiZap, FiLayers, FiGlobe, FiShield } from 'react-icons/fi';

const HeroIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Container */}
      <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
        
        {/* Central Floating Card */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-40 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
        >
          {/* Screen Content */}
          <div className="w-full h-full p-6 flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-white/60 text-xs font-mono">portfolio.dev</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                className="text-white text-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiCode />
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-xs">Live Server</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Tech Icons */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-blue-500/30 flex items-center justify-center"
          initial={{ opacity: 0, x: 50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <FiSmartphone className="text-white text-xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-8 w-20 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl border border-green-500/30 flex items-center justify-center"
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <FiDatabase className="text-white text-xl" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-14 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl border border-purple-500/30 flex items-center justify-center"
          initial={{ opacity: 0, x: 50, y: -30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <FiMonitor className="text-white text-lg" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-14 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl border border-orange-500/30 flex items-center justify-center"
          initial={{ opacity: 0, x: -50, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <FiZap className="text-white text-lg" />
        </motion.div>

        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-16 left-16 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg border border-cyan-500/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <FiLayers className="text-white text-sm" />
        </motion.div>

        <motion.div
          className="absolute bottom-16 right-16 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          whileHover={{ scale: 1.1, rotate: -10 }}
        >
          <FiGlobe className="text-white text-sm" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-32 w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-indigo-500/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          whileHover={{ scale: 1.1, rotate: 15 }}
        >
          <FiShield className="text-white text-xs" />
        </motion.div>

        {/* Animated Code Lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/60 text-xs font-mono"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 0], x: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {`const ${['app', 'component', 'function', 'data', 'state', 'api'][i]} = {};`}
          </motion.div>
        ))}

        {/* Connection Lines with Gradients */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M 200 150 Q 250 100 300 150"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
          />
          <motion.path
            d="M 150 200 Q 100 250 150 300"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          />
          <motion.path
            d="M 250 200 Q 300 150 350 200"
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
          />
          <motion.path
            d="M 200 250 Q 150 200 200 150"
            stroke="url(#gradient4)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 3.5 }}
          />
        </svg>

        {/* Glowing Orbs */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 7}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Background Particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-8 h-8 border border-white/20 rounded-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-6 h-6 border border-white/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default HeroIllustration;
