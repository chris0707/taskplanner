import React, { useState } from 'react'

export default function TaskItem(props) {
    const task = props.taskObj;
    //console.log('taskObj', task);

    const [isChecked, setIsChecekd] = useState(false);
    

    const handleCheckboxChange = (e) => {
      setIsChecekd(prevState => !prevState);
    }

    const handleToggleItemClick = (e) => {
      e.stopPropagation();
      console.log('handlingtoggleitemclick');
    }
  return (
    <div className='task' key={task.taskHeader}>
      <input type="checkbox" id={task.taskHeader} name={task.taskHeader} onClick={handleToggleItemClick} checked={isChecked} onChange={handleCheckboxChange} />
      <label style={isChecked ? {textDecoration: 'line-through'} : {}} htmlFor={task.taskHeader} onClick={handleToggleItemClick}>{task.taskDesc}</label>
    </div>
  );
}
