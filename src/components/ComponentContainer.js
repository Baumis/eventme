import React from 'react'
import '../styles/ComponentStyles.css'

const ComponentContainer = ({ components }) => {

    return (
        <div className='componentContainer'>
            {components.map(component => {
                return (
                    <div key={component.order} className='Component'>
                        <h3>{component.type}</h3>
                        <div className='content'>
                            <p>{component.data.text}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}
export default ComponentContainer