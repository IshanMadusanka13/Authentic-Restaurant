import React from "react";
import "./MyOrders.css";

function MyOrders() {
  return (
    <div className="orders-root">

      {/* Main Content */}
      <main className="orders-main">
        <h2 className="orders-title">My Orders</h2>
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <tbody>
              <tr>
                <td className="order-img-cell">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
                    alt="Order"
                    className="order-img"
                  />
                </td>
                <td>
                  Chicken Biriyani X 1 , Cheese Cake X 2
                </td>
                <td className="order-price">2600.00</td>
                <td className="order-items">Items: 3</td>
                <td className="order-status">Food Processing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

    
      
    </div>
  );
}

export default MyOrders;
