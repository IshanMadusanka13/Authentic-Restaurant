const express = require("express");
const orderRouter = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getOrdersByUserId,
    createPaymentLink
} = require("../controllers/OrderController");
const auth = require("../middleware/AuthMiddleware");

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/user/:userId", getOrdersByUserId)
orderRouter.get("/:orderId", getOrderById);
orderRouter.put("/:orderId/:status", updateOrderStatus);
orderRouter.post("/payment", createPaymentLink);

module.exports = orderRouter;
