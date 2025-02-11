const express = require('express');
const router = express.Router();
const User = require('../models/User'); // המודל של המשתמש
const bcrypt = require('bcrypt');

// Endpoint להתחברות
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // בדיקה אם המשתמש קיים
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // בדיקה אם הסיסמה תואמת
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // התחברות מוצלחת
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Endpoint להרשמה
router.post('/register', async (req, res) => {
    const { name, email, phone, city, address, password } = req.body;

    try {
        // בדיקה אם המשתמש כבר קיים לפי אימייל או טלפון
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone already exists' });
        }

        // הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // יצירת משתמש חדש
        const newUser = new User({
            name,
            email,
            phone,
            city,
            address,
            password: hashedPassword,
        });

        await newUser.save(); // שמירה במסד הנתונים
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
