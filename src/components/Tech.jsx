import React, { useContext } from "react";

import { StaticTechDisplay } from "./index";
import { SectionWrapper } from "../hoc";
import { PreviewContext } from "../context/PreviewContext";
import { technologies } from "../constants";

const Tech = () => {
  const [previewData] = useContext(PreviewContext);
  
  // Use custom skills if available, otherwise fall back to default technologies
  const displaySkills = previewData.skills && previewData.skills.length > 0 
    ? previewData.skills 
    : technologies;

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {displaySkills.map((skill) => (
        <StaticTechDisplay 
          key={skill.name || skill.id} 
          icon={skill.icon} 
          name={skill.name} 
          level={skill.level}
        />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");