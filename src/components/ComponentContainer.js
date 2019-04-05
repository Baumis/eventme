import React from 'react'
import '../styles/ComponentStyles.css'

const ComponentRenderer = (props) => {

    return (
        <div className="componentContainer">
            {props.components.map(component => {
                return (
                    <div key={component.id} className="Component">
                        <h3>{component.header}</h3>
                        <div className="content">
                            <p>{component.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}
export default ComponentRenderer