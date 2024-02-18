import React, { useContext, useEffect, useState } from 'react'
import TaskItem from './taskItem';

export default function Body(props) {
    const {content, taskName} = props;
    const [tasks, setTasks] = useState([]);
    
    const initialState = [
            {
                taskDesc: "this is task1, create new tasks for someone and then have them create it again"
            },
            {
                taskDesc: "this is task2, maybe have the other guy do it for them??? What do you think? Thoughts needed."
            },
            {
                taskDesc: "this is task3"
            },
            {
                taskDesc: "this is task3"
            },
            {
                taskDesc: "this is task3"
            }
        ];

  return (
    <div className='card-body'>
        {content.length > 0 && content.map((task) => 
            <TaskItem taskObj={task} taskName={taskName}/>
        )}
    </div>
  )
}
