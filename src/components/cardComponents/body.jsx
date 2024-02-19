import React from 'react'
import TaskItem from './taskItem';

export default function Body(props) {
    const {content, taskName} = props;

  return (
    <div className='card-body'>
        {content.length > 0 && content.map((task) => 
            <TaskItem taskObj={task} taskName={taskName}/>
        )}
    </div>
  )
}
