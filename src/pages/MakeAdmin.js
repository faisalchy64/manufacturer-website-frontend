import axios from "axios";
import { useQuery } from "react-query";

function MakeAdmin() {
    const { data: users, refetch } = useQuery("users", () =>
        axios
            .get("http://localhost:5000/users", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((res) => res.data)
    );

    const handleAdmin = (email) => {
        axios
            .put(`http://localhost:5000/user/admin/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((res) => refetch());
    };

    return (
        <section>
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-center">
                Manage All Orders
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>
                                    {user.role ? (
                                        "Admin"
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleAdmin(user.email)
                                            }
                                            className="btn btn-xs btn-success"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-xs btn-error">
                                        Remove User
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default MakeAdmin;
