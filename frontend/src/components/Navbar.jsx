import { Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";

import { FaUser } from "react-icons/fa";

import { useState, useEffect } from "react";
import axios from "axios";

function Navbar({ search, setSearch }) {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {

        const fetchCartCount = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            try {

                const response = await axios.get(
                    "http://localhost:3000/cart",
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                let count = 0;

                response.data.forEach((item) => {
                    count += item.quantity;
                });

                setCartCount(count);

            } catch (error) {

                console.log(error);
            }
        };

        fetchCartCount();

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";
    };

    return (

        <nav className="navbar">

            <h2 className="logo">Amazon</h2>

            <input
                type="text"
                placeholder="Search products..."
                className="search-bar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="nav-buttons">

                {
                    localStorage.getItem("token") ? (

                        <button onClick={handleLogout}>

                            Logout

                        </button>

                    ) : (

                        <button>

                            <Link to="/login">

                                <FaUser />

                                Login

                            </Link>

                        </button>

                    )
                }

                {
                    !localStorage.getItem("token") && (

                        <button>

                            <Link to="/signup">

                                Signup

                            </Link>

                        </button>

                    )
                }

                <button>

                    <Link to="/cart">

                        <FaShoppingCart />

                        Cart ({cartCount})

                    </Link>

                </button>

                <button>

                    <Link to="/orders">

                        Orders

                    </Link>

                </button>

            </div>

        </nav>
    );
}

export default Navbar;