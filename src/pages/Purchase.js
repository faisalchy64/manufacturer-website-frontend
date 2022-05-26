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
    const { id } = useParams();
    const [user] = useAuthState(auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    // get specific data from database

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:5000/item/${id}`);
            setItem(res.data);
            setQunatity(res.data.minimum);
        })();
    }, [id]);

    const { name, img, description, minimum, available, price } = item;

    const handleQuantity = (e) => {
        if (available >= parseInt(e.target.value) && minimum < e.target.value) {
            setQunatity(e.target.value);
        } else if (available < e.target.value) {
            toast.error("Unavailable Quantity.", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (minimum > e.target.value) {
            toast.error(`Minimum ${minimum} Pieces Needed.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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

                    <div className="mt-5 card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>

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
                    {errors?.email?.type === "required" && (
                        <p className="text-xs text-error m-1.5">
                            *This field is required.*
                        </p>
                    )}
                    {errors?.email?.type === "pattern" && (
                        <p className="text-xs text-error m-1.5">
                            *Please give a valid email address.*
                        </p>
                    )}
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
                    <input
                        type="submit"
                        value="Buy Now"
                        className="btn btn-primary"
                    />
                </div>
            </form>

            <ToastContainer />
        </section>
    );
}

export default Purchase;
