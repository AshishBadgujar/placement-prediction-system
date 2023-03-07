import React from "react";
import { Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BaseLayout from "../Layout";
import Login from "../Login";

const StudentRoute = ({ component: Component }) => {
    const { authed } = useAuth();
    let location = useLocation();

    if (authed && !authed.admin) {
        return <BaseLayout>
            <Component />
        </BaseLayout>
    }
    if (authed) {
        return <Navigate to="/" />
    }
    return <Navigate to="/login" />
};

export default StudentRoute;