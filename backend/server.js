// require("dotenv").config();

// const express = require("express");

// const mongoose = require("mongoose");

// const app = express();

// const userRoutes = require("./routes/userRoutes");

// app.use(express.json());

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB connected");
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// app.use(userRoutes);

// app.get("/", (req, res) => {
    
//     res.send("Hello this Shourya");
// });

// // app.get("/about", (req, res) => {
    
// //     res.send("This is amazon backend.");
// // });

// // app.get("/products/:id", (req, res) => {
// //     res.send(req.params.id);
// // });

// // app.get("/search", (req, res) => {
// //     res.send(req.query);
// // });

// // app.post("/register", (req, res) => {
// //     const name = req.body.name;
// //     const email = req.body.email;

// //     if(!name){
// //         return res.send("Name is required.");
// //     }

// //     res.send(`Welcone ${name}, your email is ${email}`);
// // })

// app.listen(3000, () => {
//     console.log("Server is running...");
// });

// // setInterval(() => {
// //     console.log("Still alive...");
// // }, 3000);


require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const protect = require("./middlewares/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(cors());

app.use(express.json());

app.use("/products", productRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);



console.log(process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(userRoutes);

app.get("/profile", protect, (req, res) => {

    res.send({
        message: "Welcome to profile",
        user: req.user
    });

});

app.get("/", (req, res) => {
    res.send("Hello this Shourya");
});

app.listen(3000, () => {
    console.log("Server is running...");
});