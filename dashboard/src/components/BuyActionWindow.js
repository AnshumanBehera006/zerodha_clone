import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post("/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      });
      if (triggerRefresh) triggerRefresh();
      if (closeBuyWindow) closeBuyWindow();
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to create buy order"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (closeBuyWindow) closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="header" style={{ background: "#4184f3", padding: "12px 16px", color: "#fff" }}>
        <h3 style={{ margin: 0, fontSize: "1rem" }}>
          Buy {uid} <span>x {stockQuantity} Qty</span>
        </h3>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
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
        {errorMsg && (
          <p style={{ color: "#df514c", fontSize: "0.8rem" }}>{errorMsg}</p>
        )}
      </div>

      <div className="buttons">
        <span>Amount ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Buying..." : "Buy"}
          </button>
          <button type="button" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
