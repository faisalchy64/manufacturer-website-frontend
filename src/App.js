import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import Purchase from "./pages/Purchase";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/MyOrders";
import AddReview from "./pages/AddReview";
import MyProfile from "./pages/MyProfile";
import Payment from "./components/Payment";
import ManageAllOrders from "./pages/ManageAllOrders";
import MakeAdmin from "./pages/MakeAdmin";
import AdminRoute from "./components/AdminRoute";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import MyPortfolio from "./pages/MyPortfolio";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";

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
                    <Route path="payment/:id" element={<Payment />} />
                    <Route path="myprofile" element={<MyProfile />} />

                    {/* admin routes */}

                    <Route
                        path="manageallorders"
                        element={
                            <AdminRoute>
                                <ManageAllOrders />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="addproduct"
                        element={
                            <AdminRoute>
                                <AddProduct />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="manageproducts"
                        element={
                            <AdminRoute>
                                <ManageProducts />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="makeadmin"
                        element={
                            <AdminRoute>
                                <MakeAdmin />
                            </AdminRoute>
                        }
                    />
                </Route>

                <Route path="/myportfolio" element={<MyPortfolio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
