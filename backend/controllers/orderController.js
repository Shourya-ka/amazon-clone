const Cart = require("../models/Cart");
const Order = require("../models/Order");

const createOrder = async (req, res) => {

    try {

        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

        let totalPrice = 0;

        const products = cartItems.map((item) => {

            totalPrice += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity
            };
        });

        const order = await Order.create({

            user: req.user.id,

            products,

            totalPrice
        });

        await Cart.deleteMany({
            user: req.user.id
        });

        res.send(order);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.send(orders);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

module.exports = {
    createOrder,
    getMyOrders
};