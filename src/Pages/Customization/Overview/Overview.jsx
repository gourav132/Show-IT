import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { PreviewContext } from "../../../context/PreviewContext";
import { web } from "../../../assets";
import { motion } from "framer-motion";
import { FiFileText, FiCheck, FiArrowLeft, FiArrowRight, FiUser, FiCode, FiAlertCircle } from "react-icons/fi";

export default function Overview({ step, setStep }) {
  const [previewData, setPreviewData] = useContext(PreviewContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      overview: previewData.overview || "",
      services: previewData.services || []
    }
  });

  // Watch form values to update preview data in real-time
  const watchedValues = watch();

  useEffect(() => {
    // Update preview data when form values change
    setPreviewData(prev => ({
      ...prev,
      overview: watchedValues.overview,
      services: watchedValues.services || prev.services
    }));
  }, [watchedValues.overview, watchedValues.services, setPreviewData]);

  // Set initial values when component mounts
  useEffect(() => {
    setValue("overview", previewData.overview || "");
    setValue("services", previewData.services || []);
  }, []); // Only run once on mount

  const handleOverviewDelete = (title) => {
    const updatedServices = previewData.services.filter(
      (service) => service.title !== title
    );
    setValue("services", updatedServices);
    setPreviewData((prevPreviewData) => ({
      ...prevPreviewData,
      services: updatedServices,
    }));
  };

  const handleOverviewServiceAdd = (title) => {
    const newService = {
      title: title,
      icon: web,
    };

    const updatedServices = [...(previewData.services || []), newService];
    setValue("services", updatedServices);
    setPreviewData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
  };

  const handleContinue = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep("skills");
    }
  };

  const list = (value, label, last = false) => {
    const isChecked = previewData.services?.some(
      (service) => service.title === value
    ) || false;
    
    return (
      <motion.li
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="flex items-center p-4 hover:bg-white/5 rounded-2xl transition-colors duration-200">
          <div className="relative">
            <input
              onChange={(e) => {
                if (e.target.checked) handleOverviewServiceAdd(value);
                else handleOverviewDelete(value);
              }}
              id={label}
              type="checkbox"
              value={value}
              className="sr-only"
              checked={isChecked}
            />
            <label
              htmlFor={label}
              className={`flex items-center justify-center w-6 h-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                isChecked
                  ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/25"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {isChecked && (
                <FiCheck className="w-3 h-3 text-white" />
              )}
            </label>
          </div>
          <label
            htmlFor={label}
            className="w-full py-2 ms-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors duration-200"
          >
            {label}
          </label>
        </div>
      </motion.li>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-7"
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-18 h-18 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-green-500/25">
          <FiFileText className="w-9 h-9 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Overview</h3>
        <p className="text-gray-400 text-base">Tell us about your background</p>
      </div>

      <form onSubmit={handleSubmit(handleContinue)} className="space-y-7">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3" htmlFor="overview">
              About You <span className="text-red-400">*</span>
            </label>
            <textarea
              id="overview"
              placeholder="Write a compelling description about yourself, your background, and what drives you in your field..."
              className={`w-full px-4 py-3.5 bg-white/5 border rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-white/20 resize-none ${
                errors.overview 
                  ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                  : 'border-white/10 focus:ring-green-500/50 focus:border-green-500/50'
              }`}
              rows={5}
              disabled={isSubmitting}
              {...register("overview", {
                required: "About section is required",
                minLength: {
                  value: 50,
                  message: "About section must be at least 50 characters"
                },
                maxLength: {
                  value: 1000,
                  message: "About section must be less than 1000 characters"
                }
              })}
            />
            {errors.overview ? (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-red-400 flex items-center"
              >
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.overview.message}
              </motion.p>
            ) : (
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Share your story, passion, and what makes you unique in your field.
              </p>
            )}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-4">
              Select Your Expertise <span className="text-red-400">*</span>
            </label>
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <ul className="grid grid-cols-1 gap-0">
                {list("React Developer", "React")}
                {list("Web Developer", "Web")}
                {list("Mern Developer", "Mern")}
                {list("Angular Developer", "Angular")}
                {list("Laravel Developer", "Laravel", true)}
              </ul>
            </div>
            {errors.services ? (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-red-400 flex items-center"
              >
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.services.message}
              </motion.p>
            ) : (
              <div className="flex items-center mt-4 text-xs text-gray-400">
                <FiCode className="w-4 h-4 mr-2" />
                <span>You can select up to 4 areas of expertise</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Tips */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
          <div className="flex items-center mb-5">
            <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/25">
              <FiCheck className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-base font-bold text-white">Writing Tips</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Keep your about section concise but engaging (2-3 paragraphs)</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Highlight your unique value proposition and key achievements</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Choose expertise areas that best represent your current skills</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-7">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep("intro")}
            disabled={isSubmitting}
            className="flex items-center space-x-3 px-9 py-3.5 bg-white/10 text-gray-300 rounded-2xl hover:bg-white/20 transition-all duration-200 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || !isValid}
            className={`flex items-center space-x-3 px-9 py-3.5 rounded-2xl transition-all duration-200 font-bold text-sm shadow-2xl ${
              isSubmitting || !isValid
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 shadow-green-500/25'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Validating...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <FiArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
