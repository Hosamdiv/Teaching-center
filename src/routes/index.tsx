import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../pages/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import TestPage from "../pages/TestPage";
import ElzeroCircle from "../pages/NewPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="psychology" element={< TestPage/>} />
                <Route path="philosophy" element={<ElzeroCircle />} />
                <Route path="students" element={<Home />} />
                <Route path="contact" element={<Home />} />
            </Route>
        </>
    )
);

export default router;