const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/AuthMiddleware");

orderRouter.post("/", auth, orderController.createOrder);
orderRouter.put("/:orderId", auth, orderController.updateOrderById);
orderRouter.delete("/:orderId", auth, orderController.deleteOrderById);
orderRouter.get("/:orderId", auth, orderController.getOrderById);
orderRouter.get("/user/:userId", auth, orderController.getOrdersByUserId);
orderRouter.get("/", auth, orderController.getAllOrders);

module.exports = orderRouter;
