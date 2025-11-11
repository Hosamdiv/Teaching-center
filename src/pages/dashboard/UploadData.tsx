import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosApi } from "../../config/axiosApi";
import { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCloudUploadAlt,
    FaFilePdf,
    FaFileVideo,
    FaTrash,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";

const UploadData = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [dragOver, setDragOver] = useState<boolean>(false);

    const token = localStorage.getItem("token");

    const uploadMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosApi.post("/products/upload-video", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (e) => {
                    if (e.total) {
                        const percent = Math.round((e.loaded * 100) / e.total);
                        setUploadProgress(percent);
                    }
                },
            });
            return data;
        },
        onSuccess: () => {
            setFile(null);
            setTitle("");
            setDescription("");
            setUploadProgress(0);
        },
        onError: (e: AxiosError) => {
            console.log(e);

            setUploadProgress(0);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("من فضلك اختر ملف فيديو أو PDF");
        if (!title.trim()) return alert("من فضلك أدخل العنوان");

        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title);
        formData.append("description", description);

        uploadMutation.mutate(formData);
    };

    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (!dropped) return;
        if (!["application/pdf", ...["video/mp4", "video/quicktime", "video/x-msvideo", "video/mpeg"]].includes(dropped.type)) {
            return alert("يدعم فقط فيديو أو PDF");
        }
        setFile(dropped);
    };

    const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDragLeave = () => setDragOver(false);

    const resetFile = () => setFile(null);

    const fileSize = (bytes: number) => {
        if (!bytes && bytes !== 0) return "";
        const mb = bytes / (1024 * 1024);
        if (mb < 1) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${mb.toFixed(2)} MB`;
    };

    const isPDF = file?.type === "application/pdf";

    return (
        <div className="min-h-[70vh] bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/30 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 p-6 sm:p-8 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <FaCloudUploadAlt className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">رفع محتوى جديد</h1>
                                <p className="text-white/90 text-sm sm:text-base">يدعم رفع الفيديوهات وملفات PDF</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="العنوان"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                            <textarea
                                placeholder="الوصف (اختياري)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-3">
                            <label
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                className={`flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all
                                    ${dragOver ? "border-teal-500 bg-teal-50" : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"}
                                `}
                            >
                                <input
                                    type="file"
                                    accept="video/*,application/pdf"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                                        <FaCloudUploadAlt className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-slate-800">اسحب الملف وأفلته هنا أو اضغط للاختيار</p>
                                        <p className="text-sm text-gray-500">MP4, MOV, AVI أو PDF حتى 500MB</p>
                                    </div>
                                </div>
                            </label>

                            <AnimatePresence>
                                {file && (
                                    <motion.div
                                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPDF ? "bg-red-100" : "bg-blue-100"}`}>
                                                {isPDF ? (
                                                    <FaFilePdf className="w-6 h-6 text-red-600" />
                                                ) : (
                                                    <FaFileVideo className="w-6 h-6 text-blue-600" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-slate-800 truncate max-w-[220px] sm:max-w-[320px]" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>{fileSize(file.size)}</span>
                                                    <span>•</span>
                                                    <span className={`px-2 py-0.5 rounded-full ${isPDF ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                                                        {isPDF ? "PDF" : "Video"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={resetFile}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                            إزالة
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {uploadMutation.isPending && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>جاري الرفع...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-2 bg-teal-600 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        transition={{ ease: "easeOut", duration: 0.2 }}
                                    />
                                </div>
                            </div>
                        )}

                        {!uploadMutation.isPending && (uploadMutation.isSuccess || uploadMutation.isError) && (
                            <div className={`flex items-center gap-3 text-sm ${uploadMutation.isSuccess ? "text-teal-700" : "text-red-700"}`}>
                                {uploadMutation.isSuccess ? (
                                    <>
                                        <FaCheckCircle className="w-5 h-5" />
                                        <span>تم الرفع بنجاح</span>
                                    </>
                                ) : (
                                    <>
                                        <FaExclamationTriangle className="w-5 h-5" />
                                        <span>حدث خطأ أثناء الرفع</span>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={uploadMutation.isPending}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold shadow-lg hover:from-teal-700 hover:to-blue-700 disabled:opacity-50"
                            >
                                {uploadMutation.isPending ? "جارٍ الرفع..." : "رفع"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UploadData;