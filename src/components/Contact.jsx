import React, { useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { ContactIllustration } from "./index";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { PreviewContext } from "../context/PreviewContext";

const Contact = () => {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Adya Verma",
          from_email: form.email,
          to_email: "adyaverma.av@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSubmitStatus('success');
          setForm({
            name: "",
            email: "",
            message: "",
          });
          
          // Reset status after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          setSubmitStatus('error');
          console.error(error);
          
          // Reset status after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        }
      );
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      value: previewData.contact?.email || "your@email.com",
      link: `mailto:${previewData.contact?.email || "your@email.com"}`,
    },
    {
      icon: FiPhone,
      title: "Phone",
      value: previewData.contact?.phone || "+1 (555) 123-4567",
      link: `tel:${previewData.contact?.phone || "+15551234567"}`,
    },
    {
      icon: FiMapPin,
      title: "Location",
      value: previewData.contact?.address || "City, Country",
      link: "#",
    },
  ];

  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10">
        <div className={`xl:mt-8 flex xl:flex-row flex-col-reverse gap-6 overflow-hidden`}>
          {/* Contact Form */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75]"
          >
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <p className="text-purple-400 font-semibold text-sm mb-2">Get in touch</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Contact</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-medium">{info.title}</p>
                        <p className="text-white text-xs font-medium">{info.value}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-white font-medium text-xs">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="What's your good name?"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 text-xs"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-white font-medium text-xs">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="What's your web address?"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 text-xs"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1">
                  <label className="text-white font-medium text-xs">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="What you want to say?"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 resize-none text-xs"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-xs"
                >
                  {loading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-3 h-3" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-md"
                  >
                    <FiCheck className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 font-medium text-xs">
                      Thank you! I will get back to you as soon as possible.
                    </span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-md"
                  >
                    <FiAlertCircle className="w-3 h-3 text-red-400" />
                    <span className="text-red-400 font-medium text-xs">
                      Something went wrong. Please try again.
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Illustration */}
          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 xl:h-auto md:h-[400px] h-[250px]"
          >
            <ContactIllustration />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");