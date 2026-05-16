import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'WhatsApp', icon: '💬', color: 'hover:text-green-400', url: 'https://wa.me/918960628583' },
    { name: 'Instagram', icon: '📷', color: 'hover:text-pink-400', url: 'https://www.instagram.com/chetna.academy?igsh=dnlsM3F4bjAycjAw' },
    { name: 'Facebook', icon: '📘', color: 'hover:text-blue-400', url: 'https://www.facebook.com/share/17aZ44sTiv/' },
    { name: 'YouTube', icon: '🎥', color: 'hover:text-red-400', url: 'https://www.youtube.com/@Chetna_xnava' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Chetna Academy
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering minds through practical education since 2015. 
              India's premier coaching centre with state-of-the-art STEM lab.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-yellow-500">★</span>
              <span className="text-gray-500 text-sm ml-2">(4.9/5)</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="flex items-center justify-center md:justify-end gap-2">
                <span>📍</span>
                <span>Near Amity University, Malhaur, Lucknow</span>
              </p>
              <p className="flex items-center justify-center md:justify-end gap-2">
                <span>📞</span>
                <a href="tel:8960628583" className="hover:text-blue-400 transition">+91 8960628583</a>
              </p>
              <p className="flex items-center justify-center md:justify-end gap-2">
                <span>✉️</span>
                <a href="mailto:chetna.xnava@gmail.com" className="hover:text-blue-400 transition">chetna.xnava@gmail.com</a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} transition-all duration-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-white/10 border border-white/10`}
              >
                <span>{social.icon}</span>
                <span>{social.name}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Chetna Academy. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              A Unit of Xnava Enterprises
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </footer>
  );
}