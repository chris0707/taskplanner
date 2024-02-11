import React from 'react'

export default function Task(props) {
    const task = props.taskObj;
    console.log('taskObj', task);
  return (
    <div key={task.taskHeader}>
      {task.taskHeader}:{task.taskDesc}
    </div>
  );
}
