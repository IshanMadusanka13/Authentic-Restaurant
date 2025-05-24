const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    itemId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    discount: { type: Number, required: true },
    freeItem: { type: Boolean, required: true, default: false },
    availability: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);