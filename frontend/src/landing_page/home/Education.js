import React from 'react';

function Education() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <img 
                        src="media/images/education.svg" 
                        alt="education" 
                        style={{ width: "70%" }} 
                    />
                </div>
                <div className="col-6">
                    <h1 className="fs-2 mb-4">Free and open market education</h1>
                    
                    <p>
                        Varsity, the largest online stock market education book in the world
                        covering everything from the basics to advanced trading.
                    </p>
                    <a href="#" className="mb-4 d-inline-block" style={{ textDecoration: "none" }}>
                        Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>

                    <p className="mt-3">
                        TradingQ&amp;A, the most active trading and investment community in India 
                        for all your market-related queries.
                    </p>
                    <a href="#" style={{ textDecoration: "none" }}>
                        TradingQ&amp;A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Education;