import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = "80px", color = "#915eff" }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        className="rounded-full border-4 border-gray-300 border-t-purple-500"
        style={{
          width: size,
          height: size,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
