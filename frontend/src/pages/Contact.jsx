import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });
    try {
      await api.post('/contact', form);
      setStatus({ type: 'success', text: '✓ Message sent successfully! We will get back to you soon.' });
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    } catch (error) {
      setStatus({ type: 'error', text: '✗ Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: '📞', title: 'Phone', details: '+91 8960628583', link: 'tel:8960628583', color: 'from-green-500 to-emerald-500' },
    { icon: '✉️', title: 'Email', details: 'chetna.xnava@gmail.com', link: 'mailto:chetna.xnava@gmail.com', color: 'from-blue-500 to-cyan-500' },
    { icon: '📍', title: 'Address', details: 'Near Amity University, Malhaur, Lucknow-U.P 226010', link: null, color: 'from-purple-500 to-pink-500' },
  ];

  const socialLinks = [
    { name: 'WhatsApp', icon: '💬', color: 'text-green-500', url: 'https://wa.me/918960628583' },
    { name: 'Instagram', icon: '📷', color: 'text-pink-500', url: 'https://www.instagram.com/chetna.academy?igsh=dnlsM3F4bjAycjAw' },
    { name: 'Facebook', icon: '📘', color: 'text-blue-600', url: 'https://www.facebook.com/share/17aZ44sTiv/' },
    { name: 'YouTube', icon: '🎥', color: 'text-red-600', url: 'https://www.youtube.com/@Chetna_xnava' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-md`}>
                    <span className="text-xl">{info.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{info.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
>

  <a
    href="https://www.google.com/maps/place/Chetna+Academy/@26.8527366,81.0513863,17z/data=!3m1!4b1!4m6!3m5!1s0x6bba88c717ca30c1:0xa1554ea1654acfc7!8m2!3d26.8527318!4d81.0539612!16s%2Fg%2F11z605mbxk?authuser=0&entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >

    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer">
      
      <div className="text-center">
        <span className="text-4xl mb-2 block">📍</span>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Map View
        </p>

        <p className="text-gray-400 dark:text-gray-500 text-xs">
          Near Amity University, Malhaur
        </p>
      </div>

    </div>

  </a>

</motion.div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span>📝</span> Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  👤 Your Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  animate={{ x: focusedField === 'name' ? 5 : 0 }}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📧 Email Address <span className="text-red-500">*</span>
                </label>
                <motion.input
                  animate={{ x: focusedField === 'email' ? 5 : 0 }}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📞 Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  💬 Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your questions or requirements..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 px-4 py-3 text-white font-semibold flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>📤</span>
                      <span>Send Message</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </div>
              </motion.button>

              {/* Status Message */}
              {status.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-center text-sm ${
                    status.type === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' 
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
                  }`}
                >
                  {status.text}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2">
            <span>🌐</span> Connect With Us
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 ${social.color} rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700`}
              >
                <span className="text-xl">{social.icon}</span>
                <span className="font-medium">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⏰ Working Hours: Monday - Saturday, 9:00 AM - 7:00 PM
          </p>
        </motion.div>
      </div>
    </div>
  );
}