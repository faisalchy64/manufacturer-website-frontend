import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../firebase";

function GoogleAuth() {
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    return (
        <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-primary mt-0 m-8"
        >
            Continue With Google
        </button>
    );
}

export default GoogleAuth;
