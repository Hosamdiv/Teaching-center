import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../config/axiosApi";
import { FaVideo, FaFilePdf, FaDownload, FaSpinner } from "react-icons/fa";
import { useState } from "react";

interface IData {
    _id: string;
    fileUrl: string;
    title: string;
    description: string;
    type: string;
}

const ProductPage = () => {
    const [activeTab, setActiveTab] = useState<"videos" | "pdf">("videos");

    const useProducts = () => {
        return useQuery({
            queryKey: ["products"],
            queryFn: async () => {
                const { data } = await axiosApi.get("/products");
                return data;
            },
        });
    };

    const { data, isLoading, error } = useProducts();
    const serverURL = "http://localhost:5000";

    // فلترة البيانات حسب النوع
    const videos = data?.filter((product: IData) => product.type === "video") || [];
    const pdfs = data?.filter((product: IData) => product.type === "pdf") || [];

    // تحسين حالة التحميل
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center space-y-4">
                    <FaSpinner className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                    <p className="text-xl text-gray-700 font-medium">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    // تحسين حالة الخطأ
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <p className="text-xl text-gray-800 font-semibold">حدث خطأ أثناء جلب البيانات</p>
                    <p className="text-gray-600">يرجى المحاولة مرة أخرى</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* العنوان الرئيسي */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        الفيديوهات والملفات
                    </h1>
                    <p className="text-gray-600 text-lg">
                        استمتع بمحتوى تعليمي متنوع ومفيد
                    </p>
                </div>

                {/* التبويبات */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white rounded-xl p-2 shadow-lg border border-gray-200">
                        <button
                            onClick={() => setActiveTab("videos")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === "videos"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                        >
                            <FaVideo className="w-5 h-5" />
                            <span>الفيديوهات</span>
                            <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">
                                {videos.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("pdf")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === "pdf"
                                    ? "bg-red-600 text-white shadow-md"
                                    : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
                            }`}
                        >
                            <FaFilePdf className="w-5 h-5" />
                            <span>الملفات PDF</span>
                            <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">
                                {pdfs.length}
                            </span>
                        </button>
                    </div>
                </div>

                {/* صفحة الفيديوهات */}
                {activeTab === "videos" && (
                    <div>
                        {videos.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaVideo className="w-8 h-8 text-blue-400" />
                                </div>
                                <p className="text-xl text-gray-800 font-semibold">لا توجد فيديوهات</p>
                                <p className="text-gray-600">سيتم إضافة الفيديوهات قريباً</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {videos.map((product: IData) => (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                                    >
                                        {/* رأس البطاقة */}
                                        <div className="p-6 border-b border-gray-100">
                                            <div className="flex items-start justify-center mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <FaVideo className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                                                        فيديو
                                                    </span>
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                                                {product.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* محتوى البطاقة */}
                                        <div className="p-6">
                                            {product.fileUrl && (
                                                <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-inner">
                                                    <video
                                                        controls
                                                        src={`${serverURL}${product.fileUrl}`}
                                                        className="w-full h-auto rounded-xl"
                                                        preload="metadata"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* صفحة PDF */}
                {activeTab === "pdf" && (
                    <div>
                        {pdfs.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaFilePdf className="w-8 h-8 text-red-400" />
                                </div>
                                <p className="text-xl text-gray-800 font-semibold">لا توجد ملفات PDF</p>
                                <p className="text-gray-600">سيتم إضافة الملفات قريباً</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pdfs.map((product: IData) => (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                                    >
                                        {/* رأس البطاقة */}
                                        <div className="p-6 border-b border-gray-100">
                                            <div className="flex items-start justify-center mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                        <FaFilePdf className="w-5 h-5 text-red-600" />
                                                    </div>
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                                        PDF
                                                    </span>
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-red-600 transition-colors">
                                                {product.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* محتوى البطاقة */}
                                        <div className="p-6">
                                            {product.fileUrl && (
                                                <a
                                                    href={`${serverURL}${product.fileUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                                >
                                                    <FaDownload className="w-5 h-5" />
                                                    <span>تحميل الملف</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;

