import React from 'react'
import TaskItem from './taskItem';

export default function Body(props) {
    const {cardId, content, taskName} = props;

    const hanldeDivClick = (e) => {
      e.stopPropagation();
    }
  return (
    <div className='card-body' onClick={hanldeDivClick}>
        {content.length > 0 && content.map((task) => 
            <TaskItem taskObj={task} taskName={taskName} cardId={cardId}/>
        )}
    </div>
  )
}
