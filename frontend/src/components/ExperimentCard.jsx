import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExperimentCard({ experiment }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(experiment.video_url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={experiment.thumbnail_url}
          alt={experiment.title}
          className="w-full h-48 object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <span className="text-red-500 text-xl ml-0.5">▶</span>
          </div>
        </div>
        
        {/* Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <span>🎥</span> Video
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
          {experiment.title}
        </h3>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <span>🔬</span> Click to watch experiment
        </p>
      </div>
    </motion.div>
  );
}