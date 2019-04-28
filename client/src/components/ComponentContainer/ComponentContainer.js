import React from 'react'
import './ComponentStyles.css'
import MasterComponent from '../MasterComponent/MasterComponent.js'

const ComponentContainer = (props) => {

    return (
        <div className="componentContainer">
            {props.components.map(component => (
                <MasterComponent
                    key={component.order}
                    component={component}
                    deleteComponent={props.deleteComponent}
                />
            ))}
        </div>
    )
}
export default ComponentContainer