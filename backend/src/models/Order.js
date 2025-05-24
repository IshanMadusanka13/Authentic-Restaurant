const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    items: [
        {
            itemId: { type: Number, required: true },
            qty: { type: Number, required: true },
        }
    ],
    total: { type: Number, required: true },
    deliver_info: { type: String, required: false },
});

module.exports = mongoose.model('Order', OrderSchema);
