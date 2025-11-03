import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router';
import ButtonMobile from './ui/ButtonMobile';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صالح";
    }

    if (!password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون على الأقل 6 أحرف";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // وقف الإرسال لو في أخطاء
    }
    setIsLoading(true)


    setTimeout(() => {
      setIsLoading(false)

    }, 1500);
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
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right transition-all duration-300 text-lg text-gray-800 placeholder-gray-500 ${errors.email
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
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right transition-all duration-300 text-lg text-gray-800 placeholder-gray-500 ${errors.password
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
          {isLoading ? (
            <ButtonMobile
              styles=' bg-gradient-to-r from-blue-600 to-purple-600'
              isLoading>
              جاري تسجيل الدخول...
            </ButtonMobile>
          ) :
            (
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 
                bg-gray-400 cursor-not-allowed
                 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                تسجيل دخول

              </motion.button>

            )
          }
        </form>
        <Link to="/register">
          <motion.button
            className={`w-full py-3 px-4 mt-3 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            انشاء حساب
          </motion.button>
        </Link>


        {/* Footer Links */}
        <div className="mt-6 text-center">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
            نسيت كلمة المرور؟
          </a>

        </div>
      </div>
    </motion.div >
  );
};

export default LoginForm;
