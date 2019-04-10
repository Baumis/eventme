import React from 'react'
import '../styles/ComponentStyles.css'
import Text from '../contentTypes/Text'

const ComponentContainer = ({ components }) => {

    return (
        <div className="componentContainer">
            {components.map(component => {
                console.log(component)
                if (component.type === 'Text')
                    return <Text key={component.order} data={component.data} />
                else
                    return null
            })}
        </div>
    )
}
export default ComponentContainer