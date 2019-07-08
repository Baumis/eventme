import React from 'react'
import './ComponentStyles.css'

const ComponentAdder = ({ add }) => {

    return (
        <div className="ComponentAdder">
            <button onClick={() => add('Text', { text: 'This is a new component' })}> + </button>
        </div>
    )
}
export default ComponentAdder