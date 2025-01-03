/*
const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');


const signupSchema = zod.ZodObject({
     username : z
           .string()
           .min(3, "Username must be at least 3 characters")
           .max(30 , "username must not exceed 30 characters")
           .trim()
           .toLowerCase(),
        password : z
           .string()
           .min(6, "password must be at least 6 characters long"),
        firstName : z
           .string()
           .min(1 , "first name is required")
           .max(50 , "first name must not exceed 50 characters")
           .trim(),
        lastName : z
           .string()
           .min(1, "last name is required ")
           .max(50  , "last name must be not exceed 50 characters ")
           .trim()
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

router.post('/signup' , (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            msg : "Email already taken /  incorrect inputs "
        })
    }

    const user = User.findOne({
        username : body.username
    })

    if (user._id) {
        return res.json({
            message : "Email already taken/ Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);

    
    const token = jwt.sign({
        userId: dbUser._id
    } , JWT_SECRET)
    res.json({
        message : "user created successfully",
        token :
    })
});

module.exports = router;
*/



const express = require('express');
const router = express.Router();
const { z } = require('zod'); // Correct import for zod
const jwt = require('jsonwebtoken');
const User = require('../db'); // Assuming you've exported the User model from db.js

// Zod validation schema for signup
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

// Zod validation schema for login
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

    // Validate using Zod
    const parsedResult = signupSchema.safeParse(body);

    if (!parsedResult.success) {
        // If validation fails, return the errors
        return res.status(400).json({
            msg: "Invalid input fields",
            errors: parsedResult.error.errors, // Return detailed validation errors
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

    // Generate a JWT token
    const token = jwt.sign(
        { userId: dbUser._id },
        process.env.JWT_SECRET, // Use the JWT secret from environment
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the success response with the token
    res.status(201).json({
        message: "User created successfully",
        token: token, // Send the generated token
    });
});

module.exports = router;
