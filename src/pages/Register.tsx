import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import RegisterForm from "../components/RegisterForm";
import { FaArrowRight, FaGraduationCap } from "react-icons/fa";
import { axiosApi } from "../config/axiosApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {

    const navigate = useNavigate();
    const registerUser = async (userData: { name: string; email: string; password: string }) => {
        const response = await axiosApi.post("/users/register", userData);
        return response.data;
    };
    // 🔹 React Query mutation
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {

            toast.success('تم التسجيل بنجاح 🎉', { position: 'top-right' });

            localStorage.setItem("token", data.user.name);
            console.log(data);

            // بعد التسجيل الناجح → تحويل المستخدم
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        },
        onError: (error: string) => {
            toast.error('فشل التسجيل ', { position: 'top-right' });

            console.log(error);

        },
    });

    // الدالة اللي تستدعيها الـ RegisterForm
    const handleRegister = (name: string, email: string, password: string) => {
        mutation.mutate({ name, email, password });
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ name, email });
        localStorage.setItem("users", JSON.stringify(users));
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
                            {/* Left Side - Welcome Content */}


                            <motion.div
                                className="text-center lg:text-right"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex justify-center lg:justify-end mb-8">
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mt-20 w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl relative">
                                            <FaGraduationCap className="w-12 h-12 text-white" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl opacity-50"></div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="space-y-6 text-right mb-10">
                                    <div className="flex items-center space-x-4 space-x-reverse justify-center lg:justify-end group">
                                        <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full shadow-lg"></div>
                                        <span className="text-gray-700 text-lg font-medium">
                                            ابدأ رحلتك التعليمية الآن
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => navigate("/")}
                                    className="group inline-flex items-center space-x-3 space-x-reverse px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-bold hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-200/50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-lg">العودة للرئيسية</span>
                                    <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                </motion.button>
                            </motion.div>

                            {/* Right Side - Register Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <RegisterForm
                                    onRegister={handleRegister}
                                    isLoading={mutation.isPending}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Register;
