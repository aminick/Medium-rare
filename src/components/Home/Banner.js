import React from "react";

const Banner = ({ appName }) => (
  <div className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{appName.toLowerCase()}</h1>
        <h2 className="subtitle">A place to share your knowledge</h2>
      </div>
    </div>
  </div>
);

export default Banner;
