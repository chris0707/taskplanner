import React from 'react'
import TaskItem from './taskItem';
import Collapsible from './Collapsible';

export default function Body(props) {
    const {cardId, content, taskName, onTaskItemDelete} = props;

    const hanldeDivClick = (e) => {
      e.stopPropagation();
    }
  return (
    // <div className='card-body' onClick={hanldeDivClick}>
    //     {content.length > 0 && content.map((task) =>
    //         <TaskItem taskObj={task} taskName={taskName} cardId={cardId} onTaskItemDelete={onTaskItemDelete}/>
    //     )}
    // </div>
    <div className="card-body" onClick={hanldeDivClick}>
      <Collapsible>
        {content.length > 0 &&
          content.map((task) => (
            <TaskItem
              taskObj={task}
              taskName={taskName}
              cardId={cardId}
              onTaskItemDelete={onTaskItemDelete}
            />
          ))}
      </Collapsible>
    </div>
  );
}
