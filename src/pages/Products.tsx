import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { IProduct } from '../interfaces';
import { addItemCart } from '../app/features/product/ProductSlice';
import { useAppDispatch } from '../app/store';

const Products = () => {
    const dispatch = useAppDispatch();


    const ApiProducts = async (): Promise<{ products: IProduct[] }> => {
        const { data } = await axios.get("https://dummyjson.com/products");

        const filteredProducts = data.products.map((product: IProduct) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
        }));
        return { products: filteredProducts };
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: ApiProducts,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {data?.products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white text-center dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                    <img
                        width={100}
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-cover w-full h-48"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
                            {product.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            💰 <span className="font-bold">${product.price}</span>
                        </p>
                        <button
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors duration-300"
                            onClick={() => dispatch(addItemCart(product))}
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>
            ))}
            
        </div>
    );
};

export default Products;
