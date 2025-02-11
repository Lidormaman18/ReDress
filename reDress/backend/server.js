require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// התחברות למסד נתונים (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("💾 Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// בדיקת חיבור ראשוני
app.get('/', (req, res) => {
    res.send("ReDress API is running...");
});

// חיבור הנתיבים
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

