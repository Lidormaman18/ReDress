const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    user: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String },
    size: { type: String },
    color: { type: String },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    isRental: { type: Boolean, default: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
