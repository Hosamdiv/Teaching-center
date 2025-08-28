import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGraduationCap, FaShieldAlt } from 'react-icons/fa';

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

    // Validation
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'البريد الإلكتروني مطلوب' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'كلمة المرور مطلوبة' }));
      return;
    }

    onLogin(email, password);
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 opacity-50"></div>
        
        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <div className="flex justify-center mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl relative">
                <FaGraduationCap className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <FaShieldAlt className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">تسجيل الدخول</h2>
          <p className="text-gray-600 text-lg font-medium">أدخل بياناتك للوصول إلى المحتوى التعليمي</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 text-right">
              البريد الإلكتروني
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right transition-all duration-300 text-lg ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                } focus:outline-none focus:ring-4 focus:ring-opacity-20 bg-white/80 backdrop-blur-sm`}
                placeholder="أدخل بريدك الإلكتروني"
                dir="rtl"
              />
            </div>
            {errors.email && (
              <motion.p 
                className="mt-3 text-sm text-red-600 text-right font-medium"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 text-right">
              كلمة المرور
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right transition-all duration-300 text-lg ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                } focus:outline-none focus:ring-4 focus:ring-opacity-20 bg-white/80 backdrop-blur-sm`}
                placeholder="أدخل كلمة المرور"
                dir="rtl"
              />
              <button
                type="button"
                className="absolute inset-y-0 left-0 pl-4 flex items-center hover:scale-110 transition-transform duration-200"
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
                className="mt-3 text-sm text-red-600 text-right font-medium"
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
            className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform hover:-translate-y-1 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed shadow-lg'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25'
            } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">جاري تسجيل الدخول...</span>
              </div>
            ) : (
              <span className="text-lg">تسجيل الدخول</span>
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center relative z-10">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium hover:underline">
            نسيت كلمة المرور؟
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
