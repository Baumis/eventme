import React from 'react'
import './ComponentAdder.css'

const ComponentAdder = ({ add }) => {

    return (
        <div className="component-adder">
            <div className="component-adder-button" onClick={() => add()}> + </div>
        </div>
    )
}
export default ComponentAdder