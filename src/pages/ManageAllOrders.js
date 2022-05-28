import axios from "axios";
import { useQuery } from "react-query";

function ManageAllOrders() {
    const { data: orders } = useQuery("orders", () =>
        axios.get("http://localhost:5000/allorders").then((res) => res.data)
    );

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
                            <th>Product</th>
                            <th>Transaction</th>
                            <th>Price($)</th>
                            <th>Quantity</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order?._id}>
                                <td>{order?.email}</td>
                                <td>{order?.productName}</td>
                                <td>{order?.transactionId}</td>
                                <td>{order?.price}</td>
                                <td>{order?.quantity}</td>
                                <td>
                                    {order?.paid ? (
                                        <button className="btn btn-sm btn-success">
                                            Pending
                                        </button>
                                    ) : (
                                        <button className="btn btn-sm btn-primary">
                                            Unpaid
                                        </button>
                                    )}
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
                        <label htmlFor="my-modal-6" className="btn btn-success">
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

export default ManageAllOrders;
