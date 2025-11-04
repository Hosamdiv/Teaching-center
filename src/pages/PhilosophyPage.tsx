
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
    FaCloudUploadAlt,
    FaFilePdf,
    FaTrash,
    FaDownload,
    FaBrain,
    FaVideo,
    FaFileVideo,
    FaTimes,
    FaSearch,
} from 'react-icons/fa';
import { selectCurrentUser } from '../app/features/product/usersSlice';

interface Video {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail?: string;
    uploadDate: string;
    duration?: string;
}

interface PDF {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    fileSize: string;
    uploadDate: string;
}

const PhilosophyPage = () => {
    const user = useSelector(selectCurrentUser);
    const isAdmin = user?.isAdmin || false;

    // State for videos
    const [videos, setVideos] = useState<Video[]>([
        {
            id: '1',
            title: 'مقدمة في الفلسفة',
            description: 'محاضرة تمهيدية في أساسيات الفلسفة',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
            uploadDate: '2024-01-15',
            duration: '45:30',
        },
    ]);

    // State for PDFs
    const [pdfs, setPdfs] = useState<PDF[]>([
        {
            id: '1',
            title: 'مقدمة في الفلسفة',
            description: 'ملف PDF شامل عن الفلسفة',
            fileUrl: '/pdfs/philosophy-intro.pdf',
            fileSize: '2.5 MB',
            uploadDate: '2024-01-15',
        },
    ]);

    // Video upload state
    const [showVideoUploadForm, setShowVideoUploadForm] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [uploadVideoProgress, setUploadVideoProgress] = useState(0);
    const [newVideo, setNewVideo] = useState({
        title: '',
        description: '',
        videoUrl: '',
    });
    const videoFileInputRef = useRef<HTMLInputElement>(null);

    // PDF upload state
    const [showPDFUploadForm, setShowPDFUploadForm] = useState(false);
    const [isUploadingPDF, setIsUploadingPDF] = useState(false);
    const [uploadPDFProgress, setUploadPDFProgress] = useState(0);
    const [newPDF, setNewPDF] = useState({
        title: '',
        description: '',
    });
    const pdfFileInputRef = useRef<HTMLInputElement>(null);

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'videos' | 'pdfs'>('videos');

    // Handle video upload
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setIsUploadingVideo(true);
            setUploadVideoProgress(0);

            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadVideoProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploadingVideo(false);
                        setUploadVideoProgress(0);

                        const video: Video = {
                            id: Date.now().toString(),
                            title: newVideo.title || file.name,
                            description: newVideo.description || 'وصف الفيديو',
                            videoUrl: URL.createObjectURL(file),
                            uploadDate: new Date().toISOString().split('T')[0],
                            duration: '00:00',
                        };

                        setVideos([video, ...videos]);
                        setNewVideo({ title: '', description: '', videoUrl: '' });
                        setShowVideoUploadForm(false);
                        return 0;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    // Handle PDF upload
    const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setIsUploadingPDF(true);
            setUploadPDFProgress(0);

            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadPDFProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploadingPDF(false);
                        setUploadPDFProgress(0);

                        const pdf: PDF = {
                            id: Date.now().toString(),
                            title: newPDF.title || file.name,
                            description: newPDF.description || 'وصف الملف',
                            fileUrl: URL.createObjectURL(file),
                            fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                            uploadDate: new Date().toISOString().split('T')[0],
                        };

                        setPdfs([pdf, ...pdfs]);
                        setNewPDF({ title: '', description: '' });
                        setShowPDFUploadForm(false);
                        return 0;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    // Delete functions
    const handleDeleteVideo = (id: string) => {
        setVideos(videos.filter(video => video.id !== id));
    };

    const handleDeletePDF = (id: string) => {
        setPdfs(pdfs.filter(pdf => pdf.id !== id));
    };

    // Filter based on search
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPDFs = pdfs.filter(pdf =>
        pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-blue-50/30">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                            <FaBrain className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            قسم الفلسفة 🧠
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto px-4">
                            هنا ستجد فيديوهات وملفات PDF تشرح مفاهيم الفلسفة بطريقة بسيطة وواضحة
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {/* Search and Tabs */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="ابحث في المحتوى..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 text-black pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm bg-white"
                            />
                        </div>

                        {/* Admin Upload Buttons */}
                        {isAdmin && (
                            <div className="flex flex-wrap gap-3">
                                <motion.button
                                    onClick={() => {
                                        setShowVideoUploadForm(true);
                                        setActiveTab('videos');
                                    }}
                                    className="inline-flex items-center space-x-2 space-x-reverse px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaCloudUploadAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base">رفع فيديو</span>
                                </motion.button>
                                <motion.button
                                    onClick={() => {
                                        setShowPDFUploadForm(true);
                                        setActiveTab('pdfs');
                                    }}
                                    className="inline-flex items-center space-x-2 space-x-reverse px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaFilePdf className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base">رفع PDF</span>
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 space-x-reverse border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`px-6 py-3 font-medium text-sm sm:text-base transition-colors duration-200 border-b-2 ${activeTab === 'videos'
                                    ? 'border-teal-600 text-teal-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FaVideo className="w-4 h-4" />
                                <span>الفيديوهات ({videos.length})</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('pdfs')}
                            className={`px-6 py-3 font-medium text-sm sm:text-base transition-colors duration-200 border-b-2 ${activeTab === 'pdfs'
                                    ? 'border-teal-600 text-teal-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <FaFilePdf className="w-4 h-4" />
                                <span>ملفات PDF ({pdfs.length})</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Video Upload Form */}
                <AnimatePresence>
                    {showVideoUploadForm && isAdmin && (
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">رفع فيديو جديد</h3>
                                <button
                                    onClick={() => setShowVideoUploadForm(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="عنوان الفيديو"
                                    value={newVideo.title}
                                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                                    className="px-4 py-3 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="رابط الفيديو (YouTube URL)"
                                    value={newVideo.videoUrl}
                                    onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                                    className="px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <textarea
                                    placeholder="وصف الفيديو"
                                    value={newVideo.description}
                                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                                    className="px-4 py-3 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent md:col-span-2"
                                    rows={3}
                                />
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center">
                                <input
                                    ref={videoFileInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => videoFileInputRef.current?.click()}
                                    className="inline-flex  items-center space-x-2 space-x-reverse px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                                >
                                    <FaFileVideo className="w-5 h-5" />
                                    <span>اختر ملف الفيديو</span>
                                </button>
                                <p className="text-sm text-gray-500 mt-3">MP4, AVI, MOV حتى 500MB</p>
                            </div>
                            {isUploadingVideo && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">جاري الرفع...</span>
                                        <span className="text-sm text-gray-600">{uploadVideoProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            className="bg-teal-600 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${uploadVideoProgress}%` }}
                                            transition={{ duration: 0.3 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* PDF Upload Form */}
                <AnimatePresence>
                    {showPDFUploadForm && isAdmin && (
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">رفع ملف PDF جديد</h3>
                                <button
                                    onClick={() => setShowPDFUploadForm(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="عنوان الملف"
                                    value={newPDF.title}
                                    onChange={(e) => setNewPDF({ ...newPDF, title: e.target.value })}
                                    className="px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <textarea
                                    placeholder="وصف الملف"
                                    value={newPDF.description}
                                    onChange={(e) => setNewPDF({ ...newPDF, description: e.target.value })}
                                    className="px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent md:col-span-2"
                                    rows={3}
                                />
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center">
                                <input
                                    ref={pdfFileInputRef}
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handlePDFUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => pdfFileInputRef.current?.click()}
                                    className="inline-flex  items-center space-x-2 space-x-reverse px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                                >
                                    <FaFilePdf className="w-5 h-5" />
                                    <span>اختر ملف PDF</span>
                                </button>
                                <p className="text-sm text-gray-500 mt-3">PDF حتى 50MB</p>
                            </div>
                            {isUploadingPDF && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">جاري الرفع...</span>
                                        <span className="text-sm text-gray-600">{uploadPDFProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            className="bg-red-600 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${uploadPDFProgress}%` }}
                                            transition={{ duration: 0.3 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Videos Section */}
                <AnimatePresence mode="wait">
                    {activeTab === 'videos' && (
                        <motion.section
                            key="videos"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredVideos.length === 0 ? (
                                <div className="text-center py-12 sm:py-16">
                                    <FaVideo className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">لا توجد فيديوهات متاحة</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {filteredVideos.map((video, index) => (
                                        <motion.div
                                            key={video.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="relative aspect-video bg-gray-900">
                                                {video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') ? (
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={video.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                                        title={video.title}
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : (
                                                    <video
                                                        src={video.videoUrl}
                                                        className="w-full h-full object-cover"
                                                        controls
                                                    />
                                                )}
                                                <div className="absolute top-2 right-2">
                                                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
                                                        فيديو
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 sm:p-6">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {video.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                                                    {video.description}
                                                </p>
                                                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                                                    <span>{video.uploadDate}</span>
                                                    {video.duration && <span>{video.duration}</span>}
                                                </div>
                                                {isAdmin && (
                                                    <div className="flex items-center justify-end space-x-2 space-x-reverse mt-4 pt-4 border-t border-gray-200">
                                                        <button
                                                            onClick={() => handleDeleteVideo(video.id)}
                                                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                        >
                                                            <FaTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    )}

                    {/* PDFs Section */}
                    {activeTab === 'pdfs' && (
                        <motion.section
                            key="pdfs"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredPDFs.length === 0 ? (
                                <div className="text-center py-12 sm:py-16">
                                    <FaFilePdf className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">لا توجد ملفات PDF متاحة</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {filteredPDFs.map((pdf, index) => (
                                        <motion.div
                                            key={pdf.id}
                                            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ y: -3 }}
                                        >
                                            <div className="flex items-start space-x-4 space-x-reverse">
                                                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-xl flex items-center justify-center">
                                                    <FaFilePdf className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                        {pdf.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                                                        {pdf.description}
                                                    </p>
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                        <div className="flex items-center space-x-4 space-x-reverse text-xs sm:text-sm text-gray-500">
                                                            <span>{pdf.fileSize}</span>
                                                            <span>{pdf.uploadDate}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-3 space-x-reverse">
                                                            <a
                                                                href={pdf.fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm sm:text-base"
                                                            >
                                                                <FaDownload className="w-4 h-4" />
                                                                <span>تحميل</span>
                                                            </a>
                                                            {isAdmin && (
                                                                <button
                                                                    onClick={() => handleDeletePDF(pdf.id)}
                                                                    className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2"
                                                                >
                                                                    <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PhilosophyPage;
