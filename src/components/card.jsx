// Card.js
import React, { useState, useEffect } from "react";
// import "./Card.css"; // Import CSS file for styling
import CardBody from "./cardComponents/body";

export default function Card() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHeaderFooterClick = (e) => {
    e.stopPropagation(); // Stop event propagation
    // setIsExpanded(prevState => !prevState); // Toggle the state
    setIsExpanded(true);
  };
  

  const handleBackgroundClick = () => {
    setIsExpanded(false);
    console.log('background clicked');
  };

  const cardClassName = `card ${isExpanded ? 'expanded' : 'shrinking'}`

  return (
    <>
      {isExpanded && (
        <div className="cardOverlay" onClick={handleBackgroundClick} />
      )}
      <div className={cardClassName}>
        <div className="card-header" onClick={handleHeaderFooterClick}>
          Task Planner
        </div>
        <CardBody />
        <div className="card-footer" onClick={handleHeaderFooterClick}>
          Footer
        </div>
      </div>
    </>
  );
}
