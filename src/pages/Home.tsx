import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBrain, FaLightbulb, FaUsers, FaPlay, FaArrowRight } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              مركز التدريس
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                علم النفس والفلسفة
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              منصة تعليمية متطورة تقدم محاضرات مسجلة عالية الجودة في مجال علم النفس والفلسفة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ابدأ التعلم الآن
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تعرف على المزيد
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار مركز التدريس؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم تجربة تعليمية فريدة تجمع بين التميز الأكاديمي والتكنولوجيا الحديثة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaBrain,
                title: 'علم النفس',
                description: 'محاضرات شاملة تغطي جميع جوانب علم النفس من الأساسيات إلى المتقدم',
                color: 'blue'
              },
              {
                icon: FaLightbulb,
                title: 'الفلسفة',
                description: 'استكشاف الفلسفة عبر العصور من اليونان القديمة إلى الفلسفة المعاصرة',
                color: 'purple'
              },
              {
                icon: FaUsers,
                title: 'مجتمع تعليمي',
                description: 'انضم إلى مجتمع من الطلاب والمهتمين بالعلوم الإنسانية',
                color: 'green'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              ابدأ رحلة التعلم اليوم
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف الطلاب الذين اختاروا مركز التدريس لتعلم علم النفس والفلسفة
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 space-x-reverse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>ابدأ الآن</span>
              <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
