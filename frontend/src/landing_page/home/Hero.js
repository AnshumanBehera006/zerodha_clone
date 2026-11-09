import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (  
        <div className="container p-5">
            <div className="row text-center">
                <img src='media/images/homeHero.png' alt='Hero_image' className='mb-5' />
                <h1 className='mt-5'>Invest in everything</h1>
                <p>Online platform for investing in stocks, mutual funds, and more</p>
                <Link
                  to="/signup"
                  className="p-2 btn btn-primary fs-8 mb-5"
                  style={{ width: "23%", margin: "0 auto", backgroundColor: "#387ed1", color: "white", borderColor: "#387ed1", textDecoration: "none" }}
                >
                  Sign up Now
                </Link>
            </div>
        </div>
    );
}

export default Hero;
