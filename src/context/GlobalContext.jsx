import React, { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext();

export default function GlobalContextProvider(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const saveToLocalStorageOnRefresh = (data) => {
      if (!data || JSON.stringify(data).trim() !== '[]'){ // handles refresh to avoid reset
        console.log('saveToLocalStorage', data);
        localStorage.setItem('localObjCards', JSON.stringify(data));
        console.log('loadingcards',JSON.stringify(data));
      }
      else 
        localStorage.setItem('localObjCards', JSON.stringify(data));
    };

    const loadFromLocalStorage = () => {
      const storedData = localStorage.getItem('localObjCards'); 
      console.log('stored', storedData);
      if (storedData){
        console.log('stored2', storedData);
        return JSON.parse(storedData);
      }
      return null;
    };

    useEffect(() => {
      const data = loadFromLocalStorage();
      console.log('loading data:',data);
      if (data){
        setCardStacks(data);
      }
      setIsLoading(false);
    },[])

    useEffect(() => {
      console.log('is loading?', isLoading);
      if (!isLoading){
        saveToLocalStorageOnRefresh(cardStacks);
      }
    }, [cardStacks, isLoading]);

    const addToStack = (stack) => {
      const newStack = {
        id: getNewCardId(),
        isCollapsed: false,
        isCompletedCollapsed: false,
        taskName: stack.taskName,
        taskContent: stack.taskContent
      }

      setCardStacks([...cardStacks, newStack]);
    }

    const getNewCardId = () => {
      if (cardStacks.length === 0) return 1;
      const cardIds = cardStacks.map((card) => parseInt(card.id));
      const newCardId = Math.max(...cardIds) + 1;
      return newCardId;
    };

    const getNewTaskItemId = (cardId) => {
      const taskContent = cardStacks.find((card) => card.id === cardId).taskContent;
      if (taskContent.length === 0) return 1;
      const taskIds = taskContent.map((task) => parseInt(task.id));
      const newTaskId = Math.max(...taskIds) + 1;
      return newTaskId;
    };

    const removeCardById = (cardId) => { //this needs to be optimized using id instead.
      const filteredCardStacks = cardStacks.filter((card) => card.id !== cardId);
      console.log(filteredCardStacks);
      setCardStacks(filteredCardStacks);
      //saveToLocalStorageOnDelete(filteredCardStacks);
      console.log('filtered:',filteredCardStacks);
    }

    const removeTaskById = (cardId, taskId)=> {
      setCardStacks((prevCards) => {
        return prevCards.map((prevCard) => {
            if (prevCard.id === cardId) {
              const filteredContent = prevCard.taskContent.filter((task) => task.id !== taskId);
              return { ...prevCard, taskContent: filteredContent};
            }
            return prevCard;
          })
      })
    }

    // const updateTaskItem = (cardId, taskId, newValue) => {        
    //   const currTaskItem = cardStacks.find((card) => card.id === cardId).taskContent.find((taskItem) => taskItem.id === taskId);
    //   const updatedTaskItem = {...currTaskItem, value: newValue};
    //   console.log('CardStacks:', cardStacks);
    //   console.log('updateTaskItem:',cardId, taskId, newValue);
    //   setCardStacks((prevCards) => {
    //     return prevCards.map((prevCard) => {
    //       if (prevCard.id === cardId){
    //         const updatedCard = {
    //           ...prevCard, taskContent: prevCard.taskContent.map((task) => {
    //             if (task.id === taskId){
    //               return updatedTaskItem;
    //             }
    //             return task;
    //           })
    //         }
    //         return updatedCard;           
    //       }
    //       return prevCard;
    //     })
    //   });
    // }

    const updateTaskItem = (cardId, _taskItem) => {        
      
      const currTaskItem = cardStacks.find((card) => card.id === cardId).taskContent.find((taskItem) => taskItem.id === _taskItem.id);
      const updatedTaskItem = {...currTaskItem, value: _taskItem.value, isChecked: _taskItem.isChecked};
      console.log('CardStacks:', cardStacks);
      console.log('before: ', _taskItem);
      console.log('updateTaskItem:',cardId, _taskItem.id, _taskItem.value, _taskItem.isChecked);
      setCardStacks((prevCards) => {
        return prevCards.map((prevCard) => {
          if (prevCard.id === cardId){
            const updatedCard = {
              ...prevCard, taskContent: prevCard.taskContent.map((task) => {
                if (task.id === _taskItem.id){
                  return updatedTaskItem;
                }
                return task;
              })
            }
            return updatedCard;           
          }
          return prevCard;
        })
      });
    }

    const updateCardTitle = (cardId, cardTitleValue) => {
      setCardStacks((prevCards) => {
        return prevCards.map((card) => {
          if (card.id === cardId){
            const newCard = {...card, taskName: cardTitleValue}
            return newCard;
          }
          return card;
        })
      })

      // console.log('updateCardTitle:', cardStacks);
    }

    const updateCardCollapse = (cardId, isCollapsed) => {
      setCardStacks((prevCards) => {
        return prevCards.map((card) => {
          if (card.id === cardId){
            const newCard = {...card, isCollapsed: isCollapsed}
            return newCard;
          }
          return card;
        })
      })

      // console.log('updateCardTitle:', cardStacks);
    }
    const updateCardCollapseFinished = (cardId, isCollapsed) => {
      setCardStacks((prevCards) => {
        return prevCards.map((card) => {
          if (card.id === cardId){
            const newCard = {...card, isCompletedCollapsed: isCollapsed}
            return newCard;
          }
          return card;
        })
      })

      // console.log('updateCardTitle:', cardStacks);
    }

    const addTaskToCard = (cardId) => {
      
      const newTaskId = getNewTaskItemId(cardId);

      // create new task
      const newTask = {
        id: newTaskId,
        value: "",
        isChecked: false
      }

      setCardStacks((prevCards) => {
        return prevCards.map((card) => {
          if (card.id === cardId){
            return {...card, taskContent: [...card.taskContent, newTask]}
          }
          return card;
        })
      })

      return newTaskId;
    }

    const IsLastItem = (cardId, taskItemId) => {
      const cardSelected = cardStacks.find(card => card.id === cardId);
      if (cardSelected){
        const lastTaksItem = cardSelected.taskContent[cardSelected.taskContent.length-1];
        if (lastTaksItem.id === taskItemId)
          return true;
      }
      else{
        console.log('GlobalContext: Card not found');
      }

      return false;
    }

    const IsLastPendingItem = (cardId, taskItemId) => {
      const cardSelected = cardStacks.find(card => card.id === cardId);
      if (cardSelected){
        // TODO: count pending tasks
        // if lastpendingitem matches the count of pending task then return true
        const pendingTasks = cardSelected.taskContent.filter(task => task.isChecked === false);
        const lastPendingTaskItem = pendingTasks[pendingTasks.length-1];
        if (lastPendingTaskItem.id === taskItemId)
          return true;
      }
      else{
        console.log('GlobalContext: Card not found');
      }

      return false;
    }


    // API Calls
    const [apiCards, setApiCards] = useState([]);
    const getCardsFromAPI = async () => {
        try {
          const res = await fetch('https://api.example.com/data');
          const fetchedData = await res.json();
          setApiCards(fetchedData);
          console.log(fetchedData); //Since this is async, we need to log apiCards it after it has sucecssfully set the state
        } catch(error) {
          console.error('GetCardsFromAPI Error:', error);
        }
    }

    const addAPICard = (cardData) => {
      fetch('https://api.example.com/addCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      })
      .then(res => {
        if (!res.ok){
          throw new Error('Failed to POST API card')
        }
        return res.json();
      })
      .then(data => {
        console.log('Data received from POST:',data);
      })
      .catch(error => {
        console.error('Error posting data:', error.message);
      })
    }

    const removeAPICard = (id) => {
      fetch(`https://api.example.com/removeCard/${id}`)
      .then(res => {
        if (!res.ok){
          throw new Error('Failed to GET');
        }
        return res.json();
      })
      .then(resJson => {
        console.log('Data received:', resJson);
      })
      .catch(err => {
        console.error('Error removing API card', err.message)
      });
    }

    const contextValue = {
      addToStack,
      cardStacks,
      isExpanded,
      setIsExpanded,
      removeCardById,
      updateTaskItem,
      updateCardTitle,
      updateCardCollapse,
      updateCardCollapseFinished,
      addTaskToCard,
      removeTaskById,
      IsLastItem,
      IsLastPendingItem
    }

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  )
}
