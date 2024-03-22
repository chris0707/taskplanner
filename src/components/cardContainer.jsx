import React, {useContext, useState, useEffect} from 'react'
import Card from './card'
import './css/card.css'
import { GlobalContext } from '../context/globalContext';

export default function CardContainer() {
  const [cards, setCards] = useState([]);
  const { cardStacks, removeTaskById } = useContext(GlobalContext);
  
    useEffect(() => {
        const cardStacksCopy = [...cardStacks];
        setCards(cardStacksCopy);
    }, [cardStacks]);

    console.log('Cards',cardStacks);

    const handleDeleteCard = (cardId, taskId) => {
      const isConfirmed = window.confirm('Do you want to delete this task item?');
      if (isConfirmed){
        removeTaskById(cardId, taskId);
      }
    }

  return (
    <div className="card-container">
      {cards.length > 0 &&
        cards.map((card, idx) => (
          <Card
            id={`card-${idx}`}
            cardId={card.id}
            headerVal={card.taskName}
            content={card.taskContent}
            onTaskItemDelete={handleDeleteCard}
          />
        ))}
      {/* <Card id="1" headerVal="Task1"/>
        <Card id="2" headerVal="Task2"/>
        <Card id="3" headerVal="Task3"/>
        <Card id="4" headerVal="Task4"/>
        <Card id="5" headerVal="Task5"/>
        <Card id="6" headerVal="Task6"/>
        <Card id="7" headerVal="Task7"/>
        <Card id="8" headerVal="Task8"/> */}
    </div>
  );
}
