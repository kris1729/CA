import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import api from '../api/axios';
import ExperimentCard from '../components/ExperimentCard';
import StudyModuleCard from '../components/StudyModuleCard';
import ProductCard from '../components/ProductCard';


export default function Home() {
  const [experiments, setExperiments] = useState([]);
  
  const [modules, setModules] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, modRes, prodRes] = await Promise.all([
          api.get('/experiments'),  
          api.get('/study-modules'),
          api.get('/products'),
        ]);
        setExperiments(expRes.data);
        setModules(modRes.data);
        setProducts(prodRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl"
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, delay: i * 0.15, repeat: Infinity }}
              className="absolute w-px h-px bg-blue-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full mb-8 border border-white/10"
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <span className="text-white/70 text-sm font-medium tracking-wide">India's Premier Coaching Centre</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            >
              Chetna
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text"> Academy</span>
            </motion.h1>
            
            {/* Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto font-light"
            >
              Empowering Minds Through <span className="text-white font-semibold">Practical Education</span>
            </motion.p>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              The only academy with a dedicated <span className="text-cyan-400 font-semibold">STEM LAB</span> — 
              where theory meets practice through <span className="text-cyan-400 font-semibold">"Learning by Doing"</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Get Started</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white/80 hover:text-white font-medium rounded-full transition-all duration-300 border border-white/10"
                onClick={() => {
                  const facilitiesSection = document.getElementById('facilities');
                  if (facilitiesSection) {
                    facilitiesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Facilities
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Only on Hero Section */}
        
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Happy Students", icon: "👨‍🎓", color: "from-blue-500 to-cyan-500" },
              { number: "15+", label: "Expert Mentors", icon: "👨‍🏫", color: "from-purple-500 to-pink-500" },
              { number: "98%", label: "Success Rate", icon: "🏆", color: "from-yellow-500 to-orange-500" },
              { number: "50+", label: "STEM Projects", icon: "🔬", color: "from-green-500 to-emerald-500" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block">{stat.icon}</div>
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VISION & MISSION SECTION ========== */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">OUR VISION</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Shaping Future
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Innovators</span>
              </h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
                <p className="leading-relaxed text-lg">
                  We strive to create an environment where students not only learn but also innovate. 
                  With our state-of-the-art <span className="text-indigo-600 dark:text-indigo-400 font-bold">STEM lab</span>, 
                  we encourage hands-on experiments and real-world problem solving.
                </p>
                <p className="leading-relaxed text-lg">
                  Our expert mentors from esteemed backgrounds guide students to excel in academics 
                  and competitive exams.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-4 text-center min-w-[120px] shadow-lg">
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-sm text-white/80">Expert Mentors</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-4 text-center min-w-[120px] shadow-lg">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/80">Students Trained</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-4 text-center min-w-[120px] shadow-lg">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Features Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">WHY CHOOSE US</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { icon: "🔬", text: "Demonstrative Learning with STEM Lab", color: "from-blue-500 to-cyan-500" },
                  { icon: "👨‍🔬", text: "Personalized Guidance by Experts", color: "from-purple-500 to-pink-500" },
                  { icon: "📚", text: "Complete Course Coverage with Modules", color: "from-green-500 to-emerald-500" },
                  { icon: "📊", text: "Regular Tests & Performance Reports", color: "from-orange-500 to-red-500" },
                  { icon: "💻", text: "Coding Classes as per Syllabus", color: "from-indigo-500 to-blue-500" },
                  { icon: "🎯", text: "Foundation for Olympiad, NDA, NEET, JEE", color: "from-rose-500 to-pink-500" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <p className="flex-1 text-gray-700 dark:text-gray-200 font-medium">{item.text}</p>
                    <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FACILITIES SECTION ========== */}
      <section id="facilities" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
              <span className="text-indigo-600">🏫</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Campus Facilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">State-of-the-art facilities designed for modern learning</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🔬", title: "STEM Lab", desc: "Circuit, Electronics & Hardware Lab", gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { icon: "📊", title: "Simulation Lab", desc: "Mathematical & Software-based learning", gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
              { icon: "💻", title: "Coding Classes", desc: "As per syllabus, building future skills", gradient: "from-green-500 to-emerald-500", bg: "bg-green-50 dark:bg-green-900/20" },
              { icon: "🧪", title: "Science Projects", desc: "Encouraging creativity & innovation", gradient: "from-orange-500 to-red-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
              { icon: "🌟", title: "Personality Dev", desc: "Confidence & communication skills", gradient: "from-indigo-500 to-blue-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
              { icon: "📖", title: "Study Modules", desc: "Complete course coverage with PYQs", gradient: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-900/20" }
            ].map((facility, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative ${facility.bg} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${facility.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <span className="text-3xl">{facility.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{facility.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{facility.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXPERIMENTS SECTION ========== */}
      {experiments.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full mb-4">
                <span className="text-pink-600">🎥</span>
                <span className="text-pink-600 dark:text-pink-400 font-semibold">Learning Resources</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Experiments & Demonstrations
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Watch and learn from our practical demonstration videos</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {experiments.map((exp) => (
                <motion.div key={exp.id} variants={fadeInUp}>
                  <ExperimentCard experiment={exp} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ========== STUDY MODULES SECTION ========== */}
      {modules.length > 0 && (
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-4">
                <span className="text-green-600">📚</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">Study Material</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Study Modules & Question Sets
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Comprehensive study material for complete preparation</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {modules.map((module) => (
                <motion.div key={module.id} variants={fadeInUp}>
                  <StudyModuleCard module={module} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ========== PRODUCTS SECTION ========== */}
      {products.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full mb-4">
                <span className="text-yellow-600">🛒</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Shop</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Our Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Educational products to enhance your learning journey</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ========== CONTACT SECTION - CLEAN PROFESSIONAL ========== */}
      <section id="contact" className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full mb-6 border border-white/10">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span className="text-white/70 text-sm tracking-wide">GET IN TOUCH</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Join thousands of successful students who trusted us for their future
              </p>
            </motion.div>

            {/* Contact Cards Grid */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="grid md:grid-cols-3 gap-6 mb-10"
>
  {[
    { 
      icon: "📍", 
      title: "Visit Us", 
      details: "Near Amity University, Malhaur, Lucknow-U.P 226010",
      link: "https://maps.app.goo.gl/Q3RDGVmEYLCATPzF8",
      color: "from-blue-500 to-cyan-500" 
    },

    { 
      icon: "📞", 
      title: "Call Us", 
      details: "8960628583", 
      extra: "Mon-Sat, 9AM - 7PM", 
      link: "tel:8960628583", 
      color: "from-green-500 to-emerald-500" 
    },

    { 
      icon: "✉️", 
      title: "Email Us", 
      details: "chetna.xnava@gmail.com", 
      extra: "24/7 Support", 
      link: "mailto:chetna.xnava@gmail.com", 
      color: "from-purple-500 to-pink-500" 
    }

  ].map((item, idx) => (

    <a
      key={idx}
      href={item.link}
      target={item.title === "Visit Us" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div 
        whileHover={{ y: -5 }}
        className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      >

        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        >
          <span className="text-2xl">{item.icon}</span>
        </div>

        <h3 className="text-white font-semibold mb-2">
          {item.title}
        </h3>

        <p className="text-white/60 text-sm">
          {item.details}
        </p>

        {item.extra && (
          <p className="text-white/30 text-xs mt-1">
            {item.extra}
          </p>
        )}

      </motion.div>
    </a>

  ))}
</motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
              >
                <span>Send Message</span>
                <span>→</span>
              </motion.button>
              <p className="text-white/30 text-xs mt-4">
                We'll get back to you within 24 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}