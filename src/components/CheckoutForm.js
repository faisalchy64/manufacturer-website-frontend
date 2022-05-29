import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function CheckoutForm({ order }) {
    const [err, setErr] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");

    const { _id, price, name, email } = order;

    useEffect(() => {
        (async () => {
            const res = await axios.post(
                "http://localhost:5000/create-payment-intent",
                {
                    price,
                }
            );
            if (res?.data?.clientSecret) {
                setClientSecret(res.data.clientSecret);
            }
            console.log(res.data);
        })();
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // paymentMethod

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setErr(error.message);
        } else {
            setErr("");
        }

        setSuccess("");

        const { paymentIntent, error: intErr } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            });

        if (intErr) {
            setErr(intErr.message);
        } else {
            setTransactionId(paymentIntent.id);
            setErr("");
            setSuccess("Payment Successfully Completed!");

            const payment = {
                _id: _id,
                transactionId: paymentIntent.client_secret,
            };

            const res = await axios.put(
                `http://localhost:5000/order/${_id}`,
                payment
            );

            if (res.data.acknowledged) {
                toast.success("Payment Completed!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <>
            <form
                className="flex flex-col min-h-full justify-between"
                onSubmit={handleSubmit}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "15px",
                                fontWeight: "bold",
                                color: "#34495E",
                            },
                        },
                    }}
                />

                {err && (
                    <p className="text-xs font-bold text-center text-error">
                        {err}
                    </p>
                )}
                {success && (
                    <p className="text-xs font-bold text-center text-success">
                        {success}
                    </p>
                )}
                <button
                    className="btn btn-sm btn-success text-base-100  rounded-2xl"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
            </form>
            <ToastContainer />
        </>
    );
}

export default CheckoutForm;
