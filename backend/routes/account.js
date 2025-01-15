require('dotenv').config();
const express = require('express');
const router = express.Router();
const {Account} = require('../db'); 
const {authMiddleware} = require('../middleware/middleware');
const mongoose = require('mongoose');

// Get Account Balance
router.get('/balance', authMiddleware, async(req, res) => {
    try {
        // Find the account for the authenticated user
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({
            message: "Balance fetched successfully",
            balance: account.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});




// transaction with session 
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        // Start the session for the transaction
        session.startTransaction(); // Ensure the transaction is explicitly started

        const { amount, to } = req.body;

        // Find the sender's account
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            // Abort transaction if there's insufficient balance
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Find the recipient's account
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            // Abort transaction if recipient account doesn't exist
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        // Perform the transfer (debit from sender, credit to recipient)
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (err) {
        // Abort transaction if any error occurs
        console.error("Transaction failed:", err);
        await session.abortTransaction();
        res.status(500).json({ message: "Internal Server Error" });
    } finally {

        session.endSession();
    }
});



module.exports = router;
