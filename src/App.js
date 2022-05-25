import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import auth from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/Loading";
import { useState } from "react";

function App() {
    const [time, setTime] = useState(true);

    setTimeout(() => setTime(false), 1500);

    return (
        <>
            {time ? (
                <Loading />
            ) : (
                <>
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
