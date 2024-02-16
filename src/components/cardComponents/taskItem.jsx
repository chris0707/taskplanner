import React, { useState } from 'react'

export default function TaskItem(props) {
    const {taskObj, taskName} = props;
    console.log('taskObj', taskObj);

    const [isChecked, setIsChecekd] = useState(false);

    const handleCheckboxChange = (e) => {
      setIsChecekd(prevState => !prevState);
    }

    const handleToggleItemClick = (e) => {
      e.stopPropagation();
      console.log('handlingtoggleitemclick');
    }
  return (
    <div className='task' key={`${taskName}-${taskObj.id}`}>
      <input type="checkbox" id={`${taskName}-${taskObj.id}`} name={`${taskName}-${taskObj.id}`} onClick={handleToggleItemClick} checked={isChecked} onChange={handleCheckboxChange} />
      <label style={isChecked ? {textDecoration: 'line-through'} : {}} htmlFor={`${taskName}-${taskObj.id}`} onClick={handleToggleItemClick}>{taskObj.value}</label>
    </div>
  );
}
