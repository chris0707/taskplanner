import React, { useContext } from 'react'
import TaskItem from './taskItem';
import Collapsible from './Collapsible';
import { GlobalContext } from '../../context/globalContext';

export default function Body(props) {
    const {cardId, content, taskName, onTaskItemDelete} = props;
    const {addTaskToCard, IsLastItem} = useContext(GlobalContext);

    const hanldeDivClick = (e) => {
      e.stopPropagation();
    }


    // TODO: Add onTab generate a new TaskItem.
    // - If (taskItemIndex === taskContent.length - 1) Generate new TaskItem
    // - Else do nothing
    const handleKeyDownTab = (e, taskItemId) => {
      console.log('handleKeyDownTab', taskItemId);
        if (e.keyCode === 9){
          // - If (taskItemIndex === taskContent.length - 1) Generate new TaskItem
          if (IsLastItem(cardId, taskItemId))
          {
            addTaskToCard(cardId); // Add new taskItem to the list
            e.preventDefault();
          }
            
        }
    }

    // TODO: Move Add task to body with + add list item
    

  return (
    // <div className='card-body' onClick={hanldeDivClick}>
    //     {content.length > 0 && content.map((task) =>
    //         <TaskItem taskObj={task} taskName={taskName} cardId={cardId} onTaskItemDelete={onTaskItemDelete}/>
    //     )}
    // </div>
    <div className="card-body" onClick={hanldeDivClick}>
      <Collapsible>
        {content.length > 0 &&
          content.map((task) => (
            <TaskItem
              taskObj={task}
              taskName={taskName}
              cardId={cardId}
              onTaskItemDelete={onTaskItemDelete}
              onTabClickTextArea={handleKeyDownTab}
            />
          ))}
        <button className='btnFooter' onClick={() => addTaskToCard(cardId)}>+ Task item</button>
      </Collapsible>
    </div>
  );
}
