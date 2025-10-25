import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGraduationCap } from 'react-icons/fa';

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, isLoading = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // ✅ التحقق من القيم
    let valid = true;
    const newErrors: typeof errors = {};

    if (!name) {
      newErrors.name = 'الاسم مطلوب';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
      valid = false;
    }
    if (password && password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      valid = false;
    }


    if (!valid) {
      setErrors(newErrors);
      return;
    }

    onRegister(name, email, password);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h2>
          <p className="text-gray-600">قم بإنشاء حساب للوصول إلى المحتوى التعليمي</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">اسم المستخدم</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right text-lg text-gray-800 placeholder-gray-500 transition-all duration-300 ${errors.name
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                  } focus:outline-none focus:ring-4`}
                placeholder="أدخل اسم المستخدم"
                dir="rtl"
              />
            </div>
            {errors.name && (
              <motion.p className="mt-2 text-sm text-red-600 text-right" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">البريد الإلكتروني</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right text-lg text-gray-800 placeholder-gray-500 transition-all duration-300 ${errors.email
                  ? 'border-red-300 bg-transparent focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 bg-transparent focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                  } focus:outline-none focus:ring-4`}
                placeholder="أدخل بريدك الإلكتروني"
                dir="rtl"
              />

            </div>
            {errors.email && (
              <motion.p className="mt-2 text-sm text-red-600 text-right" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">كلمة المرور</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pr-12 pl-4 py-4 border-2 rounded-2xl text-right text-lg text-gray-800 placeholder-gray-500 transition-all duration-300 ${errors.password
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                  } focus:outline-none focus:ring-4`}
                placeholder="أدخل كلمة المرور"
                dir="rtl"
              />
              <button type="button" className="absolute inset-y-0 left-0 pl-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
              </button>
            </div>
            {errors.password && (
              <motion.p className="mt-2 text-sm text-red-600 text-right" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Confirm Password */}
          <div>

            {errors.confirmPassword && (
              <motion.p className="mt-2 text-sm text-red-600 text-right" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري إنشاء الحساب...</span>
              </div>
            ) : (
              'إنشاء الحساب'
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
            لديك حساب بالفعل؟ تسجيل الدخول
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
