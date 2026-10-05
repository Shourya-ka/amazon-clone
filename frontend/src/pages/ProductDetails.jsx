import Navbar from "../components/Navbar";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await axios.get(

                    `http://localhost:3000/products/${id}`

                );

                setProduct(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchProduct();

    }, [id]);

    if (!product) {

        return <h1>Loading...</h1>;
    }

    return (

        <div>

            <Navbar />

            <div className="product-details">

                <img
                    src={product.image}
                    alt={product.title}
                />

                <div>

                    <h1>{product.title}</h1>

                    <p>{product.description}</p>

                    <h2>₹{product.price}</h2>

                    <h3>
                        Category:
                        {product.category}
                    </h3>

                    <h3>
                        Stock:
                        {product.stock}
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;