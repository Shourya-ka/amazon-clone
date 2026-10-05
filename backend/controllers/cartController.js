const Cart = require("../models/Cart");

const addToCart = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        let cartItem = await Cart.findOne({
            user: req.user.id,
            product: productId
        });

        if (cartItem) {

            cartItem.quantity += quantity;

            await cartItem.save();

            return res.send(cartItem);
        }

        cartItem = await Cart.create({
            user: req.user.id,
            product: productId,
            quantity
        });

        res.send(cartItem);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

const getCart = async (req, res) => {

    try {

        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

        res.send(cartItems);

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

const removeFromCart = async (req, res) => {

    try {

        const cartItem = await Cart.findByIdAndDelete(req.params.id);

        if (!cartItem) {
            return res.send("Cart item not found");
        }

        res.send("Item removed from cart");

    } catch (error) {

        console.log(error);

        res.send("Something went wrong");
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};