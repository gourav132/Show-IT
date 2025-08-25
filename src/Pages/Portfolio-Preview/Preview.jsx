import React, { useContext, memo } from "react";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Experience from "../../components/Experience";
import Tech from "../../components/Tech";
import Works from "../../components/Works";
import Contact from "../../components/Contact";
import StaticBackground from "../../components/StaticBackground";
import { PreviewContext } from "../../context/PreviewContext";
import { useLocation } from "react-router-dom";

const Preview = memo(({ isExpanded, handleBackPreview }) => {
  const location = useLocation();

  return (
    <div className="transform-gpu">
      <div 
        style={{ 
          zoom: "90%",
          transform: "translateZ(0)",
          willChange: "transform"
        }} 
        className="relative z-0 bg-primary"
      >
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Hero />
        </div>

        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StaticBackground />
        </div>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
