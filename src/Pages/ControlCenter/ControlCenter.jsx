import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiEye, FiSettings, FiImage, FiUser, FiBriefcase, FiMail, FiCode, FiGrid, FiLayers, FiMonitor, FiZap, FiLogOut, FiHome } from 'react-icons/fi';
import { PreviewContext } from '../../context/PreviewContext';
import { logout } from '../../firebase/config';

const ControlCenter = () => {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [selectedDesign, setSelectedDesign] = useState('modern-dark');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const portfolioDesigns = [
    {
      id: 'modern-dark',
      name: 'Modern Dark',
      description: 'Professional dark theme',
      status: 'active',
      icon: FiMonitor
    },
    {
      id: 'minimal-light',
      name: 'Minimal Light',
      description: 'Clean and minimal design',
      status: 'coming-soon',
      icon: FiGrid
    },
    {
      id: 'creative-gradient',
      name: 'Creative Gradient',
      description: 'Bold gradient design',
      status: 'coming-soon',
      icon: FiLayers
    }
  ];

  const contentSections = [
    {
      icon: FiUser,
      title: 'Personal Info',
      description: 'Name, title, contact details',
      route: '/customize',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: FiBriefcase,
      title: 'Experience',
      description: 'Work history and projects',
      route: '/customize',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: FiImage,
      title: 'Media',
      description: 'Images and assets',
      route: '/customize',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: FiCode,
      title: 'Custom Code',
      description: 'CSS and JavaScript',
      route: '/customize',
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const quickActions = [
    {
      icon: FiEye,
      title: 'Preview',
      action: () => navigate('/preview'),
      color: 'from-purple-500/20 to-blue-500/20'
    },
    {
      icon: FiEdit,
      title: 'Customize',
      action: () => navigate('/customize'),
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: FiSettings,
      title: 'Settings',
      action: () => navigate('/settings'),
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const handleDesignSelect = (designId) => {
    setSelectedDesign(designId);
    console.log('Selected design:', designId);
  };

  return (
    <div className="min-h-screen w-8/12 m-auto bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-4 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              to="/portfolio"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Portfolio</span>
            </Link>
            <div className="w-px h-6 bg-gray-700"></div>
            <Link 
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              <FiHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/preview')}
              className="px-3 py-1.5 bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white rounded-lg hover:bg-gray-800/50 transition-all duration-300 text-sm"
            >
              Preview
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600/20 backdrop-blur-sm border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-sm flex items-center space-x-2"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Control Center</h1>
          <p className="text-gray-400 text-sm">
            Manage your portfolio design and content
          </p>
        </motion.div> */}

        {/* Portfolio Designs Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Portfolio Design</h2>
            <p className="text-gray-400 text-sm">Choose your preferred design template</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {portfolioDesigns.map((design) => (
              <motion.div
                key={design.id}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-gray-900/30 backdrop-blur-sm border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  selectedDesign === design.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-800/50 hover:border-gray-700'
                }`}
                onClick={() => handleDesignSelect(design.id)}
              >
                {design.status === 'active' && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
                )}
                {design.status === 'coming-soon' && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}

                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <design.icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{design.name}</h3>
                    <p className="text-gray-400 text-xs">{design.description}</p>
                  </div>
                </div>

                {design.status === 'coming-soon' && (
                  <div className="text-xs text-gray-500 text-center py-2">
                    Coming Soon
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Content Management</h2>
            <p className="text-gray-400 text-sm">Edit and organize your portfolio content</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {contentSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <Link 
                  to={section.route}
                  className="block bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 hover:bg-gray-800/30 hover:border-gray-700 transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{section.title}</h3>
                  <p className="text-gray-400 text-xs">{section.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>
            <p className="text-gray-400 text-sm">Common tasks and shortcuts</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                onClick={action.action}
                className={`p-4 bg-gradient-to-r ${action.color} backdrop-blur-sm border border-gray-800/50 rounded-lg hover:scale-105 hover:border-gray-700 transition-all duration-300 group text-center`}
              >
                <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-sm font-medium text-white">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ControlCenter;
