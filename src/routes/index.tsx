import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userData = user ? JSON.parse(user) : null;
console.log(token);

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
                    path="dashboard"
                    element={
                        <ProtectedRoute isAllowed={!!token} redirectPath="/login" data={userData}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Route>
            <Route
                path="login"
                element={<Login />}
            />
            <Route
                path="register"
                element={<Register />}
            />
        </>

    )
);

export default router;
