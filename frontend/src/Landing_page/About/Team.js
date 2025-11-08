import React from "react";

function Team() {
  return (
    <div className="container mb-5 mt-5">
      <div className="row p-3 mt-5  border-top">
        <h1 className="text-center"> People</h1>
      </div>
      <div
        className="row p-5 text-muted  text-center"
        style={{ fontSize: "1.2em", lineHeight: "1.8" }}
      >
        <div className="col-6 p-3">
          <img
            src="media/images/nithinKamath.jpg"
            alt="nithin kamath"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-3">Nithin Kamath</h4>
          <h6>Founder & CEO</h6>
        </div>
        <div className="col-6 p-3 fs-6 text-start fw-semibold">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            {" "}
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>Connect on  <a href="" style={{textDecoration:"None"}}>Homepage </a> /  <a href="" style={{textDecoration:"None"}}>TradingQnA</a> /  <a href="" style={{textDecoration:"None"}}>Twitter</a></p>{" "}
        </div>
      </div>
    </div>
  );
}

export default Team;
