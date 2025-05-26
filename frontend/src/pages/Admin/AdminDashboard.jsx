import React, { useState } from "react";
import "./AdminDashboard.css";
import AddItem from "../../components/Admin/AddItem";
import Dashboard from "../../components/Admin/Dashboard";
import FoodList from "../../components/Admin/FoodList";
import Orders from "../../components/Admin/Orders";
//import logo from "./logo.png"; // Place your logo in src/logo.png

const menu = [
  { key: "add", label: "Add items", icon: "＋" },
  { key: "list", label: "List items", icon: "≡" },
  { key: "orders", label: "Orders", icon: "≡" },
  { key: "discount", label: "Add Discount", icon: "≡" },
];

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [orderTab, setOrderTab] = useState("pending");

  return (
    <div className="admin-root">

      {/* Main layout */}
      <div className="admin-body">
        {/* Sidebar */}
        <nav className="admin-sidebar">
          {menu.map((item) => (
            <button
              key={item.key}
              className={
                "sidebar-btn" +
                (page === item.key ||
                  (item.key === "add" && page === "dashboard")
                  ? " sidebar-btn-active"
                  : "")
              }
              onClick={() => setPage(item.key)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="admin-content">
          {page === "dashboard" && <Dashboard />}

          {page === "add" && <AddItem />}

          {page === "list" && <FoodList onEdit={() => setPage("list")} />}

          {page === "orders" && (
            <Orders orderTab={orderTab} setOrderTab={setOrderTab} />
          )}

          {page === "discount" && (
            <div className="placeholder">Add Discount Page</div>
          )}

          {page === "discount" && (
            <div className="placeholder">Add Discount Page</div>
          )}
        </main>
      </div>

    </div>
  );
}

export default AdminDashboard;