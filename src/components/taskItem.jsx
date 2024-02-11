import React from 'react'

export default function TaskItem(props) {
    const task = props.taskObj;
    console.log('taskObj', task);
  return (
    <div key={task.taskHeader}>
      {task.taskHeader}:{task.taskDesc}
    </div>
  );
}
