import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../firebase";

function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    Comparts
                </Link>
            </div>

            <div className="navbar-end hidden md:flex">
                <ul className="menu menu-horizontal p-0 gap-x-1.5">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <p
                                    onClick={() => signOut(auth)}
                                    className="bg-base-200 font-bold"
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

            <div className="navbar-end md:hidden">
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
                        {user ? (
                            <>
                                <li className="mb-1.5">
                                    <p
                                        onClick={() => signOut(auth)}
                                        className="bg-base-200 font-bold"
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
