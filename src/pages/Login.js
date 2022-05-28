import img from "../images/img.png";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase";
import {
    useSendPasswordResetEmail,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import useToken from "../hooks/useToken";

function Login() {
    const [bool, setBool] = useState(false);

    const [signInWithEmailAndPassword, user, loading, emailPasswordError] =
        useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, guser] = useSignInWithGoogle(auth);

    const [sendPasswordResetEmail, , passwordResetError] =
        useSendPasswordResetEmail(auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        if (bool) {
            await sendPasswordResetEmail(data.email);

            toast.success("Email Sent!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            await signInWithEmailAndPassword(data.email, data.password);
        }

        reset();
    };

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [token] = useToken(user || guser);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate, token]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col bg-base-100">
            <h1 className="text-3xl sm:text-5xl font-bold text-center my-10">
                {bool ? "Reset Password" : "Login"}
            </h1>
            <div className="hero-content">
                <div className="hidden md:block">
                    <img
                        className="md:h-[340px] lg:h-[450px]"
                        src={img}
                        alt=""
                    />
                </div>
                <div className="card flex-shrink-0 grow md:grow-0 md:w-[400px] lg:w-[450px] shadow-2xl bg-base-100">
                    {bool ? (
                        <form
                            className="card-body"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                    {...register("email", {
                                        required: true,
                                        pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    })}
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

                                {passwordResetError?.code && (
                                    <p className="text-sm text-error text-center my-2.5">
                                        *{passwordResetError.code}*
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label text-sm text-primary underline py-1">
                                    <span
                                        onClick={() => setBool(false)}
                                        className="cursor-pointer"
                                    >
                                        Back To Login Page
                                    </span>
                                </label>
                            </div>
                            <div className="form-control">
                                <input
                                    type="submit"
                                    value="Reset Password"
                                    className="btn btn-primary"
                                />
                            </div>
                        </form>
                    ) : (
                        <>
                            <form
                                className="card-body"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered"
                                        {...register("email", {
                                            required: true,
                                            pattern:
                                                /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        })}
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
                                        <span className="label-text">
                                            Password
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered"
                                        {...register("password", {
                                            required: true,
                                            pattern:
                                                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                        })}
                                    />
                                    {errors?.password?.type === "required" && (
                                        <p className="text-xs text-error m-1.5">
                                            *This field is required.*
                                        </p>
                                    )}
                                    {errors?.password?.type === "pattern" && (
                                        <p className="text-xs text-error m-1.5">
                                            *Minimum six characters. (letter, at
                                            least one digit, at least one
                                            special character)*
                                        </p>
                                    )}

                                    {emailPasswordError?.code && (
                                        <p className="text-sm text-error text-center my-2.5">
                                            *{emailPasswordError.code}*
                                        </p>
                                    )}

                                    <label className="label text-sm text-primary underline py-1">
                                        <span
                                            onClick={() => setBool(true)}
                                            className="cursor-pointer"
                                        >
                                            Forgotten Password?
                                        </span>
                                    </label>
                                    <label className="label text-sm text-primary underline py-1">
                                        <Link to="/signup">
                                            Create An Account
                                        </Link>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <input
                                        type="submit"
                                        value="Login"
                                        className="btn btn-primary"
                                    />
                                </div>

                                <div className="divider mb-0">OR</div>
                            </form>

                            <button
                                onClick={() => signInWithGoogle()}
                                className="btn btn-outline btn-primary mt-0 m-8"
                            >
                                Continue With Google
                            </button>
                        </>
                    )}
                </div>
            </div>

            {!passwordResetError && <ToastContainer />}
        </div>
    );
}

export default Login;
