import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img src="media/images/homeHero.png" alt="heroImage" className="mb-5" />
        <h1 className="fs-2"> Invest in everything</h1>
        <p
          className="mb-4"
          style={{ fontSize: "1.25rem", fontWeight: 400, marginTop: "10px" }}
        >
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button
          className=" p-2 btn btn-primary fs-5 mt-3 mb-5"
          style={{ width: "20%", margin: "0 auto", backgroundColor: "#387ed1" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Hero;
