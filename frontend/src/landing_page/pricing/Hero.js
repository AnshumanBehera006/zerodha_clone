import React from "react";

function Hero() {
  return (
    <div className="container py-5">
      <div className="row text-center mt-5 mb-5">
        <h1 className="fs-2 text-muted">Pricing</h1>
        <h3 className="fs-5 text-muted mt-2">
          Free equity investments and flat ₹20 intraday and F&amp;O trades
        </h3>
      </div>

      <hr className="my-5 text-muted" />

      <div className="row text-center text-muted p-3">
        <div className="col-12 col-md-4 p-4">
          <img
            src="media/images/pricing0.svg"
            alt="Free equity delivery"
            style={{ width: "70%" }}
            className="mb-3"
          />
          <h2 className="fs-4 text-dark">Free equity delivery</h2>
          <p className="text-muted mt-3 lh-base">
            All equity delivery investments (NSE, BSE) are absolutely free — ₹0
            brokerage.
          </p>
        </div>

        <div className="col-12 col-md-4 p-4">
          <img
            src="media/images/other-trades.svg"
            alt="Intraday and F&O trades"
            style={{ width: "70%" }}
            className="mb-3"
          />
          <h2 className="fs-4 text-dark">Intraday and F&amp;O trades</h2>
          <p className="text-muted mt-3 lh-base">
            Flat ₹20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        <div className="col-12 col-md-4 p-4">
          <img
            src="media/images/pricing0.svg"
            alt="Free direct MF"
            style={{ width: "70%" }}
            className="mb-3"
          />
          <h2 className="fs-4 text-dark">Free direct MF</h2>
          <p className="text-muted mt-3 lh-base">
            All direct mutual fund investments are absolutely free — ₹0
            commissions &amp; DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;