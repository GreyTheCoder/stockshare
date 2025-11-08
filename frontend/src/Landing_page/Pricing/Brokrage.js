import React from "react";

function Brokrage() {
  return (
    <div className="container">
      <div className="row mt-5 p-5 text-center border-top">
        {/* Left Section */}
        <div className="col-8 p-4 text-start">
          <a href="#" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage Calculator</h3>
          </a>
          <ul className="text-muted" style={{ lineHeight: "2.5" , fontSize :"12px" }}>
            <li>Quickly calculate the exact brokerage charges for any trade so you can plan your investments effectively without surprises.</li>
            <li>Gain complete clarity on all associated costs before executing trades to avoid hidden fees or unexpected deductions.</li>
            <li>Easily compare charges across multiple market segments, including equities, derivatives, and mutual funds, to make informed choices.</li>
            <li>Optimize your trading strategies with accurate cost insights that help you maximize returns while minimizing expenses.</li>
            <li>Completely free and easy to use, providing a user-friendly experience for both beginner and experienced investors alike.</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="col-4 p-4 text-start">
          <a href="#" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of Charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokrage;
