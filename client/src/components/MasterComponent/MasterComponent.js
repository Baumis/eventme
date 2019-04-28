import React from 'react'
import Text from '../contentTypes/Text/Text'
import OptionsDropDown from './OptionsDropDown'
import './MasterComponent.css'

const MasterComponent = (props) => {
    const components = {
        Text: Text
    }

    const TagName = components[props.component.type || 'Text']

    return (
        <div className="Component">
            <div className="OptionsRow">
                <OptionsDropDown delete={props.deleteComponent} order={props.component.order}/>
            </div>
            <TagName data={props.component.data} />
        </div>
    )
}
export default MasterComponent