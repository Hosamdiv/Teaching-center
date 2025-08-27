import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, 
  FaPlay, 
  FaPause, 
  FaClock, 
  FaEye, 
  FaDownload, 
  FaEdit, 
  FaTrash, 
  FaFolder,
  FaSearch,
  FaFilter,
  FaSort,
  FaCloudUploadAlt,
  FaVideo,
  FaFileVideo,
  FaCheckCircle,
  FaTimesCircle
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
      description: 'محاضرة تمهيدية تغطي أساسيات علم النفس وأهم النظريات',
      category: 'psychology',
      duration: '45:30',
      fileSize: '125 MB',
      uploadDate: '2024-01-15',
      views: 156,
      thumbnail: '/api/thumbnails/1.jpg',
      videoUrl: '/api/videos/1.mp4',
      isPublic: true
    },
    {
      id: '2',
      title: 'الفلسفة اليونانية القديمة',
      description: 'استكشاف الفلسفة اليونانية من سقراط إلى أرسطو',
      category: 'philosophy',
      duration: '52:15',
      fileSize: '145 MB',
      uploadDate: '2024-01-20',
      views: 89,
      thumbnail: '/api/thumbnails/2.jpg',
      videoUrl: '/api/videos/2.mp4',
      isPublic: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'psychology' as const,
    isPublic: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.includes(searchTerm) || 
                         video.description.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !newVideo.title) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload delay
    setTimeout(() => {
      const video: Video = {
        id: Date.now().toString(),
        title: newVideo.title,
        description: newVideo.description,
        category: newVideo.category,
        duration: '00:00', // Would be extracted from video file
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        views: 0,
        thumbnail: '/api/thumbnails/default.jpg',
        videoUrl: URL.createObjectURL(selectedFile),
        isPublic: newVideo.isPublic
      };

      setVideos([...videos, video]);
      setNewVideo({
        title: '',
        description: '',
        category: 'psychology',
        isPublic: true
      });
      setSelectedFile(null);
      setShowUploadForm(false);
      setUploading(false);
      setUploadProgress(0);
      clearInterval(interval);
    }, 2000);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'psychology': return 'علم النفس';
      case 'philosophy': return 'الفلسفة';
      case 'general': return 'عام';
      default: return 'غير محدد';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychology': return 'bg-blue-100 text-blue-800';
      case 'philosophy': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-right">إدارة الفيديوهات التعليمية</h1>
        <p className="text-gray-600 text-right">رفع وتنظيم المحتوى التعليمي المرئي</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="البحث في الفيديوهات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          dir="rtl"
        >
          <option value="all">جميع الفئات</option>
          <option value="psychology">علم النفس</option>
          <option value="philosophy">الفلسفة</option>
          <option value="general">عام</option>
        </select>

        {/* Upload Button */}
        <motion.button
          onClick={() => setShowUploadForm(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCloudUploadAlt />
          <span>رفع فيديو جديد</span>
        </motion.button>
      </div>

      {/* Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-right">رفع فيديو جديد</h3>
            
            {/* File Upload */}
            <div className="mb-6">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <FaFileVideo className="mx-auto h-12 w-12 text-blue-500" />
                    <p className="text-sm text-gray-600">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600">اضغط لاختيار ملف فيديو</p>
                    <p className="text-xs text-gray-500">MP4, AVI, MOV (الحد الأقصى: 500 MB)</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Video Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="عنوان الفيديو"
                value={newVideo.title}
                onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              />
              <select
                value={newVideo.category}
                onChange={(e) => setNewVideo({...newVideo, category: e.target.value as any})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                dir="rtl"
              >
                <option value="psychology">علم النفس</option>
                <option value="philosophy">الفلسفة</option>
                <option value="general">عام</option>
              </select>
              <textarea
                placeholder="وصف الفيديو"
                value={newVideo.description}
                onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                rows={3}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right md:col-span-2"
                dir="rtl"
              />
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newVideo.isPublic}
                  onChange={(e) => setNewVideo({...newVideo, isPublic: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">متاح للجميع</label>
              </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>جاري الرفع...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  setSelectedFile(null);
                  setNewVideo({
                    title: '',
                    description: '',
                    category: 'psychology',
                    isPublic: true
                  });
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !newVideo.title || uploading}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  !selectedFile || !newVideo.title || uploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {uploading ? 'جاري الرفع...' : 'رفع الفيديو'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaVideo className="h-16 w-16 text-gray-400" />
              </div>
              <div className="absolute top-2 right-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(video.category)}`}>
                  {getCategoryText(video.category)}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-right line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 text-right line-clamp-2">
                {video.description}
              </p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="flex items-center space-x-1 space-x-reverse">
                  <FaEye />
                  <span>{video.views}</span>
                </span>
                <span>{video.fileSize}</span>
                <span>{new Date(video.uploadDate).toLocaleDateString('ar-SA')}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 space-x-reverse">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1 space-x-reverse">
                  <FaPlay />
                  <span>مشاهدة</span>
                </button>
                <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <FaEdit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteVideo(video.id)}
                  className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaVideo className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فيديوهات</h3>
          <p className="text-gray-600">ابدأ برفع أول فيديو تعليمي</p>
        </motion.div>
      )}

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">إجمالي الفيديوهات</p>
            <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">فيديوهات علم النفس</p>
            <p className="text-2xl font-bold text-blue-600">
              {videos.filter(v => v.category === 'psychology').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">فيديوهات الفلسفة</p>
            <p className="text-2xl font-bold text-purple-600">
              {videos.filter(v => v.category === 'philosophy').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="text-right">
            <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
            <p className="text-2xl font-bold text-green-600">
              {videos.reduce((sum, v) => sum + v.views, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoManager;
