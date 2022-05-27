import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

function CheckoutForm({ order }) {
    const [err, setErr] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [pros, setPros] = useState(false);
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
        setPros(true);

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
            setPros(false);
        } else {
            setTransactionId(paymentIntent.id);
            setErr("");
            setSuccess("Payment Successfully Completed!");

            const payment = {
                _id: _id,
                transactionId: transactionId,
            };

            const res = axios.put(
                `http://localhost:5000/order/${_id}`,
                payment
            );

            console.log(res.data);
            setPros(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "12.5px",
                                fontWeight: 600,
                                color: "#17202A",
                                "::placeholder": {
                                    color: "#1B2631",
                                },
                            },
                            invalid: {
                                color: "#E74C3C",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-sm btn-success text-base-100 mt-5 px-10  rounded-2xl"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
            </form>

            {err && <p className="text-xs text-error">{err}</p>}
            {success && <p className="text-xs text-success">{success}</p>}
        </>
    );
}

export default CheckoutForm;
