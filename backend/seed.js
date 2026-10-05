require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");

const Product = require("./models/Product");

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {

        const response = await axios.get(
            "https://dummyjson.com/products?limit=100"
        );

        const products = response.data.products.map(
            (item) => ({

                title: item.title,

                description: item.description,

                price: item.price,

                image: item.thumbnail,

                category: item.category,

                stock: item.stock
            })
        );

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("100 products inserted successfully");

        process.exit();

    })
    .catch((error) => {

        console.log(error);

        process.exit(1);
    });