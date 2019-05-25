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
                    showEditor={props.showEditor}
                    guests={props.guests}
                />
            ))}
        </div>
    )
}
export default ComponentContainer