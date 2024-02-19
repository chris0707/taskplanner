import React, { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext();

export default function GlobalContextProvider(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    
    useEffect(() => {
      // Temp start - initial value of cards
      const tempTask = [
        {
          taskName: "Task1",
          taskContent: [
            {
              id: 1,
              value: "This is a testCard",
            },
            {
              id: 2,
              value: "This is a testCard",
            },
          ],
        },
        {
          taskName: "Task2",
          taskContent: [
            {
              id: 1,
              value: "This is a testCard",
            },
            {
              id: 2,
              value: "This is a testCard",
            },
            {
              id: 3,
              value: "This is a testCard",
            },
            {
              id: 4,
              value: "This is a testCard",
            },
          ],
        },
        {
          taskName: "Task3",
          taskContent: [
            {
              id: 1,
              value: "This is a testCard",
            },
            {
              id: 2,
              value: "This is a testCard",
            },
          ],
        },
        {
          taskName: "Task4",
          taskContent: [
            {
              id: 1,
              value: "This is a testCard",
            },
          ],
        },
      ];
  
      setCardStacks(tempTask);
  
      //console.log('temp:',tempTask);
      // Temp end
    },[]);

    const addToStack = (stack) => {
      const newStack = {
        taskName: stack.taskName,
        taskContent: stack.taskContent
      }

      setCardStacks([...cardStacks, newStack]);
    }

    const removeCardById = (taskName) => { //this needs to be optimized using id instead.
      const filteredCardStacks = cardStacks.filter((card) => card.taskName !== taskName);
      console.log(filteredCardStacks);
      setCardStacks(filteredCardStacks);
    }

    const contextValue = {
      addToStack,
      cardStacks,
      isExpanded,
      setIsExpanded,
      removeCardById
    }

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  )
}
