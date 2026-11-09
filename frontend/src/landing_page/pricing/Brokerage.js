import React from "react";

function Brokerage() {
  return (
    <div className="container py-4 border-top">
      <div className="row mt-4 mb-5">
        <div className="col-12 col-md-8 p-4">
          <h3 className="fs-5 text-center text-md-start mb-4">
            <a
              href="https://zerodha.com/brokerage-calculator"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Brokerage calculator
            </a>
          </h3>

          <ul
            className="text-muted lh-lg"
            style={{ fontSize: "12px", listStyleType: "disc" }}
          >
            <li>
              Call &amp; Trade and RMS auto-squareoff: Additional charges of ₹50
              + GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes shall be charged ₹20 per
              contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-4 p-4 text-center text-md-start">
          <h3 className="fs-5 mb-4">
            <a
              href="https://zerodha.com/charges/#tab-equities"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              List of charges
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;