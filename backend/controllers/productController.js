const Product = require("../models/Product");

const createProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.send(product);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.send(products);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {

            return res.send(
                "Product not found"
            );
        }

        res.send(product);

    } catch (error) {

        console.log(error);

        res.send(
            "Something went wrong"
        );
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById
};