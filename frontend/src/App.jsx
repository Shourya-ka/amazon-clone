import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/ProductDetails";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/cart"
                element={
                    <ProtectedRoute>

                        <Cart />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>

                        <Orders />

                    </ProtectedRoute>
                }
            />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route
                path="/product/:id"
                element={<ProductDetails />}
            />

        </Routes>

    );
}

export default App;