import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../pages/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import TestPage from "../pages/TestPage";
import Images from "../pages/Images";
import Products from "../pages/Products";
import Product from "../pages/product";
import { AiSummary } from "../pages/AiSummary";
import Register from "../pages/Register";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="psychology" element={< TestPage />} />
                <Route path="philosophy" element={<Images />} />
                <Route path="students" element={<Products />} />
                <Route path="products" element={<Products />} />
                <Route path="cart" element={<Product />} />
                <Route path="aisummary" element={<AiSummary />} />
            </Route>
        </>
    )
);

export default router;