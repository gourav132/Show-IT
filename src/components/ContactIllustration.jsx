import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const ContactIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Main illustration container */}
      <div className="relative w-80 h-80">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-4 border-2 border-blue-500/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-8 border-2 border-green-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center contact icon */}
        <motion.div
          className="absolute inset-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiSend className="text-white text-3xl" />
        </motion.div>
        
        {/* Floating contact elements */}
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <FiMail className="text-white text-xl" />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 -right-4 transform -translate-y-1/2"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <FiPhone className="text-white text-xl" />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <FiMapPin className="text-white text-xl" />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 -left-4 transform -translate-y-1/2"
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <FiSend className="text-white text-xl" />
          </div>
        </motion.div>
      </div>
      
      {/* Background particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default ContactIllustration;
