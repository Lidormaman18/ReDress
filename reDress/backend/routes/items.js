const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// בדיקת פעולה בסיסית של ה-API
router.get('/', (req, res) => {
    res.json({ message: "Items API is working!" });
});

// קבלת כל הפריטים
router.get('/all', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err.message); // לוג שגיאה
        res.status(500).json({ error: err.message });
    }
});

// הוספת פריט חדש
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        console.log('New item added:', savedItem); // לוג של הפריט שנשמר
        res.status(201).json(savedItem);
    } catch (err) {
        console.error('Error saving item:', err.message); // לוג שגיאה
        res.status(400).json({ error: err.message });
    }
});

// מחיקת פריט לפי ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            console.warn(`Item with ID ${req.params.id} not found.`); // לוג אם הפריט לא נמצא
            return res.status(404).json({ message: "Item not found" });
        }
        console.log('Item deleted:', deletedItem); // לוג של הפריט שנמחק
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error('Error deleting item:', err.message); // לוג שגיאה
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
