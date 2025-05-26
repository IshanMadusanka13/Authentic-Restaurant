const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const logger = require("../utils/Logger");

const generateNextOrderId = async () => {
    try {
        const lastOrder = await Order.findOne().sort({ orderId: -1 }).select('orderId');
        if (!lastOrder) {
            return 1;
        }
        return lastOrder.orderId + 1;
    } catch (error) {
        logger.error("Error generating next orderId", { error: error.message });
        throw error;
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { userId, items, customerInfo } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ msg: "Order must contain at least one item" });
        }

        const orderId = await generateNextOrderId();
        let subtotal = 0;
        const orderItems = [];

        // Process each item
        for (const cartItem of items) {
            const menuItem = await MenuItem.findOne({ itemId: cartItem.itemId });
            if (!menuItem || !menuItem.availability) {
                return res.status(400).json({ msg: `Item ${cartItem.itemId} is not available` });
            }

            let itemPrice = menuItem.price;
            
            // Apply discount
            if (menuItem.discount > 0) {
                itemPrice = itemPrice * (1 - menuItem.discount / 100);
            }

            let itemTotal;
            // Handle BOGO
            if (menuItem.freeItem) {
                const payableQuantity = Math.ceil(cartItem.quantity / 2);
                itemTotal = itemPrice * payableQuantity;
            } else {
                itemTotal = itemPrice * cartItem.quantity;
            }

            orderItems.push({
                itemId: menuItem.itemId,
                name: menuItem.name,
                price: itemPrice,
                quantity: cartItem.quantity,
                discount: menuItem.discount,
                freeItem: menuItem.freeItem,
                total: itemTotal
            });

            subtotal += itemTotal;
        }

        const deliveryCharge = subtotal * 0.1; // 10% delivery charge
        const total = subtotal + deliveryCharge;

        const order = new Order({
            orderId,
            userId,
            items: orderItems,
            customerInfo,
            subtotal,
            deliveryCharge,
            total
        });

        await order.save();
        logger.info("Order created successfully");
        res.status(201).json(order);
    } catch (error) {
        logger.error("Error creating order", { error: error.message });
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        logger.error("Error fetching orders");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });
        
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        logger.error("Error fetching order");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        order.status = status;
        await order.save();

        logger.info("Order status updated successfully");
        res.status(200).json(order);
    } catch (error) {
        logger.error("Error updating order status");
        res.status(500).json({ msg: "Server error" });
    }
};
