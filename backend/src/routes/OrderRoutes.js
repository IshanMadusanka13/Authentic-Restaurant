const express = require("express");
const orderRouter = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/OrderController");
const auth = require("../middleware/AuthMiddleware");

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getOrders);
orderRouter.get("/:orderId", auth, getOrderById);
orderRouter.put("/:orderId/status", auth, updateOrderStatus);

module.exports = orderRouter;
