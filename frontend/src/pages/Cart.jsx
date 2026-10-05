import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";
function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        const fetchCart = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(

                    "http://localhost:3000/cart",

                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                setCartItems(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchCart();

    }, []);

    const removeItem = async (cartId) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:3000/cart/${cartId}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setCartItems(
                cartItems.filter(
                    (item) => item._id !== cartId
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    const placeOrder = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                "http://localhost:3000/orders",

                {},

                {
                    headers: {
                        authorization: token
                    }
                }
            );

            alert("Order placed successfully");

            setCartItems([]);

        } catch (error) {

            console.log(error);
        }
    };

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total +
            (item.product?.price || 0) *
            item.quantity,
        0
    );

    return (

        <div>

            <Navbar />

            <h1>My Cart</h1>

            {
                cartItems
                    .filter((item) => item.product)
                    .map((item) => (



                        <div key={item._id}>

                            <h2>{item.product.title}</h2>

                            <h2>Total: ₹{totalPrice}</h2>

                            <button onClick={placeOrder}>
                                Place Order
                            </button>
                            <p>₹{item.product.price}</p>

                            <p>Quantity: {item.quantity}</p>

                            <button onClick={() => removeItem(item._id)}>
                                Remove
                            </button>

                        </div>

                    ))
            }

        </div>
    );
}

export default Cart;