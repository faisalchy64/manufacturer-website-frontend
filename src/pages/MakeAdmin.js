import axios from "axios";
import { useQuery } from "react-query";
import TableRow from "../components/TableRow";

function MakeAdmin() {
    const { data: users, refetch } = useQuery("users", () =>
        axios
            .get("https://manufacturer-website-backend.onrender.com/users", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((res) => res.data)
    );

    return (
        <section>
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-center">
                Make Admin
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
                            <TableRow
                                key={user._id}
                                user={user}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default MakeAdmin;
