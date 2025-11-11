import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../config/axiosApi";

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
    console.log(data);

    const serverURL = "http://localhost:5000"; 

    if (isLoading) return <p>جاري التحميل...</p>;
    if (error) return <p>حدث خطأ أثناء جلب البيانات</p>;

    return (
        <div className="p-6 text-black space-y-4">
            <h1 className="text-2xl font-bold">كل الفيديوهات والملفات</h1>
            {data.map((product: IData) => (
                <div key={product._id} className="border p-4 rounded">
                    <h2 className="font-semibold">{product.title}</h2>
                    <p>{product.description}</p>

                    {/* ✅ عرض الفيديو */}
                    {product.type === "video" && product.fileUrl && (
                        <video
                            controls
                            src={`${serverURL}${product.fileUrl}`}
                            className="w-[50%] mt-2 rounded-lg shadow-md"
                        />
                    )}

                    {/* ✅ تحميل الـ PDF */}
                    {product.type === "pdf" && product.fileUrl && (
                        <a
                            href={`${serverURL}${product.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline mt-2 block"
                        >
                            تحميل الملف
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductPage;
