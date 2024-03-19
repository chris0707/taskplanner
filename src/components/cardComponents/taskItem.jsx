import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/globalContext';

export default function TaskItem(props) {
    const {cardId, taskObj, taskName} = props;
    //console.log('taskObj', taskObj);
    const {updateTaskItem} = useContext(GlobalContext);
    const [isChecked, setIsChecekd] = useState(false);
    const [inputs, setInputs] = useState([{id: 1, value: ''}]);
    const [contentVal, setContentVal] = useState(taskObj.value);

    const handleCheckboxChange = (e) => {
      setIsChecekd(prevState => !prevState);
    }

    const handleToggleItemClick = (e) => {
      e.stopPropagation();
      console.log('handlingtoggleitemclick');
    }

    const autoGrowTextArea = (e) => {
      const element = e.target;
      if (element){
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      }

      const newContentVal = e.target.value;
      setContentVal(newContentVal);

      // TaskItem save function
      updateTaskItem(cardId, taskObj.id, newContentVal);

    }

    const handleOnTaskDesc = (e) => {
        
    }

  return (
    <div className='task' key={`${taskName}-${taskObj.id}`}>
      <input type="checkbox" id={`${taskName}-${taskObj.id}`} name={`${taskName}-${taskObj.id}`} onClick={handleToggleItemClick} checked={isChecked} onChange={handleCheckboxChange} />
      <textarea style={isChecked ? {textDecoration: 'line-through'} : {}} 
        htmlFor={`${taskName}-${taskObj.id}`} 
        onClick={handleToggleItemClick} 
        onChange={autoGrowTextArea} 
        defaultValue={contentVal}>
      </textarea>
    </div>
  );
}
