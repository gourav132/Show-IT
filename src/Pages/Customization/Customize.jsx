import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase/config";
import { logout } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import { motion, AnimatePresence } from "framer-motion";
import copy from "copy-text-to-clipboard";

import "./CustomizeStyle.css";
import { Preview } from "../index";
import { PreviewContext } from "../../context/PreviewContext";

import Experience from "./Experience Field/Experience";
import Project from "./Project/Project";
import Overview from "./Overview/Overview";
import Introduction from "./Introduction/Introduction";
import Skills from "./Skills/Skills";

import { 
  FiUser, 
  FiFileText, 
  FiBriefcase, 
  FiFolder, 
  FiEye, 
  FiEyeOff,
  FiSave, 
  FiLogOut, 
  FiLink, 
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiHome,
  FiX,
  FiMaximize2,
  FiMinimize2,
  FiSettings,
  FiCode
} from "react-icons/fi";

import Modal from "../../components/Modals/Modal";

const steps = [
  { id: "intro", title: "Introduction", icon: FiUser, description: "Basic information" },
  { id: "overview", title: "Overview", icon: FiFileText, description: "About yourself" },
  { id: "skills", title: "Skills", icon: FiCode, description: "Technical expertise" },
  { id: "exp", title: "Experience", icon: FiBriefcase, description: "Work history" },
  { id: "project", title: "Projects", icon: FiFolder, description: "Your work" },
];

export default function Customize() {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [showPreview, setShowPreview] = useState(true);
  const [step, setStep] = useState("intro");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [loading, user, navigate]);

  const copyURL = () => {
    copy(previewData.publicURL);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  async function handleSubmitButton() {
    setIsSaving(true);
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");

      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);
      if (userDoc) {
        const userRef = userDoc.ref;
        await updateDoc(userRef, { previewData });
        console.log("Preview data added to the document!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        console.error("Document with the given UID not found.");
      }
    } catch (error) {
      console.error("Error adding preview data:", error);
    } finally {
      setIsSaving(false);
    }
  }

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {loading || !user ? (
        <div className="min-h-screen w-8/12 m-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/25">
              <FiSettings className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-gray-400 text-sm">Loading your workspace...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-10/12 m-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.05),transparent_50%)]"></div>
          </div>

          {/* Success Notification */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm"
              >
                <FiCheck className="w-5 h-5" />
                <span className="text-sm font-medium">URL copied to clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Navigation Bar */}
          <div className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      BuildFolio
                    </h1>
                    <p className="text-xs text-gray-400">Portfolio Builder</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyURL}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    title="Copy Portfolio URL"
                  >
                    <FiLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    title={showPreview ? "Hide Preview" : "Show Preview"}
                  >
                    {showPreview ? (
                      <FiEyeOff className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    ) : (
                      <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    )}
                  </button>
                  <button
                    onClick={handleSubmitButton}
                    disabled={isSaving}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group disabled:opacity-50"
                    title="Save Changes"
                  >
                    {isSaving ? (
                      <ReactLoading type="spin" height="16px" width="16px" color="#8b5cf6" />
                    ) : (
                      <FiSave className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    )}
                  </button>
                  <button
                    onClick={() => navigate("/control-center")}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    title="Back to Control Center"
                  >
                    <FiHome className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200 group"
                    title="Logout"
                  >
                    <FiLogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex h-[calc(100vh-80px)]">
            {/* Left Sidebar */}
            <div className="w-64 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col">
              {/* Sidebar Header */}
              <div className="p-3 border-b border-white/10">
                <h2 className="text-lg font-bold text-white mb-1">Build Portfolio</h2>
                <p className="text-xs text-gray-400">Please complete each step to create your portfolio.</p>
              </div>

              {/* Progress */}
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-300 font-medium">Progress</span>
                  <span className="text-xs text-white font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex-1 p-3">
                <div className="space-y-2">
                  {steps.map((stepItem, index) => {
                    const Icon = stepItem.icon;
                    const isActive = stepItem.id === step;
                    const isCompleted = index < currentStepIndex;
                    
                    return (
                      <button
                        key={stepItem.id}
                        onClick={() => setStep(stepItem.id)}
                        className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 text-left ${
                          isActive 
                            ? 'bg-purple-500/20 border border-purple-500/30' 
                            : isCompleted
                            ? 'bg-green-500/20 border border-green-500/30'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                            : isCompleted
                            ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/25'
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <FiCheck className="w-2.5 h-2.5" />
                          ) : (
                            <Icon className="w-2.5 h-2.5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold text-xs ${
                            isActive ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-300'
                          }`}>
                            {stepItem.title}
                          </div>
                          <div className={`text-xs ${
                            isActive ? 'text-purple-300' : isCompleted ? 'text-green-400' : 'text-gray-500'
                          }`}>
                            {stepItem.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 border-t border-white/10">
                <button
                  onClick={handleSubmitButton}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold text-xs disabled:opacity-50 shadow-lg shadow-purple-500/25"
                >
                  {isSaving ? (
                    <>
                      <ReactLoading type="spin" height="8px" width="8px" color="#ffffff" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="w-2.5 h-2.5" />
                      <span>Save Progress</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 bg-black/20 backdrop-blur-md">
              <div className="h-full overflow-y-auto">
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {step === "intro" && (
                      <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Introduction step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Overview step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "skills" && (
                      <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Skills step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "exp" && (
                      <motion.div
                        key="exp"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Experience step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "project" && (
                      <motion.div
                        key="project"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Project step={step} setStep={setStep} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Overlay */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowPreview(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-6xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative transform-gpu will-change-transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-all duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                  
                  {/* Preview Content */}
                  <div className="h-full overflow-y-auto scroll-smooth">
                    <div 
                      style={{ 
                        zoom: "100%", 
                        scrollbarWidth: "none",
                        WebkitOverflowScrolling: "touch",
                        transform: "translateZ(0)"
                      }}
                      className="transform-gpu"
                    >
                      <Preview />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
