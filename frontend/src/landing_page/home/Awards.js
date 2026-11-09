import React from 'react';

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/largestBroker.svg"
            alt="Largest stock broker in India"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-6 p-3">
          <h1 className="fs-2 mb-3">Largest stock broker in India</h1>
          <p className="mb-4 text-muted">
            2+ million Zerodha clients contribute to over 15% of all retail order
            volumes in India daily by trading and investing in:
          </p> 
          <div className="row">
            <div className="col-6">
              <ul>
                <li className="mb-3 text-muted">Futures and Options</li>
                <li className="mb-3 text-muted">Commodity derivatives</li>
                <li className="mb-3 text-muted">Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li className="mb-3 text-muted">Stocks & IPOs</li>
                <li className="mb-3 text-muted">Direct mutual funds</li>
                <li className="mb-3 text-muted">Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <img
              src="media/images/pressLogos.png"
              alt="Press logos"
              style={{ width: "90%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;