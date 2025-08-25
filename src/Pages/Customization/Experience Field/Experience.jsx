import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PreviewContext } from "../../../context/PreviewContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, 
  FiTrash2, 
  FiEdit3, 
  FiSave, 
  FiArrowLeft, 
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiLink,
  FiCheck,
  FiZap,
  FiAlertCircle
} from "react-icons/fi";

export default function Experience({ step, setStep }) {
  const [previewData, setPreviewData] = useContext(PreviewContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    reset,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      company_name: "",
      icon: "",
      from: "",
      to: "",
      points: ""
    }
  });

  const [expState, setExpState] = useState({
    currentWorkingExp: Math.floor(Math.random() * 90) + 10,
    mode: "add",
  });

  // Watch form values
  const watchedValues = watch();

  const handleOverviewDelete = (title) => {
    const filteredExperiences = previewData.experiences.filter(
      (exp) => exp.id !== title
    );
    setPreviewData({ ...previewData, experiences: filteredExperiences });
  };

  const handleAddExperience = async (data) => {
    try {
      const isValid = await trigger();
      if (!isValid) return;

      const splitPoints = data.points.split(".").filter(point => point.trim());
      const date = data.from + " - " + data.to;

      const exp = {
        id: expState.currentWorkingExp,
        title: data.title,
        company_name: data.company_name,
        icon: data.icon,
        iconBg: "#383E56",
        date: date,
        points: splitPoints,
      };

      setPreviewData({
        ...previewData,
        experiences: previewData.experiences.concat(exp),
      });
      
      setExpState({ ...expState, mode: "add" });
      reset();
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const handleDeleteExperience = (id) => {
    const filteredExperiences = previewData.experiences.filter(
      (exp) => exp.id !== id
    );
    setPreviewData({ ...previewData, experiences: filteredExperiences });
  };

  const handleUpdate = async (id) => {
    try {
      const isValid = await trigger();
      if (!isValid) return;

      const data = watchedValues;
      let filteredExperiences = previewData.experiences.filter(
        (exp) => exp.id !== id
      );

      const splitPoints = data.points.split(".").filter(point => point.trim());
      const date = data.from + " - " + data.to;

      const exp = {
        id: expState.currentWorkingExp,
        title: data.title,
        company_name: data.company_name,
        icon: data.icon,
        iconBg: "#383E56",
        date: date,
        points: splitPoints,
      };

      filteredExperiences.push(exp);
      setPreviewData({ ...previewData, experiences: filteredExperiences });
      setExpState({ ...expState, mode: "add" });
      reset();
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const handleSearchExp = (id) => {
    const exp = previewData.experiences.find((exp) => exp.id === id);
    const points = exp.points.join(". ");
    const duration = exp.date.split("-");
    
    setValue("title", exp.title);
    setValue("company_name", exp.company_name);
    setValue("icon", exp.icon);
    setValue("to", duration[2]?.trim() + "-" + duration[3]?.trim() || "");
    setValue("from", duration[0]?.trim() + "-" + duration[1]?.trim() || "");
    setValue("points", points);
    
    setExpState({
      currentWorkingExp: id,
      mode: "update",
    });
  };

  const handleContinue = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep("project");
    }
  };

  const input = (label, name, helperText = "", type = "text", icon = null, validationRules = {}) => {
    const Icon = icon;
    const hasError = errors[name];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <label htmlFor={name} className="block text-sm font-semibold text-gray-200 mb-3">
          {label}
          {validationRules.required && <span className="text-red-400 ml-1">*</span>}
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
            placeholder={helperText}
            className={`w-full px-4 py-4 bg-white/5 border rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-white/20 ${
              Icon ? 'pl-12' : ''
            } ${
              hasError 
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                : 'border-white/10 focus:ring-purple-500/50 focus:border-purple-500/50'
            }`}
            {...register(name, validationRules)}
            disabled={isSubmitting}
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25">
          <FiBriefcase className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">Work Experience</h3>
        <p className="text-gray-400 text-lg">Add your professional experience and achievements</p>
      </div>

      {/* Experience Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setExpState({ ...expState, mode: "add" });
              reset();
            }}
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl text-sm font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New Experience</span>
          </motion.button>
        </div>
        
        {/* Experience List */}
        <div className="flex flex-wrap justify-center gap-3">
          <AnimatePresence>
            {previewData.experiences &&
              previewData.experiences.map((exp, index) => (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearchExp(exp.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    expState.currentWorkingExp === exp.id
                      ? 'bg-purple-500/20 border-2 border-purple-500/30 text-purple-300'
                      : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <FiBriefcase className="w-4 h-4" />
                  <span className="truncate max-w-32">{exp.company_name}</span>
                </motion.button>
              ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8"
      >
        <form onSubmit={handleSubmit(expState.mode === "add" ? handleAddExperience : handleUpdate)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {input(
              "Company Name", 
              "company_name", 
              "Enter company name", 
              "text", 
              FiMapPin,
              {
                required: "Company name is required",
                minLength: {
                  value: 2,
                  message: "Company name must be at least 2 characters"
                },
                maxLength: {
                  value: 50,
                  message: "Company name must be less than 50 characters"
                }
              }
            )}
            {input(
              "Position", 
              "title", 
              "Your job title", 
              "text", 
              FiBriefcase,
              {
                required: "Position is required",
                minLength: {
                  value: 2,
                  message: "Position must be at least 2 characters"
                },
                maxLength: {
                  value: 50,
                  message: "Position must be less than 50 characters"
                }
              }
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {input(
              "From", 
              "from", 
              "MM-YYYY", 
              "month", 
              FiCalendar,
              {
                required: "Start date is required"
              }
            )}
            {input(
              "To", 
              "to", 
              "MM-YYYY", 
              "month", 
              FiCalendar,
              {
                required: "End date is required"
              }
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Company Logo URL
            </label>
            <div className="relative">
              <FiLink className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none h-5 w-5 text-gray-400" />
              <input
                type="url"
                placeholder="https://company-logo-url.com"
                className={`w-full px-4 py-4 pl-12 bg-white/5 border rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-white/20 ${
                  errors.icon 
                    ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                    : 'border-white/10 focus:ring-purple-500/50 focus:border-purple-500/50'
                }`}
                {...register("icon", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                disabled={isSubmitting}
              />
            </div>
            {errors.icon && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-red-400 flex items-center"
              >
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.icon.message}
              </motion.p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Experience Details <span className="text-red-400">*</span>
            </label>
            <textarea
              className={`w-full px-4 py-4 bg-white/5 border rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-white/20 resize-none ${
                errors.points 
                  ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                  : 'border-white/10 focus:ring-purple-500/50 focus:border-purple-500/50'
              }`}
              rows={5}
              placeholder="Describe your responsibilities and achievements. Use periods to separate different points."
              disabled={isSubmitting}
              {...register("points", {
                required: "Experience details are required",
                minLength: {
                  value: 20,
                  message: "Experience details must be at least 20 characters"
                },
                maxLength: {
                  value: 1000,
                  message: "Experience details must be less than 1000 characters"
                }
              })}
            />
            {errors.points ? (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-red-400 flex items-center"
              >
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.points.message}
              </motion.p>
            ) : (
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Separate different points with periods (.)
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            {expState.mode === "add" ? (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || !isValid}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-200 font-bold text-sm shadow-lg ${
                  isSubmitting || !isValid
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-500/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    <span>Save Experience</span>
                  </>
                )}
              </motion.button>
            ) : (
              <>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || !isValid}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-200 font-bold text-sm shadow-lg ${
                    isSubmitting || !isValid
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4" />
                      <span>Update</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDeleteExperience(expState.currentWorkingExp)}
                  disabled={isSubmitting}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-bold text-sm shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
              </>
            )}
          </div>
        </form>
      </motion.div>

      {/* Quick Tips */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-bold text-white">Experience Tips</h4>
        </div>
        <ul className="text-sm text-gray-300 space-y-3">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            <span>Focus on quantifiable achievements and specific responsibilities</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            <span>Use action verbs to describe your contributions and impact</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            <span>Include relevant technologies, tools, and methodologies used</span>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep("overview")}
          disabled={isSubmitting}
          className="flex items-center space-x-3 px-10 py-4 bg-white/10 text-gray-300 rounded-2xl hover:bg-white/20 transition-all duration-200 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={isSubmitting}
          className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-bold text-sm shadow-2xl shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue</span>
          <FiArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
