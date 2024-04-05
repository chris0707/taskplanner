import React, { useContext } from 'react'
import TaskItem from './taskItem';
import Collapsible from './Collapsible';
import { GlobalContext } from '../../context/globalContext';

export default function Body(props) {
    const {card, onTaskItemDelete} = props;
    const {addTaskToCard, IsLastItem, updateCardCollapse, updateCardCollapseFinished} = useContext(GlobalContext);

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
          if (IsLastItem(card.id, taskItemId))
          {
            addTaskToCard(card.id); // Add new taskItem to the list
            e.preventDefault();
          }
            
        }
    }

    const handleCollapseToggle = (isCollapsed) => {
      console.log("isCollapsed:test", isCollapsed);
      updateCardCollapse(card.id, isCollapsed);
    };

    const handleCollapseFinishedToggle = (isCollapsed) => {
      console.log("isCollapsedFinished:test", isCollapsed);
      updateCardCollapseFinished(card.id, isCollapsed);
    };

  return (
    // <div className='card-body' onClick={hanldeDivClick}>
    //     {content.length > 0 && content.map((task) =>
    //         <TaskItem taskObj={task} taskName={taskName} cardId={cardId} onTaskItemDelete={onTaskItemDelete}/>
    //     )}
    // </div>
    <div className="card-body" onClick={hanldeDivClick}>
      <Collapsible
        isCollapsed={card.isCollapsed}
        handleCollapseToggle={handleCollapseToggle}
      >
        <div>
          {card.taskContent.length > 0 &&
            card.taskContent.map((task) => {
              if (!task.isChecked) {
                return (
                  <TaskItem
                    taskObj={task}
                    taskName={card.taskName}
                    cardId={card.id}
                    onTaskItemDelete={onTaskItemDelete}
                    onTabClickTextArea={handleKeyDownTab}
                  />
                );
              }
            })}
        </div>

        <Collapsible
          isCollapsed={card.isCompletedCollapsed} // TODO: Update to finIsCollapsed
          handleCollapseToggle={handleCollapseFinishedToggle}
        >
          {card.taskContent.some((task) => task.isChecked === true) && (
            <div className="completed">
              {card.taskContent.length > 0 &&
                card.taskContent.map((task) => {
                  if (task.isChecked) {
                    return (
                      <TaskItem
                        taskObj={task}
                        taskName={card.taskName}
                        cardId={card.id}
                        onTaskItemDelete={onTaskItemDelete}
                        onTabClickTextArea={handleKeyDownTab}
                      />
                    );
                  }
                })}
            </div>
          )}
        </Collapsible>

        <button className="btnFooter" onClick={() => addTaskToCard(card.id)}>
          + Task item
        </button>
      </Collapsible>
    </div>
  );
}
