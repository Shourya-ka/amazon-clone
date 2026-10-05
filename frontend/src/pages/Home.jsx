import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:3000/products"
                );

                setProducts(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchProducts();

    }, []);

    const filteredProducts = products.filter((product) => {

        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (

        <div>

            <Navbar
                search={search}
                setSearch={setSearch}
            />

            <h1>Products</h1>

            <div className="categories">

                <button onClick={() => setCategory("All")}>
                    All
                </button>

                <button onClick={() => setCategory("smartphones")}>
                    Smartphones
                </button>

                <button onClick={() => setCategory("laptops")}>
                    Laptops
                </button>

                <button onClick={() => setCategory("fragrances")}>
                    Fragrances
                </button>

                <button onClick={() => setCategory("beauty")}>
                    Beauty
                </button>

                <button onClick={() => setCategory("groceries")}>
                    Groceries
                </button>

            </div>

            <div className="products-container">

                {filteredProducts.map((product) => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>

        </div>
    );
}

export default Home;