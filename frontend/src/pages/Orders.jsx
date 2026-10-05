import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(

                    "http://localhost:3000/orders",

                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                setOrders(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchOrders();

    }, []);

    return (

        <div>

            <Navbar />

            <h1>My Orders</h1>

            {

                orders.map((order) => (

                    <div
                        key={order._id}
                        className="order-card"
                    >

                        <h3>
                            Order ID:
                            {order._id}
                        </h3>

                        <h4>
                            Total:
                            ₹{order.totalPrice}
                        </h4>

                        {

                            order.products.map((item) => (

                                <div key={item._id}>

                                    <p>
                                        {item.product.title}
                                    </p>

                                    <p>
                                        Quantity:
                                        {item.quantity}
                                    </p>

                                </div>

                            ))

                        }

                    </div>

                ))

            }

        </div>

    );
}

export default Orders;