import React from "react";


function Universe() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="fw-medium fs-2">The Zerodha Universe</h1>
      <p className="text-muted mt-3">
        Extend your trading and investment experience even further with our
        partner platforms
      </p>

      <div className="row mt-5">
        {[
          {
            img: "/media/images/zerodhaFundhouse.png",
            desc: "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
          },
          {
            img: "/media/images/sensibullLogo.svg",
            desc: "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.",
          },
          {
            img: "/media/images/goldenpiLogo.png",
            desc: "Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.",
          },
          {
            img: "/media/images/streakLogo.png",
            desc: "Systematic trading platform that allows you to create and backtest strategies without coding.",
          },
          {
            img: "/media/images/smallcaseLogo.png",
            desc: "Thematic investing platform that helps you invest in diversified baskets of stocks or ETFs.",
          },
          {
            img: "/media/images/dittoLogo.png",
            desc: "Personalized advice on life and health insurance. No spam and no mis-selling.",
          },
        ].map((item, index) => (
          <div key={index} className="col-md-4 col-sm-6 p-3 mt-4">
            <div className="partner-card">
              <img src={item.img} alt="partner logo" className="partner-logo" />
              <p className="text-muted small mt-3">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary fs-5 px-5 py-2 mt-4 mb-5">
        Signup for free
      </button>
    </div>
  );
}

export default Universe;
