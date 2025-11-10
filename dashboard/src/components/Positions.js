import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      setError("");
      try {
        // FIX: Add withCredentials for cookie transfer (Fixes Data Loading)
        const res = await axios.get(`${API_BASE}/allPositions`, { withCredentials: true });
        setAllPositions(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch positions:", err);
        setError(
          err.response?.data
            ? JSON.stringify(err.response.data)
            : "Failed to fetch positions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [API_BASE]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {loading && <div>Loading positions...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {!loading && !error && allPositions.length === 0 && (
        <div>No positions found.</div>
      )}

      {!loading && !error && allPositions.length > 0 && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>Chg.</th>
              </tr>
            </thead>

            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;