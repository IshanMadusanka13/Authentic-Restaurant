const express = require("express");
const orderRouter = require("./src/routes/OrderRoutes");
const userRouter = require("./src/routes/UserRoutes");
const menuItemRouter = require("./src/routes/MenuItemRoutes");

const app = express();


app.use(express.json());


app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/item", menuItemRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

module.exports = app;