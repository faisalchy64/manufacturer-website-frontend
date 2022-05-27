import { NavLink } from "react-router-dom";

function DashboardContent({ children }) {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content m-10">{children}</div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-60 bg-base-200 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li>
                        <NavLink to="/dashboard/myorders">My Orders</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addreview">
                            Add A Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myprofile">My Profile</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DashboardContent;
