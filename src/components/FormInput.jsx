import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  helperText = "",
  icon: Icon = null,
  validationRules = {},
  register,
  errors,
  disabled = false,
  className = "",
  ...props
}) => {
  const hasError = errors?.[name];
  const isRequired = validationRules?.required;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 ${className}`}
    >
      <label htmlFor={name} className="block text-sm font-semibold text-gray-200 mb-3">
        {label}
        {isRequired && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${hasError ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}
        
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3.5 bg-white/5 border rounded-2xl text-sm text-gray-200 
            placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 
            hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-12' : ''}
            ${
              hasError 
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                : 'border-white/10 focus:ring-purple-500/50 focus:border-purple-500/50'
            }
          `}
          {...register(name, validationRules)}
          {...props}
        />
      </div>
      
      {hasError ? (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-400 flex items-center"
        >
          <FiAlertCircle className="w-3 h-3 mr-1" />
          {hasError.message}
        </motion.p>
      ) : helperText && (
        <p className="mt-3 text-xs text-gray-400 leading-relaxed">{helperText}</p>
      )}
    </motion.div>
  );
};

export default FormInput;
