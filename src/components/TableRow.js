import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase";

function TableRow({ user, refetch }) {
    const [isAdmin] = useAuthState(auth);
    const handleAdmin = (email) => {
        // axios
        //     .put(`https://manufacturer-website-backend.onrender.com/user/admin/${email}`, {
        //         headers: {
        //             authorization: `Bearer ${localStorage.getItem(
        //                 "accessToken"
        //             )}`,
        //         },
        //     })
        //     .then((res) => refetch());

        axios
            .put(
                `https://manufacturer-website-backend.onrender.com/user/admin/${email}`,
                {
                    email: isAdmin.email,
                }
            )
            .then((res) => refetch());
    };

    return (
        <tr key={user._id}>
            <td>{user.email}</td>
            <td>
                {user.role ? (
                    "Admin"
                ) : (
                    <button
                        onClick={() => handleAdmin(user.email)}
                        className="btn btn-xs btn-success"
                    >
                        Make Admin
                    </button>
                )}
            </td>
            <td>
                <button className="btn btn-xs btn-error">Remove User</button>
            </td>
        </tr>
    );
}

export default TableRow;
