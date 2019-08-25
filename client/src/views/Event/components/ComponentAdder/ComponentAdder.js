import React from 'react'
import './ComponentAdder.css'

const ComponentAdder = ({ add }) => {

    return (
        <div className="component-adder">
            <button onClick={() => add('Text', { text: 'This is a new component' })}> + </button>
        </div>
    )
}
export default ComponentAdder