import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/experiments', name: 'Experiments', icon: '🧪', color: 'from-blue-500 to-cyan-500' },
    { path: '/admin/study-modules', name: 'Study Modules', icon: '📚', color: 'from-green-500 to-emerald-500' },
    { path: '/admin/products', name: 'Products', icon: '🛒', color: 'from-yellow-500 to-orange-500' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Top Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Chetna Academy
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
              </div>
            </div>

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center gap-4">
              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">
                    {user.email?.[0].toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95"
            >
              <div className="p-4 space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-bold">{user.email?.[0].toUpperCase() || 'A'}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Desktop */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden md:block w-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)]"
        >
          <div className="p-6">
            {/* Admin Info Card */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 border border-blue-200/50 dark:border-blue-700/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">👨‍💼</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">Admin Panel</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage Content</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        location.pathname === item.path
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="activeNav"
                          className="ml-auto"
                        >
                          <span className="text-white">✓</span>
                        </motion.div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="p-4 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Chetna Academy</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Version 1.0.0</p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-40">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? `text-transparent bg-gradient-to-r ${item.color} bg-clip-text`
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 p-4 md:p-8 pb-20 md:pb-8"
        >
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 border border-blue-200/50 dark:border-blue-700/30"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">👋</div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Welcome back, {user.email?.split('@')[0]}!
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your experiments, study modules, and products from here.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Content */}
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
}