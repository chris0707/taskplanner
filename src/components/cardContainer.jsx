import React, {useContext, useState, useEffect} from 'react'
import Card from './card'
import './css/card.css'
import { GlobalContext } from '../context/globalContext';

export default function CardContainer() {
  const [cards, setCards] = useState([]);
  const { cardStacks, removeTaskById } = useContext(GlobalContext);
  


    useEffect(() => {
        const cardStacksCopy = cardStacks;
        setCards(cardStacksCopy);

    }, [cardStacks]);

    console.log('Cards', cardStacks);

    const handleDeleteCard = (cardId, taskId) => {
      const isConfirmed = window.confirm('Do you want to delete this task item?');
      if (isConfirmed){
        removeTaskById(cardId, taskId);
      }
    }

  return (
    <div className="card-container">
      {cards.length > 0 &&
        cards.slice().reverse().map((card, idx) => (
          <Card
            key={`card-${idx}`}
            id={`card-${idx}`}
            card={card}
            onTaskItemDelete={handleDeleteCard}
          />
        ))}
    </div>
  );
}
