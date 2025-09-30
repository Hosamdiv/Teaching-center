import axios from "axios";
import { useEffect, useState } from "react";

interface IDate {
    title: string;
    id?: number;
    thumbnail: string;

}
const Images = () => {
    const [data, setData] = useState<IDate[]>([]);
    const [count, setCount] = useState<number>(0);

    const fetchApi = async () => {
        const { data } = await axios.get("https://dummyjson.com/products");
        setData(data.products);
    };


    useEffect(() => {
        console.log("Effect running, starting interval...");
        if (count > 5) {
            fetchApi();
        } else {
            setData([]);
        }

        // cleanup
        return () => {
            console.log("Cleaning up, clearing interval!");
        };
    }, [count]); // [] يعني يشتغل مرّة واحدة عند mount

    return (
        <>
            <div className="space-x-2 mb-3">
                <h1>counter : {count}</h1>
                <button
                    className="border rounded p-2"
                    onClick={() => setCount(pr => pr + 1)}>
                    Increment
                </button>
                <button
                    className="border rounded p-2"
                    onClick={() => setCount(pr => pr - 1)}>
                    Decrement
                </button>
            </div>
            <div className="flex  justify-center  items-center min-h-screen overflow-x-hidden bg-[#181818]">
                <div className="containers columns-3 gap-5 p-[50px_100px] [column-fill:_balance]">
                    {data.map((item) => (
                        <img
                            key={item.id}
                            src={item.thumbnail}
                            alt={item.title}
                            className="mt-2 w-full h-auto border-2 border-white/50 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Images;
