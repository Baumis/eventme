import React from 'react'
import '../styles/ComponentStyles.css'

const ComponentAdder = ({ add }) => {

    return (
        <div className="ComponentAdder">
            <button onClick={add}> + </button>
        </div>
    )
}
export default ComponentAdder