import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column - Image */}
        <div className="col-6 p-5">
          <img
            src="/media/images/largestBroker.svg"
            alt="Largest Broker"
            className="img-fluid"
          />
        </div>

        {/* Right Column - Text and Lists */}
        <div className="col-6 p-5 mt-5">
          <h1 className=" fs-2">Largest stock Broker in India</h1>
          <p className="mb-5">
            2+ million Credit Europe Bank clients contribute to over 15% of all retail
            order volume in India daily by trading and investing in:
          </p>

          {/* Nested Row for two 6-6 columns of lists */}
          <div className="row">
            {/* Left List */}
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>

            {/* Right List */}
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & ETFs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds & Govt securities</p>
                </li>
              </ul>
            </div>
          </div>
          <img
            src="\media\images\pressLogos.png"
            alt="pressLogos "
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;
