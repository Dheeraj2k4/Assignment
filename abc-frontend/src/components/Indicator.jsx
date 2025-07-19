import React from "react";
import "./Indicator.css";

const Indicator = ({ currentIndex = 0, total = 3 }) => {
  return (
    <div className="indicator-container">
      {/* progress bar */}
      <div className="bar">
        <div
          className="progress"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        ></div>
      </div>
      {/* dots */}
      <div className="dots">
        {Array.from({ length: Math.max(1, total) }).map((_, idx) => (
          <span key={idx} className={`dot ${idx === currentIndex ? "active" : ""}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Indicator; 