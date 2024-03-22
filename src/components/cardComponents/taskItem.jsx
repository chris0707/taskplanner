import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/globalContext';

export default function TaskItem(props) {
    const {cardId, taskObj, taskName, onTaskItemDelete} = props;
    //console.log('taskObj', taskObj);
    const {updateTaskItem,removeTaskById} = useContext(GlobalContext);
    const [isChecked, setIsChecekd] = useState(false);
    const [contentVal, setContentVal] = useState(taskObj.value);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      setContentVal(taskObj.value);
      console.log('taskobject updated!', taskObj.value);
    },[taskObj])

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

    // const handleDeleteTask = (e) => {
    //     const isConfirmed = window.confirm('Do you want to delete this task item?');
    //     if (isConfirmed){
    //       removeTaskById(cardId, taskObj.id);
    //       removeDOM();
    //     }
    // }

    const handleTextAreaFocus = () => {
      setIsFocused(true);
    }

    const handleTextAreaBlur = () => {
      setIsFocused(false);
    }

  return (
    <div className="task" key={`${taskName}-${taskObj.id}`}>
      <button
        className="task-delete"
        style={isFocused ? { visibility: "visible" } : { visibility: "" }}
        onClick={() => onTaskItemDelete(cardId, taskObj.id)}
      >
        X
      </button>
      <input
        type="checkbox"
        id={`${taskName}-${taskObj.id}`}
        name={`${taskName}-${taskObj.id}`}
        onClick={handleToggleItemClick}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <textarea
        style={isChecked ? { textDecoration: "line-through" } : {}}
        htmlFor={`${taskName}-${taskObj.id}`}
        onClick={handleToggleItemClick}
        onChange={autoGrowTextArea}
        value={contentVal}
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
      ></textarea>
    </div>
  );
}
