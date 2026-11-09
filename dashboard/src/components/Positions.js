import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/allPositions")
      .then((res) => {
        setAllPositions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  Loading positions...
                </td>
              </tr>
            ) : allPositions.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No active positions found.
                </td>
              </tr>
            ) : (
              allPositions.map((stock, index) => {
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const isProfit =
                  curValue - (stock.avg || 0) * (stock.qty || 0) >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product || "CNC"}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{(stock.avg || 0).toFixed(2)}</td>
                    <td>{(stock.price || 0).toFixed(2)}</td>
                    <td className={profClass}>
                      {(
                        curValue -
                        (stock.avg || 0) * (stock.qty || 0)
                      ).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
