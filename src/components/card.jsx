// Card.js
import React, { useState, useEffect, useRef, useContext } from "react";
// import "./Card.css"; // Import CSS file for styling
import CardBody from "./cardComponents/body";
import { GlobalContext } from '../context/globalContext';

export default function Card(props) {
  const {id, headerVal, content} = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdateKeyFrames, setIsUpdateKeyFrames] = useState(false);
  const cardRef = useRef(null);
  const { removeCardById } = useContext(GlobalContext);

  useEffect(() => {
    if (isExpanded && isUpdateKeyFrames){
      console.log('updating keyframes');
      const keyframesName = `moveToMiddle-${id}`;
      updateKeyFrames(keyframesName);
      setIsUpdateKeyFrames(false);
    }
  }, [isExpanded])

  const updateKeyFrames = (keyframesName) => {
    const card = cardRef.current;
    console.log(card);
    if(!card) return false;

    var rect = card.getBoundingClientRect();
    var initialLeft = rect.left + window.scrollX;
    var initialTop = rect.top + window.scrollY;
  
    var keyframes = `
      @keyframes ${keyframesName} {
        0% {
          left: ${initialLeft}px;
          top: ${initialTop}px;
          transform: translate(-${initialLeft}px, -${initialTop}px);
        }
        100% {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    `;
    //console.log(keyframes)
    var styleSheet = document.styleSheets[0];
    //console.log(document.styleSheets);
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    card.style.animation = `${keyframesName} 0.5s ease forwards`;
    console.log(card.style.animation);
    setTimeout(() => {
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
  }, 500);
  }

  const handleHeaderFooterClick = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsExpanded(true);
    console.log(isExpanded);
    setIsUpdateKeyFrames(true);
  };


  const handleBackgroundClick = () => {
    setIsExpanded(false);
    console.log('background clicked');
  };

  const handleDeleteCard = (e, taskName) => {
    e.stopPropagation();

    const isConfirmed = window.confirm('Are you sure you want to delete task?');
    if (isConfirmed){
      console.log(`Removing ${taskName}`);
      removeCardById(taskName);
    }
  }

  const cardClassName = `card ${isExpanded ? 'expanded' : 'shrinking'}`;

  return (
    <>
      {isExpanded  ?(
        <div className="cardOverlay" onClick={handleBackgroundClick}>
          <div className={cardClassName} id={id} ref={cardRef}>
            <button className="card-delete" onClick={(e) => handleDeleteCard(e,headerVal)}>X</button>
            <div className="card-header" onClick={handleHeaderFooterClick}>
              {headerVal}
            </div>
            <CardBody content={content} taskName={headerVal} />
            <div className="card-footer" onClick={handleHeaderFooterClick}>
              {}
            </div>
          </div>
        </div>
      ): (<div className={cardClassName} id={id} ref={cardRef}>
        <button className="card-delete" onClick={(e) => handleDeleteCard(e,headerVal)}>X</button>
        <div className="card-header" onClick={handleHeaderFooterClick}>
          {headerVal}
        </div>
        <CardBody content={content} taskName={headerVal} />
        <div className="card-footer" onClick={handleHeaderFooterClick}>
          {}
        </div>
      </div>)}
      
    </>
  );
}
