import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem("authToken"); // Check if token exists

    return isLoggedIn ? <Outlet /> : <Navigate to="/home" />;
};

const ProtectedResetRoute = () => {
    const resetPasswordToken = sessionStorage.getItem("resetPasswordToken"); // Check if token exists

    return resetPasswordToken ? <Outlet /> : <Navigate to="/forgotpassword/enterotp" />;
};
const ProtectedpasswordRoute = () => {
    const resetPasswordToken = sessionStorage.getItem("resetToken"); // Check if token exists

    return resetPasswordToken ? <Outlet /> : <Navigate to="/resetpassword" />;
};


export default ProtectedRoute;
export { ProtectedResetRoute , ProtectedpasswordRoute};