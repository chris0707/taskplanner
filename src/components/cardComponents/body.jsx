import React, { useState } from 'react'
import TaskItem from './taskItem';

export default function Body() {
    const initialState = [
            {
                taskHeader: "task1",
                taskDesc: "this is task1, create new tasks for someone and then have them create it again"
            },
            {
                taskHeader: "task2",
                taskDesc: "this is task2, maybe have the other guy do it for them??? What do you think? Thoughts needed."
            },
            {
                taskHeader: "task3",
                taskDesc: "this is task3"
            },
            {
                taskHeader: "task4",
                taskDesc: "this is task3"
            },
            {
                taskHeader: "task5",
                taskDesc: "this is task3"
            }
        ]

    const [tasks, setTasks] = useState(initialState);
    
  return (
    <div className='card-body'>
        {tasks.map((task) => 
            <TaskItem taskObj={task}/>
        )}
    </div>
  )
}
