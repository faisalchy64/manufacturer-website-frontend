import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import auth from "../firebase";

function AddReview() {
    const [user] = useAuthState(auth);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        data.rating = parseInt(data.rating);

        (async () => {
            const res = await axios.post(
                "https://manufacturer-website-backend.onrender.com/review",
                data
            );

            if (res.data.acknowledged) {
                toast.success("Review Added Successfully!", {
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

        reset();
    };

    return (
        <section>
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                Add A Review
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
                            <span className="label-text">
                                Give A Rating Out Of 5
                            </span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            defaultValue="0"
                            className="input input-bordered"
                            {...register("rating")}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Enter comments here..."
                            className="input input-bordered h-[100px] py-1.5"
                            {...register("discription")}
                        ></textarea>
                    </div>

                    <div className="form-control">
                        <button type="submit" className="btn btn-primary">
                            Add Review
                        </button>
                    </div>
                </form>
            </h1>
            <ToastContainer />
        </section>
    );
}

export default AddReview;
