import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container my-5 py-5 border-top">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-4 p-lg-5 order-2 order-md-1">
          <h2 className="fw-semibold text-dark fs-2 mb-3">{productName}</h2>
          <p className="text-muted lh-base mb-4" style={{ fontSize: "1.05rem" }}>
            {productDescription}
          </p>
          {learnMore && (
            <div>
              <a
                href={learnMore}
                className="text-decoration-none fw-medium"
                style={{ color: "#387ed1" }}
              >
                Learn More <i className="fa-solid fa-arrow-right-long ms-1"></i>
              </a>
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 text-center p-4 order-1 order-md-2">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;