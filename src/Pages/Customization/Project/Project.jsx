import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectContext } from "../../../context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { 
  FiFolder, 
  FiUpload, 
  FiLink, 
  FiGithub, 
  FiGlobe, 
  FiArrowLeft, 
  FiArrowRight,
  FiFileText,
  FiImage,
  FiSave,
  FiCheck,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiZap
} from "react-icons/fi";

export default function Project({ step, setStep }) {
  const [user] = useAuthState(auth);
  const [projectsData, setProjects, PRloading] = useContext(ProjectContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [projectState, setProjectState] = useState({
    currentProjectId: null,
    mode: "add", // "add" or "edit"
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  const watchedFile = watch("projectFile");

  // Extract the projects array from the context
  const projects = projectsData?.projects || [];

  const input = (label, Name, HelperText = "", validationRules = {}, icon = null) => {
    const Icon = icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <label htmlFor={Name} className="block text-sm font-semibold text-gray-200 mb-3">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            type="text"
            id={Name}
            name={Name}
            {...register(Name, validationRules)}
            className={`w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 hover:border-white/20 ${
              errors[Name] ? "border-red-500/50 focus:ring-red-500/50" : ""
            } ${icon ? 'pl-12' : ''}`}
            placeholder={HelperText}
          />
        </div>
        {errors[Name] && (
          <p className="mt-3 text-xs text-red-400">{errors[Name].message}</p>
        )}
      </motion.div>
    );
  };

  const handleAddProject = async (data) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Get the file from the form data
      const file = data.projectFile[0];
      // Create a storage reference
      const storageRef = ref(storage, `projects/${user.uid}/${file.name}`);
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Generate a new document reference with a unique ID
      const projectDocRef = doc(collection(db, "projects"));
      const projectID = projectDocRef.id;

      // Store project details in Firestore with the generated projectID
      await setDoc(projectDocRef, {
        projectID: projectID,
        userID: user.uid,
        projectTitle: data.projectTitle,
        projectDescription: data.projectDescription,
        about: data.about,
        githubLink: data.githubLink,
        projectLink: data.projectLink,
        projectFileURL: downloadURL,
        createdAt: new Date(),
      });

      setUploadProgress(100);
      clearInterval(progressInterval);

      // Reset form and show success
      reset();
      setProjectState({ currentProjectId: null, mode: "add" });
      setTimeout(() => {
        setIsSubmitting(false);
        setUploadProgress(0);
      }, 1000);

      console.log("Project details saved successfully with ID:", projectID);
    } catch (error) {
      console.error("Error saving project details:", error);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleUpdateProject = async (data) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Get the file from the form data
      const file = data.projectFile[0];
      // Create a storage reference
      const storageRef = ref(storage, `projects/${user.uid}/${file.name}`);
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update project in Firestore
      const projectDocRef = doc(db, "projects", projectState.currentProjectId);
      await setDoc(projectDocRef, {
        projectID: projectState.currentProjectId,
        userID: user.uid,
        projectTitle: data.projectTitle,
        projectDescription: data.projectDescription,
        about: data.about,
        githubLink: data.githubLink,
        projectLink: data.projectLink,
        projectFileURL: downloadURL,
        updatedAt: new Date(),
      }, { merge: true });

      setUploadProgress(100);
      clearInterval(progressInterval);

      // Reset form and show success
      reset();
      setProjectState({ currentProjectId: null, mode: "add" });
      setTimeout(() => {
        setIsSubmitting(false);
        setUploadProgress(0);
      }, 1000);

      console.log("Project updated successfully with ID:", projectState.currentProjectId);
    } catch (error) {
      console.error("Error updating project details:", error);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "projects", projectId));
      
      // Update local state
      const updatedProjects = projects.filter(project => project.projectID !== projectId);
      setProjects({
        ...projectsData,
        projects: updatedProjects
      });
      
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project) => {
    setProjectState({
      currentProjectId: project.projectID,
      mode: "edit"
    });
    
    // Populate form with project data
    setValue("projectTitle", project.projectTitle);
    setValue("projectDescription", project.projectDescription);
    setValue("about", project.about);
    setValue("githubLink", project.githubLink);
    setValue("projectLink", project.projectLink);
  };

  const handleNewProject = () => {
    setProjectState({
      currentProjectId: null,
      mode: "add"
    });
    reset();
  };

  const onSubmit = (data) => {
    if (projectState.mode === "add") {
      handleAddProject(data);
    } else {
      handleUpdateProject(data);
    }
  };

  // Show loading state if context is still loading
  if (PRloading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 animate-spin">
            <FiFolder className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

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
          <FiFolder className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">Projects</h3>
        <p className="text-gray-400 text-lg">Showcase your best work and achievements</p>
      </div>

      {/* Project Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewProject}
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl text-sm font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New Project</span>
          </motion.button>
        </div>
        
        {/* Project List */}
        <div className="flex flex-wrap justify-center gap-3">
          <AnimatePresence>
            {projects && projects.map((project, index) => (
              <motion.button
                key={project.projectID}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEditProject(project)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  projectState.currentProjectId === project.projectID
                    ? 'bg-purple-500/20 border-2 border-purple-500/30 text-purple-300'
                    : 'bg-white/5 border-2 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <FiFolder className="w-4 h-4" />
                <span className="truncate max-w-32">{project.projectTitle}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center mb-6">
            <FiFileText className="w-5 h-5 text-purple-400 mr-3" />
            <h4 className="text-lg font-bold text-white">Project Overview</h4>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              About Your Projects
            </label>
            <textarea
              {...register("about", { required: "This field is required" })}
              className={`w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 hover:border-white/20 resize-none ${
                errors.about ? "border-red-500/50 focus:ring-red-500/50" : ""
              }`}
              rows={4}
              placeholder="Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos."
            />
            {errors.about && (
              <p className="mt-3 text-xs text-red-400">{errors.about.message}</p>
            )}
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center mb-6">
            <FiFolder className="w-5 h-5 text-purple-400 mr-3" />
            <h4 className="text-lg font-bold text-white">Project Details</h4>
          </div>
          
          {input(
            "Project Title",
            "projectTitle",
            "Enter the name of your project",
            { required: "Project title is required" },
            FiFileText
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Project Description
            </label>
            <textarea
              {...register("projectDescription", {
                required: "Project description is required",
              })}
              className={`w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 hover:border-white/20 resize-none ${
                errors.projectDescription ? "border-red-500/50 focus:ring-red-500/50" : ""
              }`}
              rows={4}
              placeholder="Describe what your project does, the technologies used, and your role in development."
            />
            {errors.projectDescription && (
              <p className="mt-3 text-xs text-red-400">{errors.projectDescription.message}</p>
            )}
          </div>
        </motion.div>

        {/* Project Media */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center mb-6">
            <FiImage className="w-5 h-5 text-purple-400 mr-3" />
            <h4 className="text-lg font-bold text-white">Project Media</h4>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Project Screenshot
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("projectFile", {
                  required: "Project file is required",
                  validate: {
                    acceptedFormats: (files) => {
                      const acceptedFormats = ["image/jpeg", "image/png", "image/webp"];
                      return (
                        (files &&
                          files[0] &&
                          acceptedFormats.includes(files[0].type)) ||
                        "Only JPG, PNG, and WebP files are accepted"
                      );
                    },
                  },
                })}
                className={`block w-full text-sm text-gray-300 rounded-2xl py-4 px-4 focus:outline-none hover:ring-1 hover:ring-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 border border-white/10 bg-white/5 transition-all duration-200 ${
                  errors.projectFile ? "border-red-500/50" : ""
                }`}
                accept="image/*"
              />
              {watchedFile && watchedFile[0] && (
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
                  <p className="text-sm text-green-400">
                    Selected: {watchedFile[0].name}
                  </p>
                </div>
              )}
              {errors.projectFile && (
                <p className="mt-3 text-xs text-red-400">{errors.projectFile.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Project Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center mb-6">
            <FiLink className="w-5 h-5 text-purple-400 mr-3" />
            <h4 className="text-lg font-bold text-white">Project Links</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {input("GitHub Repository", "githubLink", "https://github.com/username/repo", {
                required: "GitHub link is required",
                pattern: {
                  value: /https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?/i,
                  message: "Enter a valid GitHub URL",
                },
              }, FiGithub)}
            </div>
            <div>
              {input("Live Demo", "projectLink", "https://your-project.com", {
                required: "Project link is required",
                pattern: {
                  value: /https?:\/\/[^\s]+/i,
                  message: "Enter a valid URL",
                },
              }, FiGlobe)}
            </div>
          </div>
        </motion.div>

        {/* Upload Progress */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center mb-4">
                <FiUpload className="w-5 h-5 text-purple-400 mr-3 animate-pulse" />
                <span className="text-sm font-bold text-white">
                  {projectState.mode === "add" ? "Uploading Project..." : "Updating Project..."}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">{uploadProgress}% complete</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {projectState.mode === "add" ? (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  <span>Save Project</span>
                </>
              )}
            </motion.button>
          ) : (
            <>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4" />
                    <span>Update Project</span>
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDeleteProject(projectState.currentProjectId)}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl text-sm font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-red-500/25"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </motion.button>
            </>
          )}
        </div>
      </form>

      {/* Quick Tips */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-bold text-white">Project Tips</h4>
        </div>
        <ul className="text-sm text-gray-300 space-y-3">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            <span>Choose projects that best showcase your skills and expertise</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            <span>Include high-quality screenshots that highlight key features</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
            <span>Provide clear descriptions of your role and the technologies used</span>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep("exp")}
          className="flex items-center space-x-3 px-10 py-4 bg-white/10 text-gray-300 rounded-2xl hover:bg-white/20 transition-all duration-200 font-bold text-sm"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep("nextStep")}
          className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-bold text-sm shadow-2xl shadow-purple-500/25"
        >
          <span>Continue</span>
          <FiArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
