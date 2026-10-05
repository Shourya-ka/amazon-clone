const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.send("No token found");
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.send("Invalid token");
    }
};

module.exports = protect;