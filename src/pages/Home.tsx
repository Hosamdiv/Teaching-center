import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBrain, FaLightbulb, FaUsers, FaArrowRight, FaPlay, FaBookOpen, FaStar } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo with enhanced styling */}
            <div className="flex justify-center mb-12">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl relative">
                  <FaGraduationCap className="w-14 h-14 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50"></div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaStar className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Enhanced Title */}
            <div className='mb-8'>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  مركز التدريس
                </span>
                <span className="block text-3xl pb-3 lg:text-4xl text-gray-700 mt-4 font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  علم النفس والفلسفة
                </span>
              </h1>
            </div>

            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              منصة تعليمية متطورة تقدم محاضرات مسجلة عالية الجودة في مجال علم النفس والفلسفة
            </p>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl text-lg font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <FaPlay className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  ابدأ التعلم الآن
                </div>
              </motion.button>
              
              <motion.button
                className="group relative px-12 py-6 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl text-lg font-bold hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-gray-500/25 transform hover:-translate-y-2 border border-gray-200/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center gap-3">
                  <FaBookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  تعرف على المزيد
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-24 px-6 bg-white/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl pb-3 lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              لماذا تختار مركز التدريس؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              نقدم تجربة تعليمية فريدة تجمع بين التميز الأكاديمي والتكنولوجيا الحديثة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: FaBrain,
                title: 'علم النفس',
                description: 'محاضرات شاملة تغطي جميع جوانب علم النفس من الأساسيات إلى المتقدم',
                color: 'from-blue-500 to-blue-600',
                bgColor: 'from-blue-50 to-blue-100',
                shadowColor: 'shadow-blue-500/20'
              },
              {
                icon: FaLightbulb,
                title: 'الفلسفة',
                description: 'استكشاف الفلسفة عبر العصور من اليونان القديمة إلى الفلسفة المعاصرة',
                color: 'from-purple-500 to-purple-600',
                bgColor: 'from-purple-50 to-purple-100',
                shadowColor: 'shadow-purple-500/20'
              },
              {
                icon: FaUsers,
                title: 'مجتمع تعليمي',
                description: 'انضم إلى مجتمع من الطلاب والمهتمين بالعلوم الإنسانية',
                color: 'from-emerald-500 to-emerald-600',
                bgColor: 'from-emerald-50 to-emerald-100',
                shadowColor: 'shadow-emerald-500/20'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`group bg-gradient-to-br ${feature.bgColor} p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300 transform group-hover:scale-110`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-gray-800 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-medium">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
              ابدأ رحلة التعلم اليوم
            </h2>
            <p className="text-xl mb-12 opacity-95 leading-relaxed font-medium max-w-3xl mx-auto">
              انضم إلى آلاف الطلاب الذين اختاروا مركز التدريس لتعلم علم النفس والفلسفة
            </p>
            <motion.button
              className="group relative px-12 py-6 bg-white text-blue-600 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 inline-flex items-center gap-3 transform hover:-translate-y-2 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">ابدأ الآن</span>
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 relative" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
