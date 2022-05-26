import { Outlet, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

function AdminRoute() {
    const location = useLocation();
    const [admin] = useAdmin();

    return <Outlet />;
}

export default AdminRoute;
