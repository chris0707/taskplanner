import React, { useContext, useEffect, useRef, useState } from 'react'
import './css/header.css'
import { GlobalContext } from '../context/globalContext';

export default function InputBox() {

    const [inputName, setInputName] = useState('');
    const [inputs, setInputs] = useState([]);
    const { addToStack } = useContext(GlobalContext);
    const [isBoxClicked, setIsBoxClicked] = useState(false);
    const lastInputRef = useRef(null);

    const addNewInput = (event) => {
      // Clear the value and set it back to the placeholder
      const leftOverKeys = event.target.value;
      event.target.value = "";
      const newInput = {
        id: inputs.length + 1,
        value: leftOverKeys,
      };

      setTimeout(() => {
        const newInputRef = document.getElementById(`inp-${newInput.id}`);
        if (newInputRef) {
          newInputRef.focus();
        }

        newInputRef.selectionStart = newInputRef.selectionEnd = newInputRef.value.length;

      }, 0);

      setInputs([...inputs, newInput]);
    };
    
    const hanldeOnSave = () => {
        const newTask = {
            taskName: inputName,
            taskContent: inputs
        }
        if (inputName !== '' || inputs.length > 0)
          addToStack(newTask)
        setInputName(''); // task title
        setInputs([]);
        // setInputs([{id: 1, value:''}]);
    }

    const removeInput = (inputId) => {
        const filteredInputs = inputs.filter(inp => inp.id !== inputId);
        //console.log(filteredInputs);
        setInputs(filteredInputs);
    }

    const autoGrowTextArea = (event) => {
      const element = event.target;
      if (element){
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      }
    }

    const handleClickHeaderTaskItem = () => {
      // Focus on the last input when header-taskItem is clicked
      addNewInput();
      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }
    };

  return (
    <div className="header-componentContainer">
      {!isBoxClicked ? (
        <div
          className="header-inputContainer"
          onClick={() => setIsBoxClicked(true)}
        >
          <p className='create-task'>+ Create a task</p>
        </div>
      ) : (
        <div className="header-inputContainer">
          <div className="header-taskName">
            <input
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
              placeholder="Title"
            />
          </div>
          <div className="header-taskContent">
            {inputs.length > 0 &&
              inputs.map((inp, idx) => (
                <div className="header-inputs">
                  <button onClick={() => removeInput(inp.id)} tabIndex={-1}>
                    X
                  </button>
                  <textarea
                    key={inp.id}
                    id={`inp-${inp.id}`}
                    type="text"
                    value={inp.value}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[idx].value = e.target.value;
                      setInputs(newInputs);
                    }}
                    onKeyDown={autoGrowTextArea}
                    rows={1}
                    placeholder="add a task"
                  />
                </div>
              ))}
            <div className="header-inputs">
              <textarea
                className='header-taskItem'
                type="text"
                onClick={addNewInput}
                onChange={addNewInput}
                rows={1}
                tabIndex={0}
                placeholder="+ task item"
              />
            </div>
          </div>
          <div className="header-buttons">
            <div>{/* <button>Cancel</button> */}</div>
            <div>
              {/* <button onClick={addNewInput}>Add</button>
            <button onClick={hanldeOnSave}>Save</button> */}
              <button onClick={() => setIsBoxClicked(false)}>Close</button>
              <button onClick={hanldeOnSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
