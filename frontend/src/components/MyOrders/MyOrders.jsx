import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import { api } from "../../utils/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data and fetch orders
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserOrders(parsedUser.userId);
    }
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      const userOrders = await api.getOrdersByUserId(userId);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'food_processing':
        return '#ff9800';
      case 'out_for_delivery':
        return '#2196f3';
      case 'delivered':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'food_processing':
        return 'Food Processing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  if (loading) return <div className="loading">Loading your orders...</div>;

  return (
    <div className="orders-root">
      <main className="orders-main">
        <h2 className="orders-title">My Orders</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.orderId} className="order-card-customer">
                <div className="order-header">
                  <div className="order-id">Order #{order.orderId}</div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-row">
                      <div className="item-details">
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.name}</span>
                        <div className="item-badges">
                          {item.freeItem && <span className="bogo-badge-con">BOGO</span>}
                          {item.discount > 0 && <span className="discount-badge-con">{item.discount}% OFF</span>}
                        </div>
                      </div>
                      <div className="item-quantity">Qty: {item.quantity}</div>
                      <div className="item-price">Rs.{item.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>Rs.{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery:</span>
                    <span>Rs.{order.deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>Rs.{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-footer">
                  <div className="delivery-info">
                    <div className="delivery-address">
                      <strong>Delivery to:</strong> {order.customerInfo.address}
                    </div>
                    <div className="delivery-phone">
                      <strong>Phone:</strong> {order.customerInfo.phone}
                    </div>
                  </div>
                  <div 
                    className="order-status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {formatStatus(order.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyOrders;
