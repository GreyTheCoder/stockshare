import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3002/allOrders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err.response && err.response.data ? JSON.stringify(err.response.data) : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Orders</h2>

      {loading && <div>Loading orders...</div>}

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!loading && !error && orders.length === 0 && <div>No orders found.</div>}

      {!loading && !error && orders.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Name</th>
                <th style={{ textAlign: "right", padding: 8, borderBottom: "1px solid #ddd" }}>Qty</th>
                <th style={{ textAlign: "right", padding: 8, borderBottom: "1px solid #ddd" }}>Avg</th>
                <th style={{ textAlign: "right", padding: 8, borderBottom: "1px solid #ddd" }}>Price</th>
                <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{o.name}</td>
                  <td style={{ padding: 8, textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{o.qty}</td>
                  <td style={{ padding: 8, textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{o.avg}</td>
                  <td style={{ padding: 8, textAlign: "right", borderBottom: "1px solid #f0f0f0" }}>{o.price}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>{o.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;