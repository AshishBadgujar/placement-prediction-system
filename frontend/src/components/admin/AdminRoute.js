import React from "react";
import { Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BaseLayout from "../Layout";
import Login from "../Login";

const AdminRoute = ({ component: Component }) => {
    const { authed } = useAuth();
    let location = useLocation();

    if (authed.admin) {
        return <BaseLayout>
            <Component />
        </BaseLayout>
    }
    if (authed) {
        return <Navigate to="/" />
    }
    return <Navigate to="/login" />
};

export default AdminRoute;