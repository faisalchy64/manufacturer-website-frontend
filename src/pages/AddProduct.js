import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

function AddProduct() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        data.minimum = parseInt(data.minimum);
        data.available = parseInt(data.available);

        const res = await axios.post(
            "https://stormy-sands-44537.herokuapp.com/item",
            data
        );

        if (res.data.acknowledged) {
            toast.success("Product Added Successfully!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <section>
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Add A Product
                <form
                    className="card-body w-full md:w-3/4 mx-auto shadow-xl rounded-3xl"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered"
                            {...register("name", { required: true })}
                        />
                        {errors?.name?.type === "required" && (
                            <p className="text-xs text-error m-1.5">
                                *This field is required.*
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter image url"
                            className="input input-bordered"
                            {...register("img", { required: true })}
                        />
                        {errors?.img?.type === "required" && (
                            <p className="text-xs text-error m-1.5">
                                *This field is required.*
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Minimum Quantity</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter minimum quantity"
                            className="input input-bordered"
                            {...register("minimum", { required: true })}
                        />
                        {errors?.minimum?.type === "required" && (
                            <p className="text-xs text-error m-1.5">
                                *This field is required.*
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Available Quantity
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter minimum quantity"
                            className="input input-bordered"
                            {...register("available", { required: true })}
                        />
                        {errors?.available?.type === "required" && (
                            <p className="text-xs text-error m-1.5">
                                *This field is required.*
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Enter product description here..."
                            className="input input-bordered h-[100px] py-1.5"
                            {...register("description", { required: true })}
                        ></textarea>
                        {errors?.minimum?.type === "required" && (
                            <p className="text-xs text-error m-1.5">
                                *This field is required.*
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <button type="submit" className="btn btn-primary">
                            Add Product
                        </button>
                    </div>
                </form>
            </h1>
            <ToastContainer />
        </section>
    );
}

export default AddProduct;
