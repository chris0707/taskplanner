// Card.js
import React, { useState, useEffect, useRef, useContext } from "react";
// import "./Card.css"; // Import CSS file for styling
import CardBody from "./cardComponents/body";
import { GlobalContext } from '../context/globalContext';
import Footer from "./cardComponents/footer";

export default function Card(props) {
  const {id, card, onTaskItemDelete} = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdateKeyFrames, setIsUpdateKeyFrames] = useState(false);
  const cardRef = useRef(null);
  const {removeCardById, updateCardTitle} = useContext(GlobalContext);
  const [thisCard, setThisCard] = useState(card);
  const [thisHeaderVal, setThisHeaderVal] = useState(card.taskName);

  useEffect(() => {
    setThisHeaderVal(card.taskName);
    setThisCard(card);

    console.log('refreshed card values: ', card);
  },[card]);

  useEffect(() => {
    hanldeTitleAutoUpdate();
  },[thisHeaderVal])

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

  const hanldeTitleAutoUpdate = () => {
    updateCardTitle(thisCard.id, thisHeaderVal)
  }

  const cardClassName = `card ${isExpanded ? 'expanded' : 'shrinking'}`;

  return (
    <>
      {isExpanded ? (
        <div className="cardOverlay" onClick={handleBackgroundClick}>
          <div className={cardClassName} id={id} ref={cardRef}>
            <button
              className="card-delete"
              onClick={(e) => handleDeleteCard(e, thisCard.id)}
            >
              X
            </button>
            <div className="card-header" onClick={handleHeaderFooterClick}>
              <textarea
                onChange={(e) => {
                  setThisHeaderVal(e.target.value);
                }}
                value={thisHeaderVal}
                placeholder="Title"
              ></textarea>
            </div>
            <CardBody
              // cardId={cardId}
              // content={content}
              // taskName={headerVal}
              card={thisCard}
              onTaskItemDelete={onTaskItemDelete}
            />
            <div className="card-footer" onClick={handleHeaderFooterClick}>
              <Footer cardId={thisCard.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className={cardClassName} id={id} ref={cardRef}>
          <button
            className="card-delete"
            onClick={(e) => handleDeleteCard(e, thisCard.id)}
          >
            X
          </button>
          <div className="card-header" onClick={handleHeaderFooterClick}>
            <textarea className="textAreaNoInput" value={thisHeaderVal} placeholder="Title" />
          </div>
          <CardBody card={thisCard} onTaskItemDelete={onTaskItemDelete} />
        </div>
      )}
    </>
  );
}
