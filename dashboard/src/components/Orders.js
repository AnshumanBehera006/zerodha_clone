import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editQty, setEditQty] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [actionError, setActionError] = useState("");

  const { refreshTrigger, triggerRefresh } = useContext(GeneralContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger]);

  const handleStartEdit = (order) => {
    setEditingOrderId(order._id);
    setEditQty(order.qty);
    setEditPrice(order.price);
    setActionError("");
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setActionError("");
  };

  const handleSaveEdit = async (orderId) => {
    try {
      setActionError("");
      const q = Number(editQty);
      const p = Number(editPrice);
      if (q <= 0 || p <= 0) {
        setActionError("Quantity and price must be greater than 0");
        return;
      }

      await axios.put(`/orders/${orderId}`, {
        qty: q,
        price: p,
      });

      setEditingOrderId(null);
      if (triggerRefresh) triggerRefresh();
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      setActionError(err.response?.data?.message || "Failed to update order");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      setActionError("");
      await axios.delete(`/orders/${orderId}`);
      if (triggerRefresh) triggerRefresh();
      fetchOrders();
    } catch (err) {
      console.error("Error cancelling order:", err);
      setActionError(err.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="orders" style={{ padding: "20px 30px" }}>
      <h3 className="title">Orders ({orders.length})</h3>

      {actionError && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "8px 12px",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "0.85rem",
          }}
        >
          {actionError}
        </div>
      )}

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isEditing = editingOrderId === order._id;
                const isSell = order.mode === "SELL";
                const isOpen = order.status === "OPEN";

                const modeBadgeStyle = {
                  padding: "3px 8px",
                  borderRadius: "3px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: isSell ? "#df514c" : "#4184f3",
                };

                const statusBadgeStyle = {
                  padding: "3px 8px",
                  borderRadius: "3px",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  backgroundColor:
                    order.status === "EXECUTED"
                      ? "#e8f5e9"
                      : order.status === "OPEN"
                      ? "#fff3e0"
                      : "#ffebee",
                  color:
                    order.status === "EXECUTED"
                      ? "#2e7d32"
                      : order.status === "OPEN"
                      ? "#e65100"
                      : "#c62828",
                };

                return (
                  <tr key={order._id}>
                    <td style={{ fontSize: "0.8rem", color: "#666" }}>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        : "-"}
                    </td>
                    <td>
                      <strong>{order.name}</strong>
                    </td>
                    <td>
                      <span style={modeBadgeStyle}>{order.mode}</span>
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editQty}
                          min="1"
                          style={{ width: "70px", padding: "4px" }}
                          onChange={(e) => setEditQty(e.target.value)}
                        />
                      ) : (
                        order.qty
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.05"
                          value={editPrice}
                          style={{ width: "80px", padding: "4px" }}
                          onChange={(e) => setEditPrice(e.target.value)}
                        />
                      ) : (
                        `₹${(order.price || 0).toFixed(2)}`
                      )}
                    </td>
                    <td>
                      <span style={statusBadgeStyle}>{order.status}</span>
                    </td>
                    <td>
                      {isOpen && (
                        <div style={{ display: "flex", gap: "6px" }}>
                          {isEditing ? (
                            <>
                              <button
                                className="btn btn-blue"
                                style={{
                                  backgroundColor: "#4184f3",
                                  color: "#fff",
                                  border: "none",
                                  padding: "3px 8px",
                                  fontSize: "0.75rem",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleSaveEdit(order._id)}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-grey"
                                style={{
                                  backgroundColor: "#ccc",
                                  color: "#333",
                                  border: "none",
                                  padding: "3px 8px",
                                  fontSize: "0.75rem",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                }}
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                style={{
                                  backgroundColor: "#f5f5f5",
                                  border: "1px solid #ccc",
                                  padding: "3px 8px",
                                  fontSize: "0.75rem",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleStartEdit(order)}
                              >
                                Edit
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#ffebee",
                                  color: "#c62828",
                                  border: "1px solid #ffcdd2",
                                  padding: "3px 8px",
                                  fontSize: "0.75rem",
                                  borderRadius: "3px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
