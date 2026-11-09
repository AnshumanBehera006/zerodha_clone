import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container my-5 py-5 border-top">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center p-4">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>

        <div className="col-12 col-md-6 p-4 p-lg-5">
          <h2 className="fw-semibold text-dark fs-2 mb-3">{productName}</h2>
          <p className="text-muted lh-base mb-4" style={{ fontSize: "1.05rem" }}>
            {productDescription}
          </p>

          {(tryDemo || learnMore) && (
            <div className="mb-4 d-flex align-items-center">
              {tryDemo && (
                <a
                  href={tryDemo}
                  className="text-decoration-none fw-medium me-5"
                  style={{ color: "#387ed1" }}
                >
                  Try demo <i className="fa-solid fa-arrow-right-long ms-1"></i>
                </a>
              )}
              {learnMore && (
                <a
                  href={learnMore}
                  className="text-decoration-none fw-medium"
                  style={{ color: "#387ed1" }}
                >
                  Learn More <i className="fa-solid fa-arrow-right-long ms-1"></i>
                </a>
              )}
            </div>
          )}

          {(googlePlay || appStore) && (
            <div className="d-flex align-items-center">
              {googlePlay && (
                <a href={googlePlay} className="me-4" target="_blank" rel="noreferrer">
                  <img
                    src="media/images/googlePlayBadge.svg"
                    alt="Google Play Badge"
                    style={{ height: "40px" }}
                  />
                </a>
              )}
              {appStore && (
                <a href={appStore} target="_blank" rel="noreferrer">
                  <img
                    src="media/images/appstoreBadge.svg"
                    alt="App Store Badge"
                    style={{ height: "40px" }}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSection;