import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

function ManageProducts() {
    const [id, setId] = useState("");

    const { data: products, refetch } = useQuery("products", () =>
        axios.get("http://localhost:5000/items").then((res) => res.data)
    );

    const handleDelete = async (confirm) => {
        if (confirm) {
            const res = await axios.delete(`http://localhost:5000/item/${id}`);

            if (res.data.acknowledged) {
                refetch();
            }
        }
    };

    return (
        <section>
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-center">
                Manage All Products
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price($)</th>
                            <th>Available Quantity</th>
                            <th>Minimum Quantity</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product?._id}>
                                <td>{product?.name}</td>
                                <td>{product?.price}</td>
                                <td>{product?.available}</td>
                                <td>{product?.minimum}</td>
                                <td>
                                    <label
                                        htmlFor="my-modal-6"
                                        className="btn btn-sm btn-error modal-button"
                                        onClick={() => setId(product._id)}
                                    >
                                        Delete
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
                        Are You Sure, You Want To Delete The Product!
                    </h3>
                    <div className="modal-action">
                        <label
                            onClick={() => handleDelete("confirm")}
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

export default ManageProducts;
