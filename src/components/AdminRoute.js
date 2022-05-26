import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

function AdminRoute() {
    const location = useLocation();
    const [admin] = useAdmin();

    if (!admin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
