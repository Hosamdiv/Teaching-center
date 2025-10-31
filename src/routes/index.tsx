import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userData = user ? JSON.parse(user) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🌍 الصفحات داخل الـ Layout */}
      <Route path="/" element={<RootLayout />}>
        {/* 🏠 الصفحة الرئيسية — متاحة فقط لو في توكن */}
        <Route
          index
          element={
            <ProtectedRoute isAllowed={!!token} redirectPath="/login" data={userData}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* 🧑‍💻 صفحة الأدمن فقط */}
        <Route
          path="dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Route>

      {/* 🔑 صفحات الدخول والتسجيل */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </>
  )
);

export default router;
