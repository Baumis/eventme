import React from 'react'
import Text from '../contentTypes/Text/Text'
import Map from '../contentTypes/Map/Map'
import Guests from '../contentTypes/Guests/Guests'
import InviteLink from '../contentTypes/InviteLink/InviteLink'
import OptionsDropDown from './OptionsDropDown'
import './MasterComponent.css'

const MasterComponent = (props) => {
    const components = {
        Text: Text,
        Map: Map,
        Guests: Guests,
        InviteLink: InviteLink
    }

    const TagName = components[props.component.type || 'Text']

    return (
        <div className="Component">
            <div className="OptionsRow">
                <OptionsDropDown
                    delete={props.deleteComponent}
                    order={props.component.order}
                />
            </div>
            <TagName data={props.component.data} />
        </div>
    )
}
export default MasterComponent