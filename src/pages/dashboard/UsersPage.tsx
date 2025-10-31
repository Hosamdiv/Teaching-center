import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { axiosApi } from "../../config/axiosApi";
import { FaUserShield, FaUserAlt } from "react-icons/fa";

export interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    isPaid: boolean;
}

const UsersPage = () => {
    const { data, isLoading, isError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const { data } = await axiosApi.get("/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(data);

            return data;
        },
    });
    console.log(data);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold text-slate-600">
                جاري تحميل المستخدمين...
            </div>
        );

    if (isError)
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">
                حدث خطأ أثناء جلب المستخدمين ❌
            </div>
        );

    return (
        <motion.div
            className="p-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">
                قائمة المستخدمين 👥
            </h1>

            <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">الاسم</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">البريد الإلكتروني</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">النوع</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">مدفوع؟</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((user) => (
                            <motion.tr
                                key={user._id}
                                whileHover={{ backgroundColor: "#f8fafc" }}
                                className="border-b border-slate-200"
                            >
                                <td className="px-6 py-4 text-slate-700 font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    {user.isAdmin ? (
                                        <>
                                            <FaUserShield className="text-green-600" />
                                            <span className="text-green-700 font-medium">أدمن</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUserAlt className="text-gray-500" />
                                            <span className="text-gray-600">مستخدم</span>
                                        </>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isPaid ? (
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                            مدفوع
                                        </span>
                                    ) : (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                            غير مدفوع
                                        </span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UsersPage;
