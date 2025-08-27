import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import { FaArrowRight } from 'react-icons/fa';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Welcome Content */}
          <motion.div
            className="text-center lg:text-right"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                مرحباً بك في
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  مركز التدريس
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                منصة تعليمية متطورة لتدريس علم النفس والفلسفة
              </p>
            </div>

            <div className="space-y-4 text-right">
              <div className="flex items-center space-x-3 space-x-reverse justify-center lg:justify-end">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">محاضرات مسجلة عالية الجودة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse justify-center lg:justify-end">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">محتوى تعليمي متخصص</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse justify-center lg:justify-end">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">إشتراكات مرنة ومناسبة</span>
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/')}
              className="mt-8 inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>العودة للرئيسية</span>
              <FaArrowRight />
            </motion.button>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
