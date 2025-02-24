const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db'); // Import User model
const { default: mongoose } = require('mongoose');

const router = express.Router();

// Get account balance
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        console.error("Balance Error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to, password } = req.body; // Get password from request

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Fetch user with password field explicitly selected
        const user = await User.findById(req.userId).select("+password");
        if (!user) {
            await session.abortTransaction();
            return res.status(400).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await session.abortTransaction();
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Fetch the sender's account
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Fetch recipient's account
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid recipient account" });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        console.error("Transfer Error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    } finally {
        session.endSession();
    }
});

module.exports = router;
