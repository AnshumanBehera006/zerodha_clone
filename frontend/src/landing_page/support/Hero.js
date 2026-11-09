import React from "react";

function Hero() {
  return (
    <section
      className="container-fluid mb-0"
      id="supportHero"
      style={{ backgroundColor: "#387ed1", color: "white" }}
    >
      <div className="container py-4 d-flex justify-content-between">
        <h4 className="fs-5">Support Portal</h4>
        <a
          href=""
          style={{
            color: "white",
            textDecoration: "underline",
            fontSize: "15px",
          }}
        >
          Track Tickets
        </a>
      </div>

      <div className="container py-4 pb-5">
        <div className="row justify-content-between">
          <div className="col-12 col-md-6 pe-md-4">
            <h1 className="fs-4 mb-4 lh-base" style={{ fontWeight: "400" }}>
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              className="form-control py-3 px-4 mb-4 shadow-sm"
              placeholder="Eg: how do i activate F&O, why is my order getting rejected.."
              style={{ borderRadius: "3px", border: "none" }}
            />

            <div className="d-flex flex-wrap gap-3" style={{ fontSize: "14px" }}>
              <a href="" style={{ color: "white", textDecoration: "underline" }}>
                Track account opening
              </a>
              <a href="" style={{ color: "white", textDecoration: "underline" }}>
                Track segment activation
              </a>
              <a href="" style={{ color: "white", textDecoration: "underline" }}>
                Intraday margins
              </a>
              <a href="" style={{ color: "white", textDecoration: "underline" }}>
                Kite user manual
              </a>
            </div>
          </div>

          <div className="col-12 col-md-5 ps-md-5 mt-4 mt-md-0">
            <h1 className="fs-4 mb-4" style={{ fontWeight: "400" }}>
              Featured
            </h1>
            <ol className="ps-3" style={{ lineHeight: "2.3", fontSize: "15px" }}>
              <li className="mb-2">
                <a
                  href=""
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Current Takeovers and Delisting - January 2024
                </a>
              </li>
              <li>
                <a
                  href=""
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Latest Intraday leverages - MIS &amp; CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;