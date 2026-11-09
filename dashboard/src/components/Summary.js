import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = ({ username }) => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("/allHoldings")
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching holdings for summary:", err);
      });
  }, []);

  const totalInvestment = holdings.reduce(
    (acc, s) => acc + (s.avg || 0) * (s.qty || 0),
    0
  );
  const totalCurrentValue = holdings.reduce(
    (acc, s) => acc + (s.price || 0) * (s.qty || 0),
    0
  );
  const totalPandL = totalCurrentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((totalPandL / totalInvestment) * 100).toFixed(2)
      : "0.00";

  return (
    <>
      <div className="username">
        <h6>Hi, {username || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPandL >= 0 ? "profit" : "loss"}>
              {(totalPandL / 1000).toFixed(2)}k{" "}
              <small>
                {totalPandL >= 0 ? "+" : ""}
                {pnlPercent}%
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{(totalCurrentValue / 1000).toFixed(2)}k</span>{" "}
            </p>
            <p>
              Investment <span>{(totalInvestment / 1000).toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
