import React, { createContext, useState } from 'react'

export const GlobalContext = createContext();

export default function GlobalContextProvider(props) {
    const [cardStacks, setCardStacks] = useState([]);
    

    const addToStack = (stack) => {
      const newStack = {
        taskName: stack.taskName,
        taskContent: stack.taskContent
      }

      setCardStacks([...cardStacks, newStack]);
    }

    const contextValue = {
      addToStack,
      cardStacks
    }

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  )
}
