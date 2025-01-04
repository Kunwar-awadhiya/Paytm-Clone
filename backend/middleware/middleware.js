/*
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }
    const taken = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(Token,JWT_SECRET );
        req.userId = decoded.userId;
        next();      
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}
*/




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