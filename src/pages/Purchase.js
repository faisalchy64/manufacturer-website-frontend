import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase";
import { toast, ToastContainer } from "react-toastify";

function Purchase() {
    const [item, setItem] = useState({});
    const [quantity, setQunatity] = useState(0);
    const [bool, setBool] = useState(false);
    const { id } = useParams();
    const [user] = useAuthState(auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        if (available < quantity) {
            toast.error("Unavailable Quantity.", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setBool(true);
            return;
        }

        if (minimum > quantity) {
            toast.error(`Minimum ${minimum} Pieces Needed.`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setBool(true);
            return;
        }

        data.productName = name;
        data.img = img;
        data.description = description;
        data.quantity = parseInt(quantity);
        data.price = parseInt(quantity) * price;

        // post a specific order to database

        (async () => {
            const res = await axios.post(
                "https://stormy-sands-44537.herokuapp.com/order",
                data
            );
            if (res.data.acknowledged) {
                toast.success(`Order Place Successfully!`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })();
    };

    // get specific data from database

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                `https://stormy-sands-44537.herokuapp.com/item/${id}`
            );
            setItem(res.data);
            setQunatity(res.data.minimum);
        })();
    }, [id]);

    const { name, img, description, minimum, available, price } = item;

    const handleQuantity = (e) => {
        const input = parseInt(e.target.value);
        setQunatity(input);
        if (input <= available && input >= minimum) {
            setBool(false);
        }
    };

    return (
        <section className="w-4/5 mx-auto my-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img src={img} alt="" />
                </figure>
                <div className="card-body">
                    <h2 className="text-xl md:text-3xl font-bold mb-2.5">
                        {name}
                    </h2>
                    <h2 className="font-bold">Description</h2>
                    <p className="text-xs">{description?.slice(0, 150)}...</p>
                    <h2 className="font-bold">
                        Minimum Order : {minimum} Pieces
                    </h2>
                    <h2 className="font-bold">
                        Available Quantity : {available} Pieces
                    </h2>
                    <h2 className="font-bold">Price : ${price} (Per Piece)</h2>

                    <div className="text-center">
                        <h2 className="text-xl font-bold my-2.5">
                            Enter Order Quantity
                        </h2>
                        <input
                            type="text"
                            placeholder="Enter quantity"
                            className="input input-bordered w-full max-w-xs"
                            value={quantity}
                            onChange={handleQuantity}
                        />
                    </div>
                </div>
            </div>

            <h1 className="mt-20 text-center text-3xl md:text-5xl font-bold">
                User Detail
            </h1>

            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="input input-bordered"
                        defaultValue={user.displayName}
                        readOnly
                        {...register("name")}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered"
                        defaultValue={user.email}
                        readOnly
                        {...register("email")}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="input input-bordered"
                        {...register("number", {
                            required: true,
                            pattern:
                                /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                        })}
                    />
                    {errors?.number?.type === "required" && (
                        <p className="text-xs text-error m-1.5">
                            *This field is required.*
                        </p>
                    )}
                    {errors?.number?.type === "pattern" && (
                        <p className="text-xs text-error m-1.5">
                            *Please give a valid phone number.*
                        </p>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        className="input input-bordered"
                        {...register("address", {
                            required: true,
                            pattern: /^[a-zA-Z0-9\s,.'-]{3,}$/,
                        })}
                    />
                    {errors?.address?.type === "required" && (
                        <p className="text-xs text-error m-1.5">
                            *This field is required.*
                        </p>
                    )}
                    {errors?.address?.type === "pattern" && (
                        <p className="text-xs text-error m-1.5">
                            *Please give a valid address.*
                        </p>
                    )}
                </div>

                <div className="form-control">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={bool}
                    >
                        Purchase
                    </button>
                </div>
            </form>

            <ToastContainer />
        </section>
    );
}

export default Purchase;
