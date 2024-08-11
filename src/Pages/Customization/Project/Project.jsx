import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProjectContext } from "../../../context/ProjectContext";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import ref from firebase/storage
import { collection, doc, setDoc } from "firebase/firestore";

export default function Project({ step, setStep }) {
  const [user] = useAuthState(auth);

  const [projects, setProjects] = useContext(ProjectContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(projects);
  // Through useEffect fetch project details of the current user
  // console.log("Project Details ", projects);

  const onSubmit = async (data) => {
    try {
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

      // You can update the context or proceed to the next step here
      setStep("nextStep"); // Replace with the actual step you want to navigate to

      console.log("Project details saved successfully with ID:", projectID);
    } catch (error) {
      console.error("Error saving project details:", error);
    }
  };

  const input = (label, Name, HelperText = "", validationRules = {}) => {
    return (
      <div className="mb-4">
        <label htmlFor={Name} className="text-sm font-medium text-gray-200">
          {label}
        </label>
        <input
          type="text"
          id={Name}
          name={Name}
          {...register(Name, validationRules)}
          className={`border-2 text-sm border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full ${
            errors[Name] ? "border-red-500" : ""
          }`}
        />
        <p className="mt-1 text-xs text-gray-400">{HelperText}</p>
        {errors[Name] && (
          <p className="mt-1 text-xs text-red-500">{errors[Name].message}</p>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section id="projects" className="overflow-y-scroll h-96 scroll px-1">
        <h3 className="text-xl font-semibold mt-6 mb-4">Projects</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="text-sm font-medium text-gray-200"
              htmlFor="about"
            >
              Write about your project
            </label>
            <textarea
              id="about"
              {...register("about", { required: "This field is required" })}
              className={`border-2 border-zinc-800 text-sm mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full ${
                errors.about ? "border-red-500" : ""
              }`}
              rows={5}
              type="text"
              placeholder="Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively."
            />
            {errors.about && (
              <p className="mt-1 text-xs text-red-500">
                {errors.about.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            {input(
              "Project Title",
              "projectTitle",
              "Enter the name of your project",
              { required: "Project title is required" }
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-200"
              htmlFor="projectDescription"
            >
              Project Description
            </label>
            <textarea
              id="projectDescription"
              {...register("projectDescription", {
                required: "Project description is required",
              })}
              className={`border-2 text-sm border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full ${
                errors.projectDescription ? "border-red-500" : ""
              }`}
              rows={5}
              type="text"
            />
            {errors.projectDescription && (
              <p className="mt-1 text-xs text-red-500">
                {errors.projectDescription.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <input
              type="file"
              {...register("projectFile", {
                required: "Project file is required",
                validate: {
                  acceptedFormats: (files) => {
                    const acceptedFormats = ["image/jpeg", "image/png"];
                    return (
                      (files &&
                        files[0] &&
                        acceptedFormats.includes(files[0].type)) ||
                      "Only JPG/PNG files are accepted"
                    );
                  },
                },
              })}
              className={`block w-full text-sm text-gray-300 rounded-md py-2 px-2 focus:outline-none hover:ring-1 hover:ring-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 border border-zinc-800 ${
                errors.projectFile ? "border-red-500" : ""
              }`}
            />
            {errors.projectFile && (
              <p className="mt-1 text-xs text-red-500">
                {errors.projectFile.message}
              </p>
            )}
          </div>

          <div className="w-full flex mt-4">
            <div className="w-full pr-2">
              {input("GitHub Link", "githubLink", "", {
                required: "GitHub link is required",
                pattern: {
                  value: /https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?/i,
                  message: "Enter a valid GitHub URL",
                },
              })}
            </div>
            <div className="w-full pl-2">
              {input("Project Link", "projectLink", "", {
                required: "Project link is required",
                pattern: {
                  value: /https?:\/\/[^\s]+/i,
                  message: "Enter a valid URL",
                },
              })}
            </div>
          </div>

          <div className="w-full flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setStep("exp")}
              className="px-6 py-2 text-sm bg-gray-500 rounded font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm bg-indigo-500 rounded font-semibold"
            >
              Next
            </button>
          </div>
        </form>
      </section>
    </motion.div>
  );
}
