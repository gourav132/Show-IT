import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  if (loading || user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ReactLoading type="bubbles" height="40px" width="40px" color="#8b5cf6" />
      </div>
    );
  }

  const onSubmit = async (data) => {
    setIsLoggingIn(true);
    setError("");
    
    try {
      await logInWithEmailAndPassword(data.email, data.password);
      const from = location.state?.from?.pathname || "/control-center";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const from = location.state?.from?.pathname || "/control-center";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen w-8/12 m-auto bg-black text-white flex items-center justify-center relative">
      {/* Minimal Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.03),transparent_50%)]"></div>
      </div>

      {/* Minimal Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6"
      >
        <Link to="/" className="flex items-center space-x-1.5 text-white hover:text-purple-400 transition-colors duration-300">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">F</span>
          </div>
          <span className="text-sm font-medium">BuildFolio</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xs">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/20 backdrop-blur-sm border border-gray-800/30 rounded-xl p-6"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold text-white mb-1"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-xs"
            >
              Sign in to continue
            </motion.p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-xs"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-3 h-3" />
                <input
                  type="email"
                  id="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email"
                    }
                  })}
                  className="w-full bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-md pl-7 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 text-xs"
                  placeholder="Enter email"
                />
              </div>
              {errors.email && (
                <p className="mt-0.5 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-3 h-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters"
                    }
                  })}
                  className="w-full bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-md pl-7 pr-8 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 text-xs"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-0.5 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/reset"
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoggingIn}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-1.5 text-xs"
            >
              {isLoggingIn ? (
                <>
                  <ReactLoading type="spin" height="10px" width="10px" color="#ffffff" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="w-3 h-3" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-700/50"></div>
            <span className="px-3 text-gray-500 text-xs">or</span>
            <div className="flex-1 border-t border-gray-700/50"></div>
          </div>

          {/* Google Sign In */}
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-white/5 backdrop-blur-sm border border-gray-700/30 text-white font-medium py-2 px-4 rounded-md hover:bg-white/10 hover:border-gray-600/40 transition-all duration-200 flex items-center justify-center space-x-2 text-xs"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </motion.button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
