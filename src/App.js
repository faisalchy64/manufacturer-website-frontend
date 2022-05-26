import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { useState } from "react";
import Purchase from "./pages/Purchase";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/MyOrders";
import AddReview from "./pages/AddReview";
import MyProfile from "./pages/MyProfile";

function App() {
    const [load, setLoad] = useState(true);

    setTimeout(() => setLoad(false), 2000);

    return (
        <>
            {load ? (
                <Loading />
            ) : (
                <>
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/purchase/:id"
                            element={
                                <PrivateRoute>
                                    <Purchase />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        >
                            <Route path="myorders" element={<MyOrders />} />
                            <Route path="addreview" element={<AddReview />} />
                            <Route path="myprofile" element={<MyProfile />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
