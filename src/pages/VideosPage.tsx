import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../config/axiosApi";
import { FaVideo, FaFilePdf, FaDownload, FaSpinner } from "react-icons/fa";

interface IData {
    _id: string;
    fileUrl: string;
    title: string;
    description: string;
    type: string;
}

const ProductPage = () => {
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

    // حالة عدم وجود بيانات
    if (!data || data.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <FaVideo className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xl text-gray-800 font-semibold">لا توجد فيديوهات أو ملفات</p>
                    <p className="text-gray-600">سيتم إضافة المحتوى قريباً</p>
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
                        كل الفيديوهات والملفات
                    </h1>
                    <p className="text-gray-600 text-lg">
                        استمتع بمحتوى تعليمي متنوع ومفيد
                    </p>
                </div>

                {/* Grid للبطاقات */}
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
                    {data.map((product: IData) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                        >
                            {/* رأس البطاقة */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start justify-center mb-3">
                                    <div className="flex items-center gap-3">
                                        {product.type === "video" ? (
                                            <div className="w-10  h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FaVideo className="w-5 h-5 text-blue-600" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <FaFilePdf className="w-5 h-5 text-red-600" />
                                            </div>
                                        )}
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                            {product.type === "video" ? "فيديو" : "PDF"}
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
                                {/* عرض الفيديو */}
                                {product.type === "video" && product.fileUrl && (
                                    <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-inner">
                                        <video
                                            controls
                                            src={`${serverURL}${product.fileUrl}`}
                                            className="w-full h-auto rounded-xl"
                                            preload="metadata"
                                        />
                                    </div>
                                )}

                                {/* رابط تحميل PDF */}
                                {product.type === "pdf" && product.fileUrl && (
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
            </div>
        </div>
    );
};

export default ProductPage;
