import React from "react";

function Hero() {
  return (
    <div className="container text-center mt-5 p-5 border-bottom mb-5">
      <h2 className="mb-3 fs-3">Credit Europe Bank Products </h2>
      <h5 className="mb-3 text-muted">
        Sleek, modern, and intuitive trading platforms
      </h5>
      <p className="mt-4 fs-6 mb-5">
        Check out our{" "}
        <a href="" style={{ textDecoration: "none", color: "#387ed1" }}>
          investment offerings <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </a>.
      </p>
    </div>
  );
}

export default Hero;