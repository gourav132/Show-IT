import React, { useState, useEffect, useContext } from "react";
import { useRenderCount } from "@uidotdev/usehooks";
import { auth, db } from "../../firebase/config";
import { logout } from "../../firebase/config";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";

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

import { IoMdLogOut } from "react-icons/io";
import { IoMdSave } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

import Modal from "../../components/Modals/Modal";

export default function Customize() {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  // const renderCount = useRenderCount();
  // console.log("Render Count --> ", renderCount);
  const [isExpanded, setIsExpand] = useState(false);
  const [previewStyle, setPreviewStyle] = useState({
    previewWidth: "60%",
    previewScale: "89%",
    previewPosition: "absolute",
  });
  const [step, setStep] = useState("intro");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [loading, user]);

  const handlePreview = () => {
    setIsExpand(true);
    setPreviewStyle({
      previewWidth: "100%",
      previewScale: "100%",
      previewPosition: "absolute",
    });
  };

  const handleBackPreview = () => {
    setIsExpand(false);
    setPreviewStyle({
      previewWidth: "60%",
      previewScale: "89%",
      previewPosition: "absolute",
    });
  };

  const copyURL = () => {
    copy(previewData.publicURL);
    alert("Public url copied to clipboard");
  };

  async function handleSubmitButton() {
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");

      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);
      if (userDoc) {
        const userRef = userDoc.ref;
        await updateDoc(userRef, { previewData });
        console.log("Preview data added to the document!");
      } else {
        console.error("Document with the given UID not found.");
        // Handle the case where the document is not found
      }
    } catch (error) {
      console.error("Error adding preview data:", error);
      // Handle errors appropriately
    }
  }

  return (
    <>
      {loading || !user ? (
        <div className="login">
          {" "}
          <ReactLoading type="bubbles" height={"80px"} width={"80px"} />{" "}
        </div>
      ) : (
        <div className="w-full h-screen flex">
          {/* <Modal /> */}
          <div className="w-full lg:w-2/5 scroll h-screen overflow-y-scroll flex justify-center items-center">
            <div className="m-10">
              <div className="mb-6 flex w-full">
                <div>
                  <h1 className="text-2xl font-light">
                    Customize your{" "}
                    <span className="text-violet-400">portfoilio</span> in just
                    few steps
                  </h1>
                  <p className="font-light mt-2 text-gray-400">
                    Effortless elegance. Your skills, our canvas.
                  </p>
                </div>
                <button
                  onClick={copyURL}
                  className="px-4 bg-purple-500 rounded-md ml-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-link"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </button>
              </div>

              <AnimatePresence>
                {step === "intro" && (
                  <Introduction step={step} setStep={setStep} />
                )}
                {step === "overview" && (
                  <Overview step={step} setStep={setStep} />
                )}
                {step === "exp" && <Experience step={step} setStep={setStep} />}
                {step === "project" && (
                  <Project step={step} setStep={setStep} />
                )}
              </AnimatePresence>

              <div className="bottom-10 right-10 z-10 absolute flex flex-col justify-center items-center gap-4">
                <button
                  onClick={handlePreview}
                  className="px-4 py-4 bg-purple-600 font-semibold hover:bg-purple-700 rounded-full block"
                >
                  <FaPlay />
                </button>
                <button
                  onClick={handleSubmitButton}
                  className="px-4 py-4 bg-green-600 hover:bg-green-700 rounded-full block"
                >
                  <IoMdSave />
                </button>
                <button
                  onClick={logout}
                  className="py-4 px-4 rounded-full text-red-400 border-2 border-red-400 hover:text-white hover:bg-red-500 transition-colors block"
                >
                  <IoMdLogOut />
                </button>
              </div>
            </div>
          </div>

          <motion.div
            className="hidden lg:block scroll"
            style={{
              right: 0,
              position: previewStyle.previewPosition,
              width: previewStyle.previewWidth,
              height: "100vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
              scale: previewStyle.previewScale,
              borderRadius: "13px",
              transition: "all 1s",
            }}
          >
            <div style={{ zoom: "66%", scrollbarWidth: "none" }}>
              <Preview
                isExpanded={isExpanded}
                handleBackPreview={handleBackPreview}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
