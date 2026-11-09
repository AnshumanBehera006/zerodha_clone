import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQty, setAvailableQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { closeSellWindow, triggerRefresh } = useContext(GeneralContext);

  useEffect(() => {
    // Fetch available holdings for this stock
    axios
      .get("/allHoldings")
      .then((res) => {
        const found = res.data.find(
          (h) => h.name.toUpperCase() === uid.toUpperCase()
        );
        if (found) {
          setAvailableQty(found.qty);
          setStockPrice(found.price || 0.0);
        } else {
          setAvailableQty(0);
        }
      })
      .catch((err) => {
        console.error("Error fetching holdings for sell window:", err);
      });
  }, [uid]);

  const qtyNum = Number(stockQuantity);
  const priceNum = Number(stockPrice);
  const isOverQty = qtyNum > availableQty;
  const isInvalid = qtyNum <= 0 || priceNum <= 0 || isOverQty || availableQty <= 0;

  const handleSellClick = async () => {
    if (isInvalid) return;
    setLoading(true);
    setErrorMsg("");

    try {
      await axios.post("/sellOrder", {
        name: uid,
        qty: qtyNum,
        price: priceNum,
      });

      if (triggerRefresh) triggerRefresh();
      if (closeSellWindow) closeSellWindow();
    } catch (error) {
      console.error("Error creating sell order:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to place sell order"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (closeSellWindow) closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div
        className="header"
        style={{
          background: "#df514c",
          padding: "12px 16px",
          color: "#fff",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1rem" }}>
          Sell {uid} <span>x {stockQuantity} Qty</span>
        </h3>
      </div>

      <div className="regular-order">
        <div className="avail-qty-info">
          Available Quantity: <strong>{availableQty}</strong>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="sell-qty"
              min="1"
              max={availableQty}
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="sell-price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        {isOverQty && (
          <div className="sell-error-text">
            Cannot sell more than available quantity ({availableQty})
          </div>
        )}

        {availableQty === 0 && (
          <div className="sell-error-text">
            You do not own any shares of {uid} to sell.
          </div>
        )}

        {errorMsg && <div className="sell-error-text">{errorMsg}</div>}
      </div>

      <div className="buttons">
        <span>Amount ₹{(qtyNum * priceNum).toFixed(2)}</span>
        <div>
          <button
            type="button"
            className="btn btn-red"
            disabled={isInvalid || loading}
            onClick={handleSellClick}
          >
            {loading ? "Selling..." : "Sell"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;

