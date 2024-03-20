import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/globalContext';


export default function Footer(props) {
  const { cardId } = props;
  const { addTaskToCard } = useContext(GlobalContext);

  const addNewInput = () => {
    addTaskToCard(cardId);
  }

  return (
    <div className=''>
      <button
        onClick={addNewInput}
      >Add task
      </button>
    </div>
  )
}
