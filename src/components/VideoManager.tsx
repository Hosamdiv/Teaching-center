import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlay, FaEye, FaEdit, FaTrash,
  FaSearch, FaCloudUploadAlt, FaVideo, FaFileVideo
} from 'react-icons/fa';

interface Video {
  id: string;
  title: string;
  description: string;
  category: 'psychology' | 'philosophy' | 'general';
  duration: string;
  fileSize: string;
  uploadDate: string;
  views: number;
  thumbnail: string;
  videoUrl: string;
  isPublic: boolean;
}

const VideoManager: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'مقدمة في علم النفس',
      description: 'محاضرة تمهيدية في أساسيات علم النفس',
      category: 'psychology',
      duration: '45:30',
      fileSize: '125 MB',
      uploadDate: '2024-01-15',
      views: 156,
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=علم+النفس',
      videoUrl: '#',
      isPublic: true
    },
    {
      id: '2',
      title: 'الفلسفة اليونانية',
      description: 'نظرة عامة على الفلسفة اليونانية القديمة',
      category: 'philosophy',
      duration: '52:15',
      fileSize: '145 MB',
      uploadDate: '2024-01-10',
      views: 89,
      thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=الفلسفة',
      videoUrl: '#',
      isPublic: true
    },
    {
      id: '3',
      title: 'تطوير الذات',
      description: 'مهارات تطوير الذات والثقة بالنفس',
      category: 'general',
      duration: '38:45',
      fileSize: '98 MB',
      uploadDate: '2024-01-05',
      views: 234,
      thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=تطوير+الذات',
      videoUrl: '#',
      isPublic: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'psychology' | 'philosophy' | 'general'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'psychology' as const,
    isPublic: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadProgress(0);
            setShowUploadForm(false);
            
            // Add new video to list
            const video: Video = {
              id: Date.now().toString(),
              title: newVideo.title || file.name,
              description: newVideo.description || 'وصف الفيديو',
              category: newVideo.category,
              duration: '00:00',
              fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadDate: new Date().toISOString().split('T')[0],
              views: 0,
              thumbnail: 'https://via.placeholder.com/300x200/6B7280/FFFFFF?text=فيديو+جديد',
              videoUrl: URL.createObjectURL(file),
              isPublic: newVideo.isPublic
            };
            
            setVideos([video, ...videos]);
            setNewVideo({ title: '', description: '', category: 'psychology', isPublic: true });
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalVideos = videos.length;
  const psychologyVideos = videos.filter(v => v.category === 'psychology').length;
  const philosophyVideos = videos.filter(v => v.category === 'philosophy').length;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">إدارة الفيديوهات</h2>
            <p className="text-gray-600">رفع وإدارة الفيديوهات التعليمية</p>
          </div>
          <motion.button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCloudUploadAlt className="w-5 h-5" />
            <span>رفع فيديو جديد</span>
          </motion.button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">إجمالي الفيديوهات</p>
                <p className="text-3xl font-bold">{totalVideos}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaVideo className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">علم النفس</p>
                <p className="text-3xl font-bold">{psychologyVideos}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaVideo className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">الفلسفة</p>
                <p className="text-3xl font-bold">{philosophyVideos}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaVideo className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">إجمالي المشاهدات</p>
                <p className="text-3xl font-bold">{totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FaEye className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في الفيديوهات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-80 pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الفئات</option>
              <option value="psychology">علم النفس</option>
              <option value="philosophy">الفلسفة</option>
              <option value="general">عام</option>
            </select>
          </div>
        </div>

        {/* Upload Form */}
        <AnimatePresence>
          {showUploadForm && (
            <motion.div
              className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">رفع فيديو جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="عنوان الفيديو"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newVideo.category}
                  onChange={(e) => setNewVideo({...newVideo, category: e.target.value as any})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="psychology">علم النفس</option>
                  <option value="philosophy">الفلسفة</option>
                  <option value="general">عام</option>
                </select>
                <textarea
                  placeholder="وصف الفيديو"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                  rows={3}
                />
                <div className="flex items-center space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newVideo.isPublic}
                    onChange={(e) => setNewVideo({...newVideo, isPublic: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-700">فيديو عام</label>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <FaFileVideo className="w-5 h-5" />
                  <span>اختر ملف الفيديو</span>
                </button>
                <p className="text-sm text-gray-500 mt-2">MP4, AVI, MOV حتى 500MB</p>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">جاري الرفع...</span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 space-x-reverse mt-4">
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-blue-600 hover:bg-opacity-100 transition-all duration-200">
                    <FaPlay className="w-6 h-6 mr-1" />
                  </button>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    video.category === 'psychology' ? 'bg-blue-100 text-blue-800' :
                    video.category === 'philosophy' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {video.category === 'psychology' && 'علم النفس'}
                    {video.category === 'philosophy' && 'الفلسفة'}
                    {video.category === 'general' && 'عام'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{video.duration}</span>
                  <span>{video.fileSize}</span>
                  <span>{video.uploadDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                    <FaEye className="w-4 h-4" />
                    <span>{video.views} مشاهدة</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteVideo(video.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoManager;
