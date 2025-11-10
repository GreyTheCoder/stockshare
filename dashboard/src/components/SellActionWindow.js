import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // ✅ Access context value
  const context = useContext(GeneralContext);
  const { closeSellWindow } = context || {};

  // ✅ Use centralized API base
  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  const handleSellClick = async () => {
    try {
      if (!uid || typeof uid !== "string" || uid.length === 0) {
        alert("❌ Error: Stock symbol is missing. Cannot proceed with sale.");
        return;
      }

      const payload = {
        name: uid,
        qty: parseFloat(stockQuantity),
        price: parseFloat(stockPrice),
      };

      console.log("🟡 Sending Sell Order Payload:", payload);

      const queryString = `?name=${encodeURIComponent(
        payload.name
      )}&qty=${encodeURIComponent(payload.qty)}`;

      // ✅ Backend API call using env URL
      const response = await axios.delete(`${API_BASE}/sellOrder${queryString}`);

      console.log("✅ Sell Order Response:", response.data);
      alert("✅ Sell order successful!");

      if (typeof closeSellWindow === "function") {
        closeSellWindow();
      } else {
        console.warn("⚠️ closeSellWindow function not found in context");
      }
    } catch (error) {
      console.error("❌ Error while selling:", error);
      const errorMessage =
        error.response?.data || "Something went wrong while processing the sell order!";
      alert(`❌ Error: ${errorMessage}`);
    }
  };

  const handleCancelClick = () => {
    if (typeof closeSellWindow === "function") closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
