import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51L3t5tIat5xmsfpFy3Tqph7f5FwbTYFCFdUPTmAheoE7M7Y5cigNaTK4Sg9Cp6djkzGcuLN9IrO6Uvfsa9ZnCMtQ00a2p4U4vi"
);

function Payment() {
    const [order, setOrder] = useState({});
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:5000/order/${id}`);
            setOrder(res.data);
        })();
    }, [id]);

    return (
        <section className="flex flex-col items-center my-10">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Pay Now
            </h1>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="w-full sm:w-[300px] md:w[400px]">
                    <img src={order.img} alt="" />
                </figure>
                <div className="card-body">
                    <h2 className="text-xl md:text-3xl font-bold mb-2.5">
                        {order.productName}
                    </h2>
                    <h2 className="font-bold">Description</h2>
                    <p className="text-xs flex-grow-0">{order.description}</p>
                    <h2 className="font-bold">Pay Amount : ${order.price}</h2>
                    <h2 className="font-bold">
                        Quantity : {order.quantity} Pieces
                    </h2>
                </div>
            </div>

            <div className="card w-full md:w-[450px] my-10 shadow-2xl">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </section>
    );
}

export default Payment;
