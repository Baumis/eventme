import React from 'react'
import Text from '../contentTypes/Text/Text'
import Map from '../contentTypes/Map/Map'
import Guests from '../contentTypes/Guests/Guests'
import OptionsDropDown from './OptionsDropDown'
import './MasterComponent.css'

const MasterComponent = (props) => {
    const components = {
        Text: Text,
        Map: Map,
        Guests: Guests
    }

    const TagName = components[props.component.type || 'Text']

    return (
        <div className="Component">
            <div className="OptionsRow">
                <OptionsDropDown delete={props.deleteComponent}
                    showEditor={props.showEditor}
                    order={props.component.order} />
            </div>
            <TagName data={props.component.data} guests={props.guests} />
        </div>
    )
}
export default MasterComponent