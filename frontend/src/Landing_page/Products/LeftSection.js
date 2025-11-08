import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h2 className="fs-2">{productName}</h2>
          <p>{productDesription}</p>
          <div>
            <a href={tryDemo} style={{ textDecoration: "none",color: "#387ed1"}}>
              Try Demo <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href={learnMore}
              style={{ textDecoration: "none", marginLeft: "50px" , color: "#387ed1"  }}
            >
              Learn More{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
