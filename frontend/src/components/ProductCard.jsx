import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

    const addToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        try {

            await axios.post(
                "http://localhost:3000/cart",
                {
                    productId: product._id,
                    quantity: 1
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            toast.success("Product added to cart");

        } catch (error) {

            console.log(error);

            toast.error("Failed to add product");
        }
    };

    return (

        <div className="product-card">

            <Link
                to={`/product/${product._id}`}
                className="product-image-link"
            >

                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                />

            </Link>

            <div className="product-info">

                <Link
                    to={`/product/${product._id}`}
                    className="product-title"
                >

                    <h2>{product.title}</h2>

                </Link>

                <div className="product-rating">

                    <span>⭐</span>

                    <span>{product.rating || "4.5"}</span>

                </div>

                <p className="product-description">
                    {product.description.slice(0, 70)}...
                </p>

                <div className="price-section">

                    <span className="current-price">
                        ₹{Math.round(product.price * 85)}
                    </span>

                    <span className="old-price">
                        ₹{Math.round(product.price * 105)}
                    </span>

                    <span className="discount">
                        20% off
                    </span>

                </div>

                <p className="delivery-text">
                    🚚 Free delivery
                </p>

                <button
                    className="add-cart-button"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>

            </div>

        </div>
    );
}

export default ProductCard;