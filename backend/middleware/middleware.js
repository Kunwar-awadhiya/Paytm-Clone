require('dotenv').config();
const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Authorization token missing or invalid",
        });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Attach userId to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = {
    authMiddleware
};
