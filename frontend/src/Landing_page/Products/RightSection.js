import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h2 className="fs-2">{productName}</h2>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore}  style={{textDecoration:"none" , color: "#387ed1" }}>Learn More <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;