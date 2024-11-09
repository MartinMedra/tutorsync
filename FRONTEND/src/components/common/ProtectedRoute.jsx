import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import propTypes from "prop-types";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to={user.role === "Tutor" ? "/tutor" : "/estudiante"} />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: propTypes.element.isRequired,
    requiredRole: propTypes.string,
};

export default ProtectedRoute;
