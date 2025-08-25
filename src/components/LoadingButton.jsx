import React from 'react';
import { motion } from 'framer-motion';

const LoadingButton = ({
  children,
  type = "button",
  variant = "primary", // primary, secondary, danger, success
  size = "medium", // small, medium, large
  loading = false,
  disabled = false,
  onClick,
  className = "",
  icon: Icon = null,
  loadingText = "Loading...",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return isDisabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-2xl shadow-purple-500/25';
      case "secondary":
        return isDisabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-white/10 text-gray-300 hover:bg-white/20';
      case "danger":
        return isDisabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-2xl shadow-red-500/25';
      case "success":
        return isDisabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-2xl shadow-green-500/25';
      default:
        return isDisabled
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-2xl shadow-purple-500/25';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return 'px-4 py-2 text-xs';
      case "medium":
        return 'px-6 py-3 text-sm';
      case "large":
        return 'px-8 py-4 text-base';
      default:
        return 'px-6 py-3 text-sm';
    }
  };

  return (
    <motion.button
      type={type}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex items-center justify-center space-x-2 rounded-2xl font-bold transition-all duration-200
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
};

export default LoadingButton;
