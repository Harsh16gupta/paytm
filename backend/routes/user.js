const express = require('express');
const bcrypt = require('bcrypt');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');


const router = express.Router();

// Define Zod schemas
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

// Signup Route
router.post('/signup', async (req, res) => {
    const parseResult = signupBody.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: 'Invalid input. Please provide valid data.',
        });
    }

    const { username, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(409).json({
            message: 'Email already taken',
        });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
    });

    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000, // Random balance initialization
    });

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        message: 'User created successfully',
        token,
    });
});

// Signin Route
router.post('/signin', async (req, res) => {
    const parseResult = signinBody.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: 'Invalid input. Please provide valid credentials.',
        });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password',
        });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({
            message: 'Invalid email or password',
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        token,
    });
});

// Update Route
router.put('/', authMiddleware, async (req, res) => {
    const parseResult = updateBody.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: 'Invalid input. Please provide valid data for update.',
        });
    }

    const { password, ...updateData } = req.body;

    if (password) {
        updateData.password = await bcrypt.hash(password, 10); // Hash the new password if provided
    }

    await User.updateOne({ _id: req.userId }, updateData);

    res.status(200).json({
        message: 'Updated successfully',
    });
});
// Get current user details
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get detailed user info
router.get('/details', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const account = await Account.findOne({ userId: req.userId }) || { balance: 0 }; // ✅ Default balance to 0
        
        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            balance: account.balance,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// List all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Bulk User Retrieval Route
router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';

    const users = await User.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } }, // Case-insensitive search
            { lastName: { $regex: filter, $options: 'i' } },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});

module.exports = router;
