import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductInquiryModal from './ProductInquiryModal';

export default function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
        className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300"
      >
        {/* Image Container with Overlay */}
        <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <motion.img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Price Badge */}
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: isHovered ? 0 : 100 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
              ₹{product.price}
            </div>
          </motion.div>

          {/* Quick View Badge */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
            >
              <span className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <span>🔍</span> Quick View
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
          
          {/* Description Placeholder (if you have description field) */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description || "High-quality educational product for students"}
          </p>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 line-through">
                ₹{parseInt(product.price) + 500}
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                ₹{product.price}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-gray-300">★</span>
              <span className="text-xs text-gray-500 ml-1">(4.0)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span className="group-hover/btn:translate-x-[-4px] transition-transform">📞</span>
              <span>Inquire Now</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                // Add to wishlist functionality
                alert('Added to wishlist!');
              }}
              className="px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 font-semibold py-2.5 rounded-xl transition-all duration-300"
            >
              ❤️
            </motion.button>
          </div>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            <span>In Stock</span>
          </div>
        </div>
      </motion.div>

      <ProductInquiryModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}