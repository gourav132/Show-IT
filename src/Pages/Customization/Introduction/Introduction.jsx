import React, { useContext } from "react";
import { PreviewContext } from "../../../context/PreviewContext";
import { motion, AnimatePresence } from "framer-motion";
import { amber } from "@mui/material/colors";

export default function Introduction({ step, setStep }) {
  const [previewData, setPreviewData] = useContext(PreviewContext);

  const handleChange = (e) => {
    setPreviewData({ ...previewData, [e.target.name]: e.target.value });
  };

  const input = (label, Name, HelperText = "") => {
    return (
      <div className="mb-4">
        <label htmlFor={Name} className="text-sm font-medium text-gray-200">
          {label}
        </label>
        <input
          type="text"
          id={Name}
          name={Name}
          className="border bg-zinc-900 text-sm border-zinc-800 mt-0.5 rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full"
          onChange={handleChange}
          value={previewData[Name]}
        />
        <p className="mt-1 text-xs text-gray-400">{HelperText}</p>
      </div>
    );
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h3 className="text-xl font-semibold mb-4">Introduction</h3>
        {input(
          "Display Name",
          "displayName",
          "Enter the name you want to display"
        )}
        {input("Tag Line", "tagline", "Enter a catchy tag line")}

        <div className="w-full flex justify-end">
          <button
            className="px-6 py-2 bg-purple-400 hover:bg-purple-500 rounded font-semibold"
            onClick={() => setStep("overview")}
          >
            Next
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
