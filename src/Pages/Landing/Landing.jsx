import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiPlay, FiUsers, FiStar, FiMessageSquare, FiArrowRight, FiZap, FiShield, FiSmartphone, FiCode } from "react-icons/fi";

const features = [
  {
    title: "Multiple Portfolio Designs",
    description: "Choose from various modern portfolio templates to showcase your work professionally.",
    gradient: "from-purple-500 to-blue-500",
    icon: FiCode,
    delay: 0.1,
  },
  {
    title: "Easy Content Management",
    description: "Update your portfolio content, projects, and information through our intuitive interface.",
    gradient: "from-green-500 to-teal-500",
    icon: FiZap,
    delay: 0.2,
  },
  {
    title: "Responsive Design",
    description: "Your portfolio looks perfect on all devices - desktop, tablet, and mobile.",
    gradient: "from-orange-500 to-red-500",
    icon: FiSmartphone,
    delay: 0.3,
  },
  {
    title: "Secure & Reliable",
    description: "Your data is protected with industry-standard security measures and 99.9% uptime.",
    gradient: "from-indigo-500 to-purple-500",
    icon: FiShield,
    delay: 0.4,
  },
];

const stats = [
  { number: "1000+", label: "Portfolios Created", icon: FiUsers, delay: 0.1 },
  { number: "50+", label: "Design Templates", icon: FiStar, delay: 0.2 },
  { number: "24/7", label: "Support Available", icon: FiMessageSquare, delay: 0.3 },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    content: "BuildFolio helped me create a stunning portfolio that landed me my dream job. The templates are beautiful and the customization options are endless.",
    rating: 5,
    delay: 0.1,
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    content: "The best portfolio builder I've ever used. Fast, reliable, and the designs are absolutely gorgeous. Highly recommended!",
    rating: 5,
    delay: 0.2,
  },
  {
    name: "Emily Rodriguez",
    role: "Full Stack Developer",
    content: "Creating my portfolio was a breeze with BuildFolio. The interface is intuitive and the results are professional.",
    rating: 5,
    delay: 0.3,
  },
];

const benefits = [
  "No credit card required",
  "Free forever plan",
  "Setup in 5 minutes",
  "Professional templates",
  "Mobile responsive",
  "24/7 support"
];

function Landing() {
  return (
    <div className="min-h-screen w-8/12 m-auto bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-1 h-1 bg-blue-500 rounded-full opacity-40"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-green-500 rounded-full opacity-50"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            BuildFolio
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center px-3 py-1 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-xs text-gray-300 mb-6">
            <FiStar className="w-3 h-3 text-yellow-400 mr-1" />
            Trusted by 1000+ professionals worldwide
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Build Your Professional
          <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            Portfolio
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Create stunning portfolios that showcase your work, skills, and achievements.
          Stand out from the crowd with our modern, responsive templates.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Link
            to="/register"
            className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Start Building Free</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/portfolio"
            className="group border-2 border-gray-700 text-white px-8 py-3 rounded-lg hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
          >
            <FiPlay className="w-4 h-4" />
            <span>View Demo</span>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-1">
              <FiCheck className="w-3 h-3 text-green-400" />
              <span>{benefit}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose BuildFolio?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful features to create the perfect portfolio that gets you noticed.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              className="group relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what our users have to say about their experience with BuildFolio.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: testimonial.delay }}
              viewport={{ once: true }}
              className="group bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-xl p-6 hover:bg-gray-900/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Portfolio?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already created stunning portfolios with BuildFolio.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105"
            >
              <span>Get Started Today</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-4 md:mb-0"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-sm font-bold text-white">BuildFolio</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex space-x-6 text-sm text-gray-400"
          >
            <Link to="/terms" className="hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          © 2024 BuildFolio. All rights reserved.
        </motion.div>
      </footer>
    </div>
  );
}

export default Landing;
