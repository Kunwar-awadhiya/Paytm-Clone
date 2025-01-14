require('dotenv').config();
const express = require('express');
const router = express.Router();
const { z } = require('zod'); 
const jwt = require('jsonwebtoken');
const {User , Account } = require('../db');  
const bcrypt = require('bcrypt');
const {authMiddleware} = require('../middleware/middleware');

// z validation schema 
const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must not exceed 30 characters")
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must not exceed 50 characters")
        .trim(),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name must not exceed 50 characters")
        .trim(),
});

const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username must not exceed 30 characters")
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
});


router.post('/signup', async (req, res) => {
    const body = req.body;
    const parsedResult = signupSchema.safeParse(body);
    if (!parsedResult.success) {
        return res.status(400).json({
            msg: "Invalid input fields",
            errors: parsedResult.error.errors, 
        });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
        return res.status(400).json({
            message: "Username already taken",
        });
    }

    // Create the user in the database
    const dbUser = await User.create(body);

    // Generate a random balance between 1 and 10000
    const randomBalance = Math.floor(Math.random() * 10000) + 1;

    // Create an account for the user with the random balance
    await Account.create({
        userId: dbUser._id,  // Link account to the user
        balance: randomBalance,  // Set the random balance
    });

    // Generate a JWT token
    const token = jwt.sign(
        { userId: dbUser._id },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    // Send the success response with the token
    res.status(201).json({
        message: "User created successfully",
        token: token, // Send the generated token
    });
});


// POST route for signing in
router.post('/signin', async (req, res) => {
    const body = req.body;

    const parsedResult = loginSchema.safeParse(body);
    if (!parsedResult.success) {
        return res.status(400).json({
            msg: "Invalid input fields",
            errors: parsedResult.error.errors,
        });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username: body.username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password",
            });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid username or password",
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id }, // Payload with user ID
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration
        );

        // Send success response with the JWT token
        res.status(200).json({
            message: "Login successful",
            token: token, // Return the token
        });
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//other routes
const updateSchema = z.object({
    password : z.string().optional(),
    firstName : z.string().optional(),
    lastName : z.string().optional(),
});


router.put('/', authMiddleware, async (req, res) => {
    // Validate the request body
    const parsed = updateSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsed.error.errors, 
        });
    }

    try {
        // Update the user in the database
        const updatedUser = await User.updateOne(
            { _id: req.userId }, // Filter: Find the user by their ID
            { $set: parsed.data } // Update: Only update valid fields
        );

        // Check if the update was successful
        if (updatedUser.matchedCount === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            message: "Updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while updating information",
            error: err.message,
        });
    }
});


// for search query filterable
router.get('/bulks', async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while retrieving users",
            error: err.message
        });
    }
});

module.exports = router;
