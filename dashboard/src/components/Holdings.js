import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { openSellWindow, refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    axios
      .get("/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, [refreshTrigger]);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Compute dynamic summary metrics
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (stock.avg || 0) * (stock.qty || 0),
    0
  );
  const totalCurrentValue = allHoldings.reduce(
    (acc, stock) => acc + (stock.price || 0) * (stock.qty || 0),
    0
  );
  const totalPandL = totalCurrentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? ((totalPandL / totalInvestment) * 100).toFixed(2) : "0.00";

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No holdings found. Buy stocks from the Watchlist to get started!
                </td>
              </tr>
            ) : (
              allHoldings.map((stock, index) => {
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const isProfit = curValue - (stock.avg || 0) * (stock.qty || 0) >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{(stock.avg || 0).toFixed(2)}</td>
                    <td>{(stock.price || 0).toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - (stock.avg || 0) * (stock.qty || 0)).toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net || "0.00%"}</td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                    <td>
                      <button
                        className="btn btn-red"
                        style={{
                          backgroundColor: "#df514c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "3px",
                          padding: "4px 10px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                        onClick={() => openSellWindow(stock.name)}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{totalCurrentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: totalPandL >= 0 ? "#4caf50" : "#df514c" }}>
            {totalPandL >= 0 ? "+" : ""}
            {totalPandL.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;
