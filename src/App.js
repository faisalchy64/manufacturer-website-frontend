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
import Payment from "./components/Payment";

function App() {
    return (
        <div className="relative">
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
                    <Route path="payment/:id" element={<Payment />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
