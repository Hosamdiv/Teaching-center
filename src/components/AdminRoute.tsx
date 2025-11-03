import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../app/features/product/usersSlice";
import { toast } from "react-toastify";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectCurrentUser);

  console.log("isAdmin:", user?.isAdmin);

  // 🚫 لو مفيش مستخدم → رجّعه للصفحة الرئيسية
  if (!user) {
    toast.error("ممنوع تدخل هنا ياض", { position: "top-right" });
    return <Navigate to="/" replace />;
  }

  // 🚫 لو المستخدم مش أدمن → رجّعه للصفحة الرئيسية
  if (!user.isAdmin) {
    toast.error("ممنوع تدخل هنا ياض", { position: "top-right" });
    return <Navigate to="/" replace />;
  }

  // ✅ لو أدمن → خليه يدخل
  return children;
};

export default AdminRoute;
