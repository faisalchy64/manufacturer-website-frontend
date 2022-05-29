import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState("");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                `http://localhost:5000/orders?email=${user?.email}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            );

            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                navigate("/");
            }

            setOrders(res.data);
        })();
    }, [orders, user.email, navigate]);

    // delete a specific order item from database

    const handleConfirm = async (confirm) => {
        if (confirm) {
            const res = await axios.delete(`http://localhost:5000/order/${id}`);

            console.log(res.data);
        }
    };

    return (
        <section>
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-center">
                My Orders
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Transaction</th>
                            <th>Price($)</th>
                            <th>Quantity</th>
                            <th>Pay</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.productName}</td>
                                <td>{order?.transactionId}</td>
                                <td>{order?.price}</td>
                                <td>{order?.quantity}</td>
                                <td>
                                    {order?.paid ? (
                                        <button className="btn btn-sm btn-success">
                                            {order?.shipping
                                                ? "Shipping"
                                                : "Paid"}
                                        </button>
                                    ) : (
                                        <Link
                                            to={`/dashboard/payment/${order._id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Pay Now
                                        </Link>
                                    )}
                                </td>
                                <td>
                                    <label
                                        htmlFor="my-modal-6"
                                        className="btn btn-sm btn-error modal-button"
                                        disabled={order?.paid}
                                        onClick={() => setId(order._id)}
                                    >
                                        Cancel
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are You Sure, You Want To Cancel The Order!
                    </h3>
                    <div className="modal-action">
                        <label
                            onClick={() => handleConfirm("confirm")}
                            htmlFor="my-modal-6"
                            className="btn btn-success"
                        >
                            Confirm
                        </label>

                        <label htmlFor="my-modal-6" className="btn btn-error">
                            Cancel
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyOrders;
