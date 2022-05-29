import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useLocation } from "react-router-dom";
import auth from "../firebase";
import useAdmin from "../hooks/useAdmin";

function Navbar() {
    const [user] = useAuthState(auth);
    const { pathname } = useLocation();
    const [admin] = useAdmin(user?.email);

    return (
        <div className="navbar justify-between bg-base-100">
            <div>
                {pathname.includes("/dashboard") && (
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                )}

                <div className="">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        Comparts
                    </Link>
                </div>
            </div>

            <div className="navbar-end grow hidden lg:flex">
                <ul className="menu menu-horizontal p-0 gap-x-1.5">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/myportfolio">My Portfolio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog">Blog</NavLink>
                    </li>

                    {user ? (
                        <>
                            <li>
                                {admin ? (
                                    <NavLink to="/dashboard/manageallorders">
                                        Dashboard
                                    </NavLink>
                                ) : (
                                    <NavLink to="/dashboard/myorders">
                                        Dashboard
                                    </NavLink>
                                )}
                            </li>
                            <li>
                                <p
                                    onClick={() => {
                                        signOut(auth);
                                        localStorage.removeItem("accessToken");
                                    }}
                                >
                                    Signout
                                </p>
                            </li>
                            <li>
                                <p className="font-bold text-base-100 bg-rose-700  active:bg-rose-700">
                                    {user?.displayName}
                                </p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup">Signup</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="navbar-end lg:hidden">
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex="0"
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li className="mb-1.5">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/myportfolio">My Portfolio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    {admin ? (
                                        <NavLink to="/dashboard/manageallorders">
                                            Dashboard
                                        </NavLink>
                                    ) : (
                                        <NavLink to="/dashboard/myorders">
                                            Dashboard
                                        </NavLink>
                                    )}
                                </li>
                                <li className="mb-1.5">
                                    <p
                                        onClick={() => {
                                            signOut(auth);
                                            localStorage.removeItem(
                                                "accessToken"
                                            );
                                        }}
                                    >
                                        Signout
                                    </p>
                                </li>
                                <li className="mb-1.5">
                                    <p className="font-bold text-base-100 bg-rose-700  active:bg-rose-700">
                                        {user?.displayName}
                                    </p>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mb-1.5">
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li className="mb-1.5">
                                    <NavLink to="/signup">Signup</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
