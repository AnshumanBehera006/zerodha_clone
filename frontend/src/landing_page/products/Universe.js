import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container pb-5 text-center">
      <p className="text-muted fs-5 mb-5">
        Want to know more about our technology stack? Check out the{" "}
        <a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>
          Zerodha.tech
        </a>{" "}
        blog.
      </p>

      <h2 className="fw-semibold text-dark fs-2 mb-3">The Zerodha Universe</h2>
      <p className="text-muted mb-5">
        Extend your trading and investment experience even further with our partner platforms
      </p>

      <div className="row text-center gy-5">
        <div className="col-12 col-md-4 p-3">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="Zerodha Fund House"
            style={{ width: "160px", height: "auto" }}
          />
          <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3">
          <img
            src="media/images/sensibullLogo.svg"
            alt="Sensibull"
            style={{ width: "180px", height: "auto" }}
          />
          <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            Options trading platform that lets you create strategies, analyze positions, and examine key data points like open interest.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3">
          <img
            src="media/images/tijori.svg"
            alt="Tijori"
            style={{ width: "140px", height: "auto" }}
          />
          <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3">
          <img
            src="media/images/streakLogo.png"
            alt="Streak"
            style={{ width: "150px", height: "auto" }}
          />
          <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            Systematic trading platform that allows you to create and backtest strategies without coding.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3">
          <img
            src="media/images/smallcaseLogo.png"
            alt="smallcase"
            style={{ width: "170px", height: "auto" }}
          />
          <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3">
          <img
            src="media/images/dittoLogo.png"
            alt="Ditto Insurance"
            style={{ width: "120px", height: "auto" }}
          />
          <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
            Personalized advice on life and health insurance. No spam and no mis-selling.
          </p>
        </div>
      </div>

      <Link
        to="/signup"
        className="p-2 btn btn-primary fs-5 mb-5 mt-5"
        style={{
          width: "200px",
          margin: "0 auto",
          backgroundColor: "#387ed1",
          borderColor: "#387ed1",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Sign up Now
      </Link>
    </div>
  );
}

export default Universe;
