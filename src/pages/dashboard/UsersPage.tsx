import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../config/axiosApi";

const UsersPage = () => {
    const { data } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            console.log(token);

            const { data } = await axiosApi.get("/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("📦 Response from API:", data);
            return data;

        },

    });
    console.log(data);


    return (
        <div>

        </div>
    )
};

export default UsersPage;
