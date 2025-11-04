import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";


import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import PhilosophyPage from "../pages/PhilosophyPage";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userData = user ? JSON.parse(user) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={!!token} redirectPath="/login" data={userData}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="philosophy"
          element={
            <AdminRoute>
              <PhilosophyPage />
            </AdminRoute>
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
      </Route >

      {/* 🔑 صفحات الدخول والتسجيل */}
      < Route path="login" element={< Login />} />
      < Route path="register" element={< Register />} />
    </>
  )

);

export default router;
