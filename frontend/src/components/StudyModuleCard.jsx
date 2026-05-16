import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';

export default function StudyModuleCard({ module }) {
  const [likes, setLikes] = useState(module.likes);
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleCardClick = () => {
    window.open(module.file_url, '_blank');
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked || isLiking) return;
    
    setIsLiking(true);
    try {
      const res = await api.put(`/study-modules/${module.id}/like`);
      setLikes(res.data.likes);
      setLiked(true);
      
      // Optional: Add haptic feedback on mobile
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        <motion.img
          src={module.thumbnail_url}
          alt={module.title}
          className="w-full h-48 object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* PDF Badge */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: isHovered ? 0 : -50, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 left-3"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
            <span className="text-sm">📄</span>
            <span className="font-medium">PDF</span>
          </div>
        </motion.div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl"
          >
            <span className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <span>📖</span> 
              <span>Open PDF</span>
              <span className="text-lg">→</span>
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
          {module.title}
        </h3>
        
        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>📅</span>
            <span>{new Date(module.created_at || Date.now()).toLocaleDateString()}</span>
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>👁️</span>
            <span>{module.views || 0} views</span>
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>📚</span>
            <span>Study Material</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            disabled={liked || isLiking}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              liked 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
            }`}
          >
            {isLiking ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-base">{liked ? '❤️' : '🤍'}</span>
            )}
            <span>{likes}</span>
          </motion.button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}