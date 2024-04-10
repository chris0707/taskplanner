import React, { useContext, useState } from 'react'
import './css/header.css'
import { GlobalContext } from '../context/globalContext';

export default function InputBox() {

    const [inputName, setInputName] = useState('');
    const [inputs, setInputs] = useState([{id: 1, value:''}]);
    const { addToStack } = useContext(GlobalContext);

    const addNewInput = (event) => {
        const newInput = {
            id: inputs.length + 1,
            value: ''
        };

        setInputs([...inputs, newInput]);
    }

    const hanldeOnSave = () => {
        const newTask = {
            taskName: inputName,
            taskContent: inputs
        }

        addToStack(newTask)
        setInputName('');
        setInputs([]);
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

  return (
    <div className="header-componentContainer">
      <div className="header-inputContainer">
        <div className="header-taskName">
          <input
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            placeholder='Title'
          />
        </div>
        <div className="header-taskContent">
          {inputs.length > 0 &&
            inputs.map((inp, idx) => (
              <div className="header-inputs">
                <button onClick={() => removeInput(inp.id)}
                  tabIndex={-1}
                >
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
                  placeholder='add a task'
                />
              </div>
            ))}
        </div>
        <div className="header-buttons">
          <div>{/* <button>Cancel</button> */}</div>
          <div>
            {/* <button onClick={addNewInput}>Add</button>
            <button onClick={hanldeOnSave}>Save</button> */}
            <button onClick={hanldeOnSave}>Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
}
