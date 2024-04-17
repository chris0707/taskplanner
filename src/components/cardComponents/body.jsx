import React, { useContext, useEffect, useState } from 'react'
import TaskItem from './taskItem';
import Collapsible from './Collapsible';
import { GlobalContext } from '../../context/globalContext';

export default function Body(props) {
    const {card, onTaskItemDelete} = props;
    const {addTaskToCard, IsLastItem, IsLastPendingItem, updateCardCollapse, updateCardCollapseFinished} = useContext(GlobalContext);
    const [thisCard, setThisCard] = useState(card);
    const [thisCardCollapse, setThisCardCollapse] = useState(card.isCollapsed);
    const [thisCardCompleteCollapse, setThisCardCompleteCollapse] = useState(card.isCompletedCollapsed);

    useEffect(() => {
      setThisCard(card);
      console.log('Body - card refreshed', card)
      setThisCardCollapse(card.isCollapsed);
      setThisCardCompleteCollapse(card.isCompletedCollapsed);
    },[card]);

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
          if (IsLastPendingItem(thisCard.id, taskItemId))
          {
            const newTaskId = addTaskToCard(thisCard.id); // Add new taskItem to the list

            setTimeout(() => {
              console.log('taskname:',thisCard.taskName);
              console.log('taskId:', `${thisCard.taskName}-${newTaskId}`);

              // TODO: Change the logic instead of adding + 1, refer to the newly added
              const newInputRef = document.getElementById(`${thisCard.taskName}-${newTaskId}`);
              if (newInputRef) {
                newInputRef.focus(); // Buggy, ensure that it retrieves the latest id.
              }
      
              // newInputRef.selectionStart = newInputRef.selectionEnd = newInputRef.value.length;
      
            }, 1);

            // set auto focus
            e.preventDefault();
          }
        }
    }

    const handleCollapseToggle = (isCollapsed) => {
      console.log("isCollapsed:test", isCollapsed);
      updateCardCollapse(thisCard.id, isCollapsed);
    };

    const handleCollapseFinishedToggle = (isCollapsed) => {
      console.log("isCollapsedFinished:test", isCollapsed);
      updateCardCollapseFinished(thisCard.id, isCollapsed);
    };

  return (
    <div className="card-body" onClick={hanldeDivClick}>
      <Collapsible
        isCollapsed={thisCardCollapse}
        handleCollapseToggle={handleCollapseToggle}
        collapsibleTitle="Task list"
      >
        <div>
          {thisCard.taskContent.length > 0 &&
            thisCard.taskContent.map((task) => {
              if (!task.isChecked) {
                return (
                  <TaskItem
                    taskObj={task}
                    taskName={thisCard.taskName}
                    cardId={thisCard.id}
                    onTaskItemDelete={onTaskItemDelete}
                    onTabClickTextArea={handleKeyDownTab}
                  />
                );
              }
            })}
        </div>

        {thisCard.taskContent.some((task) => task.isChecked === true) && (
          <Collapsible
            isCollapsed={thisCardCompleteCollapse} // TODO: Update to finIsCollapsed
            handleCollapseToggle={handleCollapseFinishedToggle}
            collapsibleTitle="Completed"
          >
            <div className="completed">
              {thisCard.taskContent.length > 0 &&
                thisCard.taskContent.map((task) => {
                  if (task.isChecked) {
                    return (
                      <TaskItem
                        taskObj={task}
                        taskName={thisCard.taskName}
                        cardId={thisCard.id}
                        onTaskItemDelete={onTaskItemDelete}
                        onTabClickTextArea={handleKeyDownTab}
                      />
                    );
                  }
                })}
            </div>
          </Collapsible>
        )}
        <button className="btnFooter" onClick={() => addTaskToCard(thisCard.id)}>
          + Task item
        </button>
      </Collapsible>
    </div>
  );
}
