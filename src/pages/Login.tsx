import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import { axiosApi } from '../config/axiosApi';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const loginUser = async (userData: { email: string; password: string }) => {
    try {
      const response = await axiosApi.post("/users/login", userData);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;

      throw err?.response?.data || { message: "حدث خطأ أثناء تسجيل الدخول" };
    }
  };
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('تم تسجيل الدخول بنجاح 🎉', { position: 'top-right' });

      localStorage.setItem("token", data.token);
      console.log("Token saved:", data.token);
      setTimeout(() => {
        location.replace("/")
      }, 1500);
    },


    onError: (error: { message?: string; error?: string }) => {

      const message =
        error?.message ||
        error?.error ||
        "البريد الإلكتروني أو كلمة المرور غير صحيحة";

      toast.error(message, { position: "top-right" });
    },
  });

  const handleLogin = (email: string, password: string) => {
    mutation.mutate({ email, password });
  };


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Enhanced Welcome Content */}
              <motion.div
                className="text-center lg:text-right"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo */}
                <div className="flex justify-center lg:justify-end mb-8">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-20 w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl relative">
                      <FaGraduationCap className="w-12 h-12 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Features List */}
                <div className="space-y-6 text-right mb-10">
                  <motion.div
                    className="flex items-center space-x-4 space-x-reverse justify-center lg:justify-end group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-lg font-medium group-hover:text-gray-900 transition-colors duration-300">محاضرات مسجلة عالية الجودة</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 space-x-reverse justify-center lg:justify-end group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-lg font-medium group-hover:text-gray-900 transition-colors duration-300">محتوى تعليمي متخصص</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 space-x-reverse justify-center lg:justify-end group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-lg font-medium group-hover:text-gray-900 transition-colors duration-300">إشتراكات مرنة ومناسبة</span>
                  </motion.div>
                </div>

                {/* Enhanced Back Button */}
                <motion.button
                  onClick={() => navigate('/')}
                  className="group inline-flex items-center space-x-3 space-x-reverse px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-bold hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-200/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">العودة للرئيسية</span>
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </motion.div>

              {/* Right Side - Login Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <LoginForm onLogin={handleLogin} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
