import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', name: 'Home', icon: '🏠' },
    { path: '/contact', name: 'Contact', icon: '📞' },
  ];

  if (user) {
    navLinks.push({ path: '/admin', name: 'Admin', icon: '👨‍💼' });
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl py-3' 
            : 'bg-transparent py-6'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section - Modern Design */}
            <Link to="/" className="group relative">
              <div className="relative z-10 flex items-center gap-2">
                {/* Animated Logo Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-xl">🎓</span>
                </motion.div>
                
                <div>
                  <span className={`
                    text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-300
                    ${isScrolled 
                      ? 'text-gray-800 dark:text-white' 
                      : 'text-white'
                    }
                  `}>
                    Chetna
                    <span className="text-secondary"> Academy</span>
                  </span>
                  <div className={`
                    text-[10px] font-medium tracking-wider transition-all duration-300
                    ${isScrolled 
                      ? 'text-gray-500 dark:text-gray-400' 
                      : 'text-white/70'
                    }
                  `}>
                    Empowering Minds, Shaping Futures
                  </div>
                </div>
              </div>
              
              {/* Animated underline on hover */}
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-secondary to-secondary-dark rounded-full"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop Navigation - Modern Design */}
            <div className="hidden md:flex items-center gap-2">
              {/* Navigation Links with Modern Glass Effect */}
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative px-5 py-2 rounded-full font-medium transition-all duration-300
                        flex items-center gap-2 overflow-hidden
                        ${location.pathname === link.path
                          ? isScrolled 
                            ? 'bg-primary text-white shadow-lg' 
                            : 'bg-white/20 text-white backdrop-blur-sm'
                          : isScrolled 
                            ? 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-secondary' 
                            : 'text-white/90 hover:text-white'
                        }
                      `}
                    >
                      <span className="relative z-10 text-lg">{link.icon}</span>
                      <span className="relative z-10">{link.name}</span>
                      
                      {/* Active indicator */}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      
                      {/* Hover effect */}
                      {location.pathname !== link.path && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* User Profile - Modern Design */}
              {user && (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="ml-2 relative group"
                >
                  <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white font-bold shadow-lg">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </div>
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                      />
                    </div>
                    
                    <div className="hidden lg:block">
                      <p className={`text-sm font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                        {user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-gray-400">Student</p>
                    </div>
                    
                    {/* Dropdown arrow */}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isScrolled ? 'text-gray-600' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.email?.split('@')[0]}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Dashboard
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Logout
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button - Modern Design */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                md:hidden relative w-12 h-12 rounded-xl focus:outline-none transition-all duration-300
                ${isMenuOpen 
                  ? 'bg-secondary shadow-lg' 
                  : isScrolled 
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200' 
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                }
              `}
              aria-label="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className={`
                  block w-5 h-0.5 transition-all duration-300 ease-in-out rounded-full
                  ${isScrolled && !isMenuOpen ? 'bg-gray-800 dark:bg-white' : 'bg-white'}
                  ${isMenuOpen ? 'rotate-45 translate-y-1.5 bg-white' : '-translate-y-1.5'}
                `}></span>
                <span className={`
                  block w-5 h-0.5 transition-all duration-300 ease-in-out my-1.5 rounded-full
                  ${isScrolled && !isMenuOpen ? 'bg-gray-800 dark:bg-white' : 'bg-white'}
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
                `}></span>
                <span className={`
                  block w-5 h-0.5 transition-all duration-300 ease-in-out rounded-full
                  ${isScrolled && !isMenuOpen ? 'bg-gray-800 dark:bg-white' : 'bg-white'}
                  ${isMenuOpen ? '-rotate-45 -translate-y-1.5 bg-white' : 'translate-y-1.5'}
                `}></span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Modern Slide Down */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
            >
              <div className={`
                backdrop-blur-xl shadow-2xl
                ${isScrolled 
                  ? 'bg-white/95 dark:bg-gray-900/95' 
                  : 'bg-primary-dark/95'
                }
              `}>
                <div className="px-4 py-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={`
                          block px-5 py-4 rounded-xl font-medium transition-all duration-300
                          ${location.pathname === link.path
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                            : isScrolled 
                              ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' 
                              : 'text-white/90 hover:bg-white/10'
                          }
                        `}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-2xl">{link.icon}</span>
                          <span className="text-base">{link.name}</span>
                          {location.pathname === link.path && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto text-white"
                            >
                              ✓
                            </motion.span>
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile User Info */}
                  {user && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`
                        mt-6 pt-6 rounded-xl
                        ${isScrolled ? 'border-t border-gray-200 dark:border-gray-700' : 'border-t border-white/20'}
                      `}
                    >
                      <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white font-bold shadow-lg text-lg">
                          {user.email?.[0].toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                            {user.email?.split('@')[0]}
                          </p>
                          <p className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
                            {user.email}
                          </p>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Mobile CTA for non-logged users */}
                  {!user && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 pt-6 border-t border-white/20"
                    >
                      <div className="px-5 py-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl text-center">
                        <p className="text-white/90 text-sm mb-2">Ready to start your journey?</p>
                        <button className="px-4 py-2 bg-secondary rounded-lg text-white text-sm font-semibold">
                          Get Started
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-20 sm:h-24"></div>
    </>
  );
}