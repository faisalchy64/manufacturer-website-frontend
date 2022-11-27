import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import auth from "../firebase";

function MyProfile() {
    const [bool, setBool] = useState(false);
    const [user] = useAuthState(auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        (async () => {
            const res = await axios.put(
                `https://manufacturer-website-backend.onrender.com/userinfo/${user?.email}`,
                data
            );

            if (res.data.acknowledged) {
                toast.success(
                    bool
                        ? "Information Updated Successfully!"
                        : "Information Added Successfully!",
                    {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );
            }
        })();

        reset();
    };

    return (
        <section className="pb-10">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-center">
                My Profile
            </h1>
            <div className="px-5">
                <div className="">
                    <div className="mb-5">
                        <h1 className="text-2xl font-bold mb-2.5">
                            Name: {user.displayName}
                        </h1>
                        <h1 className="text-2xl font-bold mb-2.5">
                            Email: {user.email}
                        </h1>
                    </div>

                    <h1 className="text-4xl font-bold text-center my-5">
                        {bool ? "Update Information" : "Add Information"}
                    </h1>

                    <form
                        className="card-body w-full md:w-3/4 mx-auto shadow-xl rounded-3xl"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter education details"
                                className="input input-bordered"
                                {...register("education", {
                                    required: true,
                                })}
                            />
                            {errors?.education?.type === "required" && (
                                <p className="text-xs text-error m-1.5">
                                    *This field is required.*
                                </p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your location address"
                                className="input input-bordered"
                                {...register("location", {
                                    required: true,
                                })}
                            />
                            {errors?.location?.type === "required" && (
                                <p className="text-xs text-error m-1.5">
                                    *This field is required.*
                                </p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter phone number"
                                className="input input-bordered"
                                {...register("number", { required: true })}
                            />
                            {errors?.number?.type === "required" && (
                                <p className="text-xs text-error m-1.5">
                                    *This field is required.*
                                </p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Linkedin Profile
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your linkedin profile url"
                                className="input input-bordered"
                                {...register("linkedin", {
                                    required: true,
                                })}
                            />
                            {errors?.linkedin?.type === "required" && (
                                <p className="text-xs text-error m-1.5">
                                    *This field is required.*
                                </p>
                            )}
                        </div>

                        <p
                            onClick={() => setBool(!bool)}
                            className="my-2.5 text-sm text-center text-primary underline cursor-pointer"
                        >
                            {bool
                                ? "Want To Add Information?"
                                : "Want To Update Information?"}
                        </p>

                        <div className="form-control">
                            <button type="submit" className="btn btn-primary">
                                {bool
                                    ? "Update Information"
                                    : "Add Information"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </section>
    );
}

export default MyProfile;
