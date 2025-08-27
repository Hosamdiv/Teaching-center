import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../pages/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="psychology" element={<Home />} />
                <Route path="philosophy" element={<Home />} />
                <Route path="students" element={<Home />} />
                <Route path="contact" element={<Home />} />
            </Route>
        </>
    )
);

export default router;