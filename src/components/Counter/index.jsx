/* eslint-disable react/prop-types */
import { useState } from "react";
import './counter.css'

export const Counter = ({ defaultValue, onValueChange }) => {
    const [count, setCount] = useState(defaultValue);

    const handleCount = (type) => {
        let value = count;
        if (type === 'increment') {
            value = count + 1;
        } else if(count > 0) {
            value = count - 1;
        }

        if(onValueChange) onValueChange(value);
        
        setCount(value);
    }

    return (
        <div className='action-product'>
            <button className='btn-counter' onClick={() => handleCount()}>-</button>
            <p className='count-product'>{count}</p>
            <button className='btn-counter' onClick={() => handleCount("increment")}>+</button>
        </div>
    )
};