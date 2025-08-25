import { useState, useCallback } from 'react';

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  URL: /^https?:\/\/.+/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  NAME: /^[a-zA-Z\s]+$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Common validation rules
export const VALIDATION_RULES = {
  REQUIRED: (fieldName) => ({
    required: `${fieldName} is required`
  }),
  
  EMAIL: {
    pattern: {
      value: VALIDATION_PATTERNS.EMAIL,
      message: "Please enter a valid email address"
    }
  },
  
  URL: {
    pattern: {
      value: VALIDATION_PATTERNS.URL,
      message: "Please enter a valid URL starting with http:// or https://"
    }
  },
  
  NAME: {
    pattern: {
      value: VALIDATION_PATTERNS.NAME,
      message: "Name can only contain letters and spaces"
    }
  },
  
  USERNAME: {
    pattern: {
      value: VALIDATION_PATTERNS.USERNAME,
      message: "Username can only contain letters, numbers, and underscores"
    }
  },
  
  PASSWORD: {
    pattern: {
      value: VALIDATION_PATTERNS.PASSWORD,
      message: "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    }
  },
  
  MIN_LENGTH: (min, fieldName) => ({
    minLength: {
      value: min,
      message: `${fieldName} must be at least ${min} characters`
    }
  }),
  
  MAX_LENGTH: (max, fieldName) => ({
    maxLength: {
      value: max,
      message: `${fieldName} must be less than ${max} characters`
    }
  }),
  
  MIN_VALUE: (min, fieldName) => ({
    min: {
      value: min,
      message: `${fieldName} must be at least ${min}`
    }
  }),
  
  MAX_VALUE: (max, fieldName) => ({
    max: {
      value: max,
      message: `${fieldName} must be less than ${max}`
    }
  })
};

// Custom hook for form validation
export const useFormValidation = (initialState = {}) => {
  const [errors, setErrors] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value, rules) => {
    const fieldErrors = [];

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      fieldErrors.push(typeof rules.required === 'string' ? rules.required : `${name} is required`);
    }

    // Min length validation
    if (rules.minLength && value && value.length < rules.minLength.value) {
      fieldErrors.push(rules.minLength.message);
    }

    // Max length validation
    if (rules.maxLength && value && value.length > rules.maxLength.value) {
      fieldErrors.push(rules.maxLength.message);
    }

    // Pattern validation
    if (rules.pattern && value && !rules.pattern.value.test(value)) {
      fieldErrors.push(rules.pattern.message);
    }

    // Custom validation
    if (rules.validate) {
      const customError = rules.validate(value);
      if (customError) {
        fieldErrors.push(customError);
      }
    }

    return fieldErrors;
  }, []);

  const validateForm = useCallback((data, validationSchema) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(fieldName => {
      const fieldValue = data[fieldName];
      const fieldRules = validationSchema[fieldName];
      
      const fieldErrors = validateField(fieldName, fieldValue, fieldRules);
      
      if (fieldErrors.length > 0) {
        newErrors[fieldName] = fieldErrors[0]; // Take first error
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField]);

  const setFieldError = useCallback((fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = useCallback(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  return {
    errors,
    isSubmitting,
    setIsSubmitting,
    validateField,
    validateForm,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    hasErrors
  };
};

// Custom hook for async form submission with error handling
export const useFormSubmission = (submitFunction) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitFunction(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  }, [submitFunction]);

  const resetSubmission = useCallback(() => {
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit,
    resetSubmission
  };
};

// Utility function to combine validation rules
export const combineValidationRules = (...rules) => {
  return rules.reduce((combined, rule) => {
    return { ...combined, ...rule };
  }, {});
};

// Utility function to create field-specific validation
export const createFieldValidation = (fieldName, rules) => {
  return {
    [fieldName]: combineValidationRules(...rules)
  };
};
