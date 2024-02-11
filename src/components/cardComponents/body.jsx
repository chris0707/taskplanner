import React, { useState } from 'react'
import TaskItem from '../taskItem';

export default function Body() {
    const initialState = [
            {
                taskHeader: "task1",
                taskDesc: "this is task1"
            },
            {
                taskHeader: "task2",
                taskDesc: "this is task2"
            },
            {
                taskHeader: "task3",
                taskDesc: "this is task3"
            }
        ]

    const [tasks, setTasks] = useState(initialState);
    console.log(tasks);
  return (
    <div className='taskHeader'>
        {tasks.map((task) => 
            <TaskItem taskObj={task}/>
        )}
    </div>
  )
}
