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
            src="media/images/marc.jpg"
            alt="Marc van der Berg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-3">Marc van der Berg</h4>

          <h6>Founder & CEO</h6>
        </div>
        <div className="col-6 p-3 fs-6 text-start fw-semibold">
          <p>
            Marc bootstrapped and founded Credit Europe Bank in 2010 to simplify
            the complexities he encountered during his career in European
            capital markets. Today, Credit Europe Bank has redefined digital
            banking and investment standards across the continent.
          </p>
          <p>
            {" "}
            He serves as a senior advisor to several European financial
            regulatory bodies and is a frequent speaker at global fintech
            summits.
          </p>
          <p>Cycling through the Alps is his zen.</p>
          <p>
            Connect on{" "}
            <a href="" style={{ textDecoration: "None" }}>
              Homepage{" "}
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "None" }}>
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "None" }}>
              Twitter
            </a>
          </p>{" "}
        </div>
      </div>
    </div>
  );
}

export default Team;
