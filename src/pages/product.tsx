import { useSelector } from "react-redux";
import { removeFromCart, selectCart } from "../app/features/product/ProductSlice";
import { useAppDispatch } from "../app/store";

const Product = () => {
    const { cartItem } = useSelector(selectCart);
    const dispatch = useAppDispatch();
    return (
        <div>
            {cartItem.length === 0 ? (
                <h1 className="text-center mt-5 font-bold text-3xl">لا يوجد منتجات داخل السله</h1>
            ) : (
                cartItem.map((item) => (
                    <div key={item.id} className="border p-4 mb-2">
                        <h1>{item.title}</h1>
                        <h2>السعر: {item.price}</h2>
                        <img src={item.thumbnail} alt={item.title} width={100} />
                        <p>الكمية: {item.qty}</p>
                        <button
                            className=" px-3 py-2 rounded bg-red-500"
                            onClick={() => dispatch(removeFromCart(item.id))}>إزالة من السلة</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default Product



