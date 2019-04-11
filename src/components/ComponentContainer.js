import React from 'react'
import '../styles/ComponentStyles.css'
import MasterComponent from './MasterComponent'

const ComponentContainer = ({ components }) => {

    return (
        <div className="componentContainer">
            {components.map(component =>  (
                <MasterComponent key={component.order} component={component} />
            ))}
        </div>
    )
}
export default ComponentContainer