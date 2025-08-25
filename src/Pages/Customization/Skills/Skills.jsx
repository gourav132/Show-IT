import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PreviewContext } from "../../../context/PreviewContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCode, 
  FiPlus, 
  FiTrash2, 
  FiEdit3, 
  FiSave, 
  FiArrowLeft, 
  FiArrowRight,
  FiAlertCircle,
  FiCheck,
  FiZap,
  FiDatabase,
  FiServer,
  FiCloud,
  FiSmartphone,
  FiMonitor,
  FiLayers,
  FiBox,
  FiGlobe,
  FiShield,
  FiTrendingUp,
  FiImage,
  FiSettings,
  FiGitBranch,
  FiPackage
} from "react-icons/fi";
import { technologies } from "../../../constants";

// Skill-specific icons with colors
const skillIcons = {
  // Programming Languages
  "JavaScript": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    bgColor: "#F7DF1E20"
  },
  "TypeScript": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    bgColor: "#3178C620"
  },
  "Python": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
    bgColor: "#3776AB20"
  },
  "Java": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#ED8B00",
    bgColor: "#ED8B0020"
  },
  "C++": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    color: "#00599C",
    bgColor: "#00599C20"
  },
  "C#": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    color: "#239120",
    bgColor: "#23912020"
  },
  "PHP": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#777BB4",
    bgColor: "#777BB420"
  },
  "Ruby": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    color: "#CC342D",
    bgColor: "#CC342D20"
  },
  "Go": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    color: "#00ADD8",
    bgColor: "#00ADD820"
  },
  "Rust": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    color: "#CE422B",
    bgColor: "#CE422B20"
  },
  "Swift": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    color: "#F05138",
    bgColor: "#F0513820"
  },
  "Kotlin": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    color: "#7F52FF",
    bgColor: "#7F52FF20"
  },

  // Frontend Frameworks
  "React.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    bgColor: "#61DAFB20"
  },
  "React": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    bgColor: "#61DAFB20"
  },
  "Vue.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: "#4FC08D",
    bgColor: "#4FC08D20"
  },
  "Vue": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: "#4FC08D",
    bgColor: "#4FC08D20"
  },
  "Angular": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    color: "#DD0031",
    bgColor: "#DD003120"
  },
  "Svelte": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    color: "#FF3E00",
    bgColor: "#FF3E0020"
  },
  "Next.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
    bgColor: "#00000020"
  },
  "Nuxt.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
    color: "#00DC82",
    bgColor: "#00DC8220"
  },

  // Backend & Server
  "Node.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    bgColor: "#33993320"
  },
  "Express.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
    bgColor: "#00000020"
  },
  "Express": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
    bgColor: "#00000020"
  },
  "Django": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    color: "#092E20",
    bgColor: "#092E2020"
  },
  "Flask": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    color: "#000000",
    bgColor: "#00000020"
  },
  "Laravel": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    color: "#FF2D20",
    bgColor: "#FF2D2020"
  },
  "Spring": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    color: "#6DB33F",
    bgColor: "#6DB33F20"
  },
  "FastAPI": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    color: "#009688",
    bgColor: "#00968820"
  },
  "ASP.NET": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
    color: "#512BD4",
    bgColor: "#512BD420"
  },

  // Databases
  "MongoDB": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    bgColor: "#47A24820"
  },
  "PostgreSQL": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
    bgColor: "#33679120"
  },
  "MySQL": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
    bgColor: "#4479A120"
  },
  "SQLite": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    color: "#003B57",
    bgColor: "#003B5720"
  },
  "Redis": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    color: "#DC382D",
    bgColor: "#DC382D20"
  },
  "Firebase": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
    bgColor: "#FFCA2820"
  },
  "Supabase": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    color: "#3ECF8E",
    bgColor: "#3ECF8E20"
  },

  // Cloud & DevOps
  "AWS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    color: "#FF9900",
    bgColor: "#FF990020"
  },
  "Azure": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    color: "#0089D6",
    bgColor: "#0089D620"
  },
  "Google Cloud": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    color: "#4285F4",
    bgColor: "#4285F420"
  },
  "Docker": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
    bgColor: "#2496ED20"
  },
  "Kubernetes": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    color: "#326CE5",
    bgColor: "#326CE520"
  },
  "Jenkins": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    color: "#D33833",
    bgColor: "#D3383320"
  },
  "GitHub Actions": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#181717",
    bgColor: "#18171720"
  },
  "CI/CD": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#181717",
    bgColor: "#18171720"
  },

  // Mobile Development
  "React Native": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    bgColor: "#61DAFB20"
  },
  "Flutter": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "#02569B",
    bgColor: "#02569B20"
  },
  "iOS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    color: "#000000",
    bgColor: "#00000020"
  },
  "Android": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    color: "#3DDC84",
    bgColor: "#3DDC8420"
  },
  "Xamarin": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg",
    color: "#3498DB",
    bgColor: "#3498DB20"
  },

  // Design & UI/UX
  "Figma": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
    bgColor: "#F24E1E20"
  },
  "Adobe XD": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
    color: "#FF61F6",
    bgColor: "#FF61F620"
  },
  "Sketch": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
    color: "#F7B500",
    bgColor: "#F7B50020"
  },
  "Photoshop": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    color: "#31A8FF",
    bgColor: "#31A8FF20"
  },
  "Illustrator": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
    color: "#FF9A00",
    bgColor: "#FF9A0020"
  },
  "InDesign": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/indesign/indesign-plain.svg",
    color: "#FF3366",
    bgColor: "#FF336620"
  },

  // Version Control
  "Git": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    bgColor: "#F0503220"
  },
  "GitHub": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#181717",
    bgColor: "#18171720"
  },
  "GitLab": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    color: "#FCA326",
    bgColor: "#FCA32620"
  },
  "Bitbucket": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
    color: "#0052CC",
    bgColor: "#0052CC20"
  },

  // Web Technologies
  "HTML": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
    bgColor: "#E34F2620"
  },
  "CSS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
    bgColor: "#1572B620"
  },
  "Sass": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    color: "#CC6699",
    bgColor: "#CC669920"
  },
  "Less": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg",
    color: "#1D365D",
    bgColor: "#1D365D20"
  },
  "Tailwind CSS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    color: "#06B6D4",
    bgColor: "#06B6D420"
  },
  "Bootstrap": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "#7952B3",
    bgColor: "#7952B320"
  },
  "Material-UI": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    color: "#0081CB",
    bgColor: "#0081CB20"
  },
  "Ant Design": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/antdesign/antdesign-original.svg",
    color: "#0170FE",
    bgColor: "#0170FE20"
  },

  // Testing
  "Jest": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    color: "#C21325",
    bgColor: "#C2132520"
  },
  "Cypress": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-plain.svg",
    color: "#17202C",
    bgColor: "#17202C20"
  },
  "Selenium": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
    color: "#43B02A",
    bgColor: "#43B0220"
  },
  "Testing": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    color: "#C21325",
    bgColor: "#C2132520"
  },

  // Other Technologies
  "GraphQL": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "#E10098",
    bgColor: "#E1009820"
  },
  "REST API": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
    color: "#D22128",
    bgColor: "#D2212820"
  },
  "Webpack": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    color: "#8DD6F9",
    bgColor: "#8DD6F920"
  },
  "Vite": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    color: "#646CFF",
    bgColor: "#646CFF20"
  },
  "Babel": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
    color: "#F9DC3E",
    bgColor: "#F9DC3E20"
  },
  "ESLint": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
    color: "#4B32C3",
    bgColor: "#4B32C320"
  },
  "Prettier": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
    color: "#F7B93E",
    bgColor: "#F7B93E20"
  },
  "npm": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    color: "#CB3837",
    bgColor: "#CB383720"
  },
  "yarn": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
    color: "#2C8EBB",
    bgColor: "#2C8EBB20"
  },
  "pnpm": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    color: "#F69220",
    bgColor: "#F6922020"
  }
};

