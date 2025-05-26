const Order = require("../models/Order");
const logger = require("../utils/Logger");

const generateNextOrderId = async () => {
    try {
        logger.info("Generating next orderId");
        const lastOrder = await Order.findOne().sort({ orderId: -1 }).select("orderId");

        if (!lastOrder) {
            logger.info("No existing order found, starting with orderId 1");
            return 1;
        }

        const nextOrderId = lastOrder.orderId + 1;
        logger.info(`Generated next orderId: ${nextOrderId}`);
        return nextOrderId;
    } catch (error) {
        logger.error("Error generating next orderId");
        throw error;
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { userId, items, total, deliver_info } = req.body;
        const orderId = await generateNextOrderId();

        logger.info("Attempting to create new order");

        const order = new Order({
            orderId,
            userId,
            items,
            total,
            deliver_info
        });

        await order.save();
        logger.info("Order created successfully");
        res.status(201).json(order);
    } catch (error) {
        logger.error("Error creating order");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { items, total, deliver_info } = req.body;

        logger.info("Attempting to update order by orderId");

        const order = await Order.findOne({ orderId });
        if (!order) {
            logger.error("Order not found");
            return res.status(404).json({ msg: "Order not found" });
        }

        if (items !== undefined) order.items = items;
        if (total !== undefined) order.total = total;
        if (deliver_info !== undefined) order.deliver_info = deliver_info;

        await order.save();
        logger.info("Order updated successfully");
        res.status(200).json(order);
    } catch (error) {
        logger.error("Error updating order");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        logger.info("Attempting to delete order by orderId");

        const order = await Order.findOne({ orderId });
        if (!order) {
            logger.error("Order not found");
            return res.status(404).json({ msg: "Order not found" });
        }

        await Order.findOneAndDelete({ orderId });
        logger.info("Order deleted successfully");
        res.status(200).json({ msg: "Order deleted successfully" });
    } catch (error) {
        logger.error("Error deleting order");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        logger.info("Fetching order by orderId");

        const order = await Order.findOne({ orderId });
        if (!order) {
            logger.error("Order not found");
            return res.status(404).json({ msg: "Order not found" });
        }

        logger.info("Order fetched successfully");
        res.status(200).json(order);
    } catch (error) {
        logger.error("Error fetching order");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        logger.info("Fetching orders by userId");

        const orders = await Order.find({ userId }).lean();
        logger.info("Orders fetched successfully by userId");
        res.status(200).json(orders);
    } catch (error) {
        logger.error("Error fetching orders by userId");
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        logger.info("Fetching all orders");

        const orders = await Order.find().lean();
        logger.info("All orders fetched successfully");
        res.status(200).json(orders);
    } catch (error) {
        logger.error("Error fetching all orders");
        res.status(500).json({ msg: "Server error" });
    }
};