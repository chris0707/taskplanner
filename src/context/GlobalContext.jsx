import React, { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext();

export default function GlobalContextProvider(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //   // Temp start - initial value of cards
    //   const tempTask = [
    //     {
    //       taskName: "Task1",
    //       taskContent: [
    //         {
    //           id: 1,
    //           value: "This is a testCard",
    //         },
    //         {
    //           id: 2,
    //           value: "This is a testCard",
    //         },
    //       ],
    //     },
    //     {
    //       taskName: "Task2",
    //       taskContent: [
    //         {
    //           id: 1,
    //           value: "This is a testCard",
    //         },
    //         {
    //           id: 2,
    //           value: "This is a testCard",
    //         },
    //         {
    //           id: 3,
    //           value: "This is a testCard",
    //         },
    //         {
    //           id: 4,
    //           value: "This is a testCard",
    //         },
    //       ],
    //     },
    //     {
    //       taskName: "Task3",
    //       taskContent: [
    //         {
    //           id: 1,
    //           value: "This is a testCard",
    //         },
    //         {
    //           id: 2,
    //           value: "This is a testCard",
    //         },
    //       ],
    //     },
    //     {
    //       taskName: "Task4",
    //       taskContent: [
    //         {
    //           id: 1,
    //           value: "This is a testCard",
    //         },
    //       ],
    //     },
    //   ];
  
    //   setCardStacks(tempTask);
  
    //   //console.log('temp:',tempTask);
    //   // Temp end
    // },[]);

    
    const saveToLocalStorageOnRefresh = (data) => {
      if (!data || JSON.stringify(data).trim() !== '[]'){ // handles refresh to avoid reset
        console.log('saveToLocalStorage', data);
        localStorage.setItem('localObjCards', JSON.stringify(data));
        console.log('loadingcards',JSON.stringify(data));
      }
      else 
        localStorage.setItem('localObjCards', JSON.stringify(data));
    };

    // const saveToLocalStorageOnDelete = (data) => {
    //   //if (!data || JSON.stringify(data).trim() !== ''){ // handles refresh to avoid reset
    //     console.log('saveToLocalStorageDelete', data);
    //     localStorage.setItem('localObjCards', JSON.stringify(data));
    //     console.log('loadingcards',JSON.stringify(data));
    //   //}
    // };

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
        taskName: stack.taskName,
        taskContent: stack.taskContent
      }

      setCardStacks([...cardStacks, newStack]);
    }

    const removeCardById = (taskName) => { //this needs to be optimized using id instead.
      const filteredCardStacks = cardStacks.filter((card) => card.taskName !== taskName);
      console.log(filteredCardStacks);
      setCardStacks(filteredCardStacks);
      //saveToLocalStorageOnDelete(filteredCardStacks);
      console.log('filtered:',filteredCardStacks);
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
      removeCardById
    }

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  )
}
