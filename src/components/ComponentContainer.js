import React from 'react'
import '../styles/ComponentStyles.css'
import Text from '../contentTypes/Text'

const ComponentRenderer = (props) => {

    return (
        <div className="componentContainer">
            {props.components.map(component => {
                switch(component.type) {
                    case "Text":
                        return (
                            <div className="Component">
                                <Text
                                    header={component.header}
                                    content={component.content} />
                            </div>
                        )
                  }
            })}
        </div>
    )
}
export default ComponentRenderer