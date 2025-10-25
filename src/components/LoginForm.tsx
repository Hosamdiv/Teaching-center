import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGraduationCap } from 'react-icons/fa';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

   
    onLogin(email, password);
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <FaGraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تسجيل الدخول</h2>
          <p className="text-gray-600">أدخل بياناتك للوصول إلى المحتوى التعليمي</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right transition-all duration-300 text-lg text-gray-800 placeholder-gray-500 ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300 bg-white'
                } focus:outline-none focus:ring-4 focus:ring-opacity-20`}
                placeholder="أدخل بريدك الإلكتروني"
                dir="rtl"
              />
            </div>
            {errors.email && (
              <motion.p 
                className="mt-2 text-sm text-red-600 text-right"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-right">
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right transition-all duration-300 text-lg text-gray-800 placeholder-gray-500 ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300 bg-white'
                } focus:outline-none focus:ring-4 focus:ring-opacity-20`}
                placeholder="أدخل كلمة المرور"
                dir="rtl"
              />
              <button
                type="button"
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p 
                className="mt-2 text-sm text-red-600 text-right"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري تسجيل الدخول...</span>
              </div>
            ) : (
              'تسجيل الدخول'
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
            نسيت كلمة المرور؟
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
