import React, { useContext, useState } from 'react'
import './css/header.css'
import { GlobalContext } from '../context/globalContext';

export default function InputBox() {

    const [inputName, setInputName] = useState('');
    const [inputs, setInputs] = useState([{id: 1, value:''}]);
    const { addToStack } = useContext(GlobalContext);

    const addNewInput = () => {
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
    }

  return (
    <div className='header-inputContainer'>
        <div className='header-taskName'>
            <input onChange={(e) => {
                setInputName(e.target.value);
            }}/>
        </div>
        <div className='header-taskContent'>
            {inputs.length > 0 && (
                inputs.map((inp,idx) => (
                    <input
                        key={inp.id}
                        id={`inp-${inp.id}`}
                        type="text"
                        value={inp.value}
                        onChange={(e) => {
                            const newInputs = [...inputs];
                            newInputs[idx].value = e.target.value;
                            setInputs(newInputs);
                        }}
                    />
                ))
            )}
        </div>
        <div className='header-buttons'>
            <div>
                <button>Cancel</button>
            </div>
            <div>
                <button onClick={addNewInput}>Add</button>
                <button onClick={hanldeOnSave}>Save</button>
            </div>
        </div>
    </div>
  )
}
