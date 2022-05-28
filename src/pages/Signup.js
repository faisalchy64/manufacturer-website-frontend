import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/img.png";
import auth from "../firebase";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useEffect } from "react";
import useToken from "../hooks/useToken";
import Loading from "../components/Loading";

function Signup() {
    const [createUserWithEmailAndPassword, user, loading, emailPasswordError] =
        useCreateUserWithEmailAndPassword(auth, {
            sendEmailVerification: true,
        });

    const [signInWithGoogle, guser] = useSignInWithGoogle(auth);

    const [updateProfile] = useUpdateProfile(auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name.toUpperCase() });

        reset();
    };

    const [token] = useToken(user || guser);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [navigate, token]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col bg-base-100">
            <h1 className="text-3xl sm:text-5xl font-bold text-center my-10">
                Signup
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
                    <form
                        className="card-body"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered"
                                {...register("name", {
                                    required: true,
                                    pattern: /^[a-zA-Z ]{2,30}$/,
                                })}
                            />
                            {errors?.name?.type === "required" && (
                                <p className="text-xs text-error m-1.5">
                                    *This field is required.*
                                </p>
                            )}
                            {errors?.name?.type === "pattern" && (
                                <p className="text-xs text-error m-1.5">
                                    *Please give a valid name.*
                                </p>
                            )}
                        </div>

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
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
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
                                    *Minimum six characters. (letter, at least
                                    one digit, at least one special character)*
                                </p>
                            )}

                            {emailPasswordError?.code && (
                                <p className="text-sm text-error text-center my-2.5">
                                    *{emailPasswordError.code}*
                                </p>
                            )}

                            <label className="label text-sm text-primary underline py-1">
                                <Link to="/login">
                                    Already Have An Account?
                                </Link>
                            </label>
                        </div>
                        <div className="form-control">
                            <input
                                type="submit"
                                value="Signup"
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
                </div>
            </div>
        </div>
    );
}

export default Signup;
