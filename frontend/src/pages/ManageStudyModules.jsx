import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

export default function ManageStudyModules() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({
    title: '',
    thumbnail_url: '',
    thumbnail_file_id: '',
    file_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const res = await api.get('/study-modules');
    setModules(res.data);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload', formData);
      setForm(prev => ({
        ...prev,
        thumbnail_url: res.data.url,
        thumbnail_file_id: res.data.fileId,
      }));
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.thumbnail_url || !form.file_url) {
      alert('Please fill all fields and upload a thumbnail');
      return;
    }
    if (editingId) {
      await api.put(`/study-modules/${editingId}`, form);
    } else {
      await api.post('/study-modules', form);
    }
    setForm({
      title: '',
      thumbnail_url: '',
      thumbnail_file_id: '',
      file_url: '',
    });
    setEditingId(null);
    setIsFormOpen(false);
    fetchModules();
  };

  const handleEdit = (mod) => {
    setForm({
      title: mod.title,
      thumbnail_url: mod.thumbnail_url,
      thumbnail_file_id: mod.thumbnail_file_id,
      file_url: mod.file_url,
    });
    setEditingId(mod.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will also delete the thumbnail from ImageKit.')) {
      await api.delete(`/study-modules/${id}`);
      fetchModules();
    }
  };

  const filteredModules = modules.filter(mod =>
    mod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Manage Study Modules
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Add, edit, or remove study modules and PDF resources
          </p>
        </motion.div>

        {/* Add New Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>{isFormOpen ? '−' : '+'}</span>
          <span>{isFormOpen ? 'Close Form' : 'Add New Module'}</span>
        </motion.button>

        {/* Form Modal/Card */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {editingId ? 'Edit Study Module' : 'Create New Module'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      📖 Module Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., Physics Chapter 1: Motion"
                      required
                    />
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      🖼️ Thumbnail Image
                    </label>
                    <div className="flex items-center gap-4">
                      <label className={`cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <span className="text-sm">📁 Choose File</span>
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(e.target.files[0])}
                          className="hidden"
                          accept="image/*"
                          disabled={uploading}
                        />
                      </label>
                      {uploading && (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-500">Uploading...</span>
                        </div>
                      )}
                    </div>
                    {form.thumbnail_url && (
                      <div className="mt-3">
                        <img src={form.thumbnail_url} alt="preview" className="h-24 w-32 object-cover rounded-lg shadow-md" />
                      </div>
                    )}
                  </div>

                  {/* PDF File URL Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      📄 PDF File URL
                    </label>
                    <input
                      type="url"
                      value={form.file_url}
                      onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="https://drive.google.com/... or https://ik.imagekit.io/..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Upload PDF to ImageKit or Google Drive and paste the public link
                    </p>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {editingId ? 'Update Module' : 'Create Module'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setForm({
                            title: '',
                            thumbnail_url: '',
                            thumbnail_file_id: '',
                            file_url: '',
                          });
                        }}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Modules Grid */}
        {filteredModules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl"
          >
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 dark:text-gray-400">No study modules found</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              + Add your first module
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((mod, index) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={mod.thumbnail_url}
                    alt={mod.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <span>📄</span> PDF
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {mod.title}
                  </h3>
                  
                  {/* PDF Link */}
                  <a
                    href={mod.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1 mb-3"
                  >
                    <span>📖</span> View PDF →
                  </a>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleEdit(mod)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mod.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Modules: {modules.length} | Showing: {filteredModules.length}
          </p>
        </motion.div>
      </div>
    </div>
  );
}