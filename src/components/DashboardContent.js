import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import auth from "../firebase";
import useAdmin from "../hooks/useAdmin";

function DashboardContent({ children }) {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user.email);

    return (
        <div className="grid min-h-screen drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content my-10 mx-2.5 md:mx-5">
                {children}
            </div>
            <div className="drawer-side min-h-full">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 bg-base-200 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    {admin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/manageallorders">
                                    Manage All Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addproduct">
                                    Add A Product
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageproducts">
                                    Manage Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeadmin">
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/myorders">
                                    My Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/addreview">
                                    Add A Review
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li>
                        <NavLink to="/dashboard/myprofile">My Profile</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DashboardContent;
