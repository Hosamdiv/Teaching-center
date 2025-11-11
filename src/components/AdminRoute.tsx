import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../app/features/product/usersSlice";
import { toast } from "react-toastify";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectCurrentUser);


  if (!user) {
    toast.error("ممنوع تدخل هنا ياض", { position: "top-right" });
    return <Navigate to="/" replace />;
  }

  if (!user.isAdmin) {
    toast.error("ممنوع تدخل هنا ياض", { position: "top-right" });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
