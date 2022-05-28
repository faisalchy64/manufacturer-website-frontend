import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase";
import useAdmin from "../hooks/useAdmin";
import Loading from "./Loading";

function AdminRoute({ children }) {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoad] = useAdmin(user.email);

    if (loading || adminLoad) {
        return <Loading />;
    }

    if (!user || !admin) {
        signOut(auth);

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default AdminRoute;