// Predefined popular skills for quick add
const popularSkills = [
  { name: "React.js", level: "Advanced" },
  { name: "JavaScript", level: "Advanced" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "Node.js", level: "Advanced" },
  { name: "Python", level: "Intermediate" },
  { name: "AWS", level: "Intermediate" },
  { name: "Docker", level: "Intermediate" },
  { name: "MongoDB", level: "Advanced" },
  { name: "PostgreSQL", level: "Intermediate" },
  { name: "Git", level: "Advanced" },
  { name: "Figma", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Advanced" }
];

// Icon component mapping for fallback
const iconComponents = {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiSmartphone,
  FiMonitor,
  FiLayers,
  FiBox,
  FiGlobe,
  FiShield,
  FiTrendingUp,
  FiImage,
  FiSettings,
  FiGitBranch,
  FiPackage
};

export default function Skills({ step, setStep }) {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [skillState, setSkillState] = useState({
    mode: "add", // "add" or "edit"
    editingSkillId: null,
  });

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
      skillName: "",
      skillIcon: "",
      skillLevel: "Intermediate"
    }
  });

  // Watch form values
  const watchedValues = watch();

  // Set initial values when component mounts
  useEffect(() => {
    setValue("skillName", "");
    setValue("skillIcon", "");
    setValue("skillLevel", "Intermediate");
  }, []);

  // Get icon for skill name
  const getIconForSkill = (skillName) => {
    const skillData = skillIcons[skillName];
    if (skillData) {
      return {
        type: "image",
        src: skillData.icon,
        color: skillData.color,
        bgColor: skillData.bgColor
      };
    }
    // Fallback to component icon
    return {
      type: "component",
      component: FiCode,
      color: "#3B82F6",
      bgColor: "#3B82F620"
    };
  };

  const handleAddSkill = async (data) => {
    try {
      const isValid = await trigger();
      if (!isValid) return;

      const iconData = getIconForSkill(data.skillName);
      const newSkill = {
        id: Date.now(),
        name: data.skillName,
        icon: iconData,
        level: data.skillLevel,
        addedAt: new Date().toISOString()
      };

      setPreviewData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill]
      }));
      
      setSkillState({ ...skillState, mode: "add" });
      reset();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDeleteSkill = (id) => {
    const filteredSkills = previewData.skills.filter(skill => skill.id !== id);
    setPreviewData({ ...previewData, skills: filteredSkills });
  };

  const handleEditSkill = (skill) => {
    setSkillState({ mode: "edit", editingSkillId: skill.id });
    setValue("skillName", skill.name);
    setValue("skillIcon", skill.icon);
    setValue("skillLevel", skill.level);
  };

  const handleUpdateSkill = async (data) => {
    try {
      const isValid = await trigger();
      if (!isValid) return;

      const iconData = getIconForSkill(data.skillName);
      const updatedSkills = previewData.skills.map(skill => 
        skill.id === skillState.editingSkillId 
          ? {
              ...skill,
              name: data.skillName,
              icon: iconData,
              level: data.skillLevel,
              updatedAt: new Date().toISOString()
            }
          : skill
      );

      setPreviewData({ ...previewData, skills: updatedSkills });
      setSkillState({ mode: "add", editingSkillId: null });
      reset();
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const handleContinue = async () => {
    setStep("exp");
  };

  const handleQuickAdd = (skill) => {
    const iconData = getIconForSkill(skill.name);
    const newSkill = {
      id: Date.now(),
      name: skill.name,
      icon: iconData,
      level: skill.level,
      addedAt: new Date().toISOString()
    };

    setPreviewData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill]
    }));
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case "Beginner": return "from-green-500 to-emerald-500";
      case "Intermediate": return "from-yellow-500 to-orange-500";
      case "Advanced": return "from-red-500 to-pink-500";
      case "Expert": return "from-purple-500 to-indigo-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const renderSkillIcon = (iconData, size = "w-5 h-5") => {
    if (iconData.type === "image") {
      return (
        <img
          src={iconData.src}
          alt="skill icon"
          className={`${size} object-contain filter drop-shadow-sm`}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      );
    } else if (iconData.type === "component") {
      return React.createElement(iconData.component, {
        className: `${size} text-white`
      });
    }
    return null;
  };

  const input = (label, name, helperText = "", icon = null, placeholder = "", validationRules = {}) => {
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
            type="text"
            id={name}
            placeholder={placeholder}
            className={`w-full px-4 py-3.5 bg-white/5 border rounded-2xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-white/20 ${
              Icon ? 'pl-12' : ''
            } ${
              hasError 
                ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                : 'border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50'
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
      className="space-y-7"
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-18 h-18 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-blue-500/25">
          <FiCode className="w-9 h-9 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Skills & Technologies</h3>
        <p className="text-gray-400 text-base">Showcase your technical expertise</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add/Edit Skill Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
              <FiPlus className="w-5 h-5 mr-2" />
              {skillState.mode === "add" ? "Add New Skill" : "Edit Skill"}
            </h4>
            
            <form onSubmit={handleSubmit(skillState.mode === "add" ? handleAddSkill : handleUpdateSkill)} className="space-y-4">
              {input(
                "Skill Name",
                "skillName",
                "Enter the name of the technology or skill. Original colorful icons will be automatically assigned based on the skill name.",
                FiCode,
                "e.g., React.js, Python, AWS",
                {
                  required: "Skill name is required",
                  minLength: {
                    value: 2,
                    message: "Skill name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Skill name must be less than 50 characters"
                  }
                }
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  Skill Level <span className="text-red-400">*</span>
                </label>
                <select
                  {...register("skillLevel", { required: "Skill level is required" })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:border-white/20"
                  disabled={isSubmitting}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || !isValid}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-200 font-semibold text-sm shadow-lg ${
                    isSubmitting || !isValid
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      {skillState.mode === "add" ? <FiPlus className="w-4 h-4" /> : <FiSave className="w-4 h-4" />}
                      <span>{skillState.mode === "add" ? "Add Skill" : "Update Skill"}</span>
                    </>
                  )}
                </motion.button>

                {skillState.mode === "edit" && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSkillState({ mode: "add", editingSkillId: null });
                      reset();
                    }}
                    className="px-4 py-3 bg-white/10 text-gray-300 rounded-2xl hover:bg-white/20 transition-all duration-200 font-semibold text-sm"
                  >
                    Cancel
                  </motion.button>
                )}
              </div>
            </form>
          </div>

          {/* Quick Add Popular Skills */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-green-500/25">
                <FiPlus className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-base font-bold text-white">Quick Add Popular Skills</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {popularSkills.map((skill, index) => {
                const isAdded = previewData.skills?.some(s => s.name === skill.name);
                const iconData = getIconForSkill(skill.name);
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !isAdded && handleQuickAdd(skill)}
                    disabled={isAdded}
                    className={`p-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isAdded
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-not-allowed'
                        : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {renderSkillIcon(iconData, "w-3 h-3")}
                    <span>{skill.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/25">
                <FiZap className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-base font-bold text-white">Tips</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Add skills that are relevant to your target role</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Be honest about your skill levels</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Original colorful icons are automatically assigned</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Skills List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-bold text-white mb-4">Your Skills ({previewData.skills?.length || 0})</h4>
          
          <AnimatePresence>
            {previewData.skills && previewData.skills.length > 0 ? (
              <div className="space-y-3">
                {previewData.skills.map((skill) => {
                  const iconData = skill.icon || getIconForSkill(skill.name);
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}
                            style={{ 
                              backgroundColor: iconData.bgColor || '#3B82F620',
                              border: `1px solid ${iconData.color || '#3B82F6'}40`
                            }}
                          >
                            {renderSkillIcon(iconData, "w-5 h-5")}
                          </div>
                          <div>
                            <h5 className="font-semibold text-white text-sm">{skill.name}</h5>
                            <span className="text-xs text-gray-400">{skill.level}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditSkill(skill)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-xl transition-all duration-200"
                            title="Edit skill"
                          >
                            <FiEdit3 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200"
                            title="Delete skill"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              >
                <FiCode className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">No skills added yet. Start by adding your first skill!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-7">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep("overview")}
          disabled={isSubmitting}
          className="flex items-center space-x-3 px-9 py-3.5 bg-white/10 text-gray-300 rounded-2xl hover:bg-white/20 transition-all duration-200 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="flex items-center space-x-3 px-9 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-bold text-sm shadow-2xl shadow-blue-500/25"
        >
          <span>Continue</span>
          <FiArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
