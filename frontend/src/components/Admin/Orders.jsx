function Orders({ orderTab, setOrderTab }) {
  return (
    <div>
      <div className="order-tabs">
        <button
          className={orderTab === "pending" ? "order-tab active" : "order-tab"}
          onClick={() => setOrderTab("pending")}
        >
          Order Page
        </button>
        <button
          className={orderTab === "completed" ? "order-tab active" : "order-tab"}
          onClick={() => setOrderTab("completed")}
        >
          Completed Orders
        </button>
      </div>
      {orderTab === "pending" ? <OrderPending /> : <OrderCompleted />}
    </div>
  );
}

function OrderPending() {
  return (
    <div className="order-card">
      <div className="order-main">
        <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Chicken Biriyani" className="order-img" />
        <div>
          <div>Chicken Biriyani X 1</div>
          <div>Items: 1</div>
          <div>1150.00</div>
        </div>
      </div>
      <div className="order-details">
        <div>Ann Bandara</div>
        <div>No.13, Hill Street, Dehiwala.</div>
        <div>077 988 1563</div>
      </div>
      <select className="order-status">
        <option>Food Processing</option>
        <option selected>Out for delivery</option>
        <option>Delivered</option>
      </select>
    </div>
  );
}

function OrderCompleted() {
  return (
    <div className="order-card">
      <div className="order-main">
        <img src="https://i.imgur.com/8Km9tLL.jpg" alt="Chicken Biriyani" className="order-img" />
        <img src="https://i.imgur.com/3VQb6.jpg" alt="Cheese Cake" className="order-img" />
        <div>
          <div>Chicken Biriyani X 1 , Cheese Cake X 2</div>
          <div>Items: 3</div>
          <div>2600.00</div>
          <div>Completed</div>
        </div>
      </div>
      <div className="order-details">
        <div>Reezma Cader</div>
        <div>No.13, Mount Lavinia, Ratmalana.</div>
        <div>075 456 2352</div>
      </div>
    </div>
  );
}

// Export Orders as default and others as named exports
export default Orders;
export { OrderPending, OrderCompleted };
