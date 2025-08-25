import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import ReactLoading from "react-loading";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewContext } from "../../context/PreviewContext";

import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGlobe, FiGithub, FiLinkedin, FiTwitter,
  FiInstagram, FiFacebook, FiYoutube, FiDribbble, FiSave, FiEye, FiEyeOff,
  FiLock, FiSettings, FiCheck, FiX, FiHome, FiLogOut, FiShield, FiBell, FiTrash2
} from "react-icons/fi";

export default function Settings() {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    email: "", phone: "", location: "", website: ""
  });

  // Social Media Links
  const [socialLinks, setSocialLinks] = useState({
    github: "", linkedin: "", twitter: "", instagram: "", 
    facebook: "", youtube: "", dribbble: ""
  });

  // Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "", newPassword: "", confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false, new: false, confirm: false
  });

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true, portfolioPublic: true, autoSave: true
  });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      return;
    }
    loadUserSettings();
  }, [loading, user, navigate]);

  const loadUserSettings = async () => {
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");
      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);
      
      if (userDoc) {
        const userData = userDoc.data();
        if (userData.contactInfo) setContactInfo(userData.contactInfo);
        if (userData.socialLinks) setSocialLinks(userData.socialLinks);
        if (userData.accountSettings) setAccountSettings(userData.accountSettings);
      }
    } catch (error) {
      console.error("Error loading user settings:", error);
      showErrorMessage("Failed to load settings");
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");
      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);
      
      if (userDoc) {
        const userRef = userDoc.ref;
        await updateDoc(userRef, {
          contactInfo, socialLinks, accountSettings, updatedAt: new Date()
        });

        // Update preview data
        const updatedPreviewData = {
          ...previewData,
          contact: {
            ...previewData.contact,
            email: contactInfo.email,
            phone: contactInfo.phone,
            address: contactInfo.location,
            website: contactInfo.website
          },
          socials: socialLinks
        };
        setPreviewData(updatedPreviewData);
        showSuccessMessage("Settings saved successfully!");
      } else {
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
          uid: user.uid, contactInfo, socialLinks, accountSettings,
          createdAt: new Date(), updatedAt: new Date()
        });
        showSuccessMessage("Settings saved successfully!");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      showErrorMessage("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showErrorMessage("New passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showErrorMessage("Password must be at least 6 characters");
      return;
    }

    setIsSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordData.newPassword);
      
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === "auth/wrong-password") {
        showErrorMessage("Current password is incorrect");
      } else {
        showErrorMessage("Failed to change password");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const showSuccessMessage = (message) => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const socialPlatforms = [
    { key: "github", label: "GitHub", icon: FiGithub, color: "hover:text-gray-800" },
    { key: "linkedin", label: "LinkedIn", icon: FiLinkedin, color: "hover:text-blue-600" },
    { key: "twitter", label: "Twitter", icon: FiTwitter, color: "hover:text-blue-400" },
    { key: "instagram", label: "Instagram", icon: FiInstagram, color: "hover:text-pink-500" },
    { key: "facebook", label: "Facebook", icon: FiFacebook, color: "hover:text-blue-600" },
    { key: "youtube", label: "YouTube", icon: FiYoutube, color: "hover:text-red-600" },
    { key: "dribbble", label: "Dribbble", icon: FiDribbble, color: "hover:text-pink-500" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen w-8/12 m-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
            <FiSettings className="w-6 h-6 text-white animate-spin" />
          </div>
          <p className="text-gray-400 text-xs">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-10/12 m-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.05),transparent_50%)]"></div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-xs"
          >
            <FiCheck className="w-3 h-3" />
            <span>Settings saved!</span>
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-xs"
          >
            <FiX className="w-3 h-3" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <FiSettings className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Settings</span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                title="Save Settings"
              >
                {isSaving ? (
                  <ReactLoading type="spin" height="12px" width="12px" color="#8b5cf6" />
                ) : (
                  <FiSave className="w-3 h-3" />
                )}
              </button>
              <button
                onClick={() => navigate("/control-center")}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Home"
              >
                <FiHome className="w-3 h-3" />
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                title="Logout"
              >
                <FiLogOut className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <FiUser className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-white">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Phone</label>
                <div className="relative">
                  <FiPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Location</label>
                <div className="relative">
                  <FiMapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="text"
                    value={contactInfo.location}
                    onChange={(e) => setContactInfo({...contactInfo, location: e.target.value})}
                    className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Website</label>
                <div className="relative">
                  <FiGlobe className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="url"
                    value={contactInfo.website}
                    onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
                    className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FiGlobe className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-white">Social Media Links</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div key={platform.key}>
                    <label className="block text-xs text-gray-400 mb-1">{platform.label}</label>
                    <div className="relative">
                      <Icon className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 ${platform.color}`} />
                      <input
                        type="url"
                        value={socialLinks[platform.key]}
                        onChange={(e) => setSocialLinks({...socialLinks, [platform.key]: e.target.value})}
                        className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                        placeholder={`https://${platform.key}.com/username`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <FiLock className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-white">Change Password</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Current Password</label>
                <div className="relative">
                  <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full pl-8 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPasswords.current ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full pl-8 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showPasswords.new ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full pl-8 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showPasswords.confirm ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handlePasswordChange}
                disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                className="w-full md:w-auto px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-medium text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Changing..." : "Change Password"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FiShield className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-white">Account Settings</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiBell className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-300">Email Notifications</span>
                </div>
                <button
                  onClick={() => setAccountSettings({...accountSettings, emailNotifications: !accountSettings.emailNotifications})}
                  className={`w-8 h-4 rounded-full transition-all duration-200 ${
                    accountSettings.emailNotifications ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-all duration-200 ${
                    accountSettings.emailNotifications ? 'translate-x-4' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiGlobe className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-300">Public Portfolio</span>
                </div>
                <button
                  onClick={() => setAccountSettings({...accountSettings, portfolioPublic: !accountSettings.portfolioPublic})}
                  className={`w-8 h-4 rounded-full transition-all duration-200 ${
                    accountSettings.portfolioPublic ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-all duration-200 ${
                    accountSettings.portfolioPublic ? 'translate-x-4' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiSave className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-300">Auto Save</span>
                </div>
                <button
                  onClick={() => setAccountSettings({...accountSettings, autoSave: !accountSettings.autoSave})}
                  className={`w-8 h-4 rounded-full transition-all duration-200 ${
                    accountSettings.autoSave ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-all duration-200 ${
                    accountSettings.autoSave ? 'translate-x-4' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/20 p-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FiTrash2 className="w-3 h-3 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-red-300">Danger Zone</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-200 font-medium">Delete Account</p>
                <p className="text-xs text-red-300/70">Permanently delete your account and all data</p>
              </div>
              <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium text-xs">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
