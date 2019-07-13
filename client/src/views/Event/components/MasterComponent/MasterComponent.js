import React from 'react'
import Text from '../contentTypes/Text/Text'
import Location from '../contentTypes/Location/Location'
import Guests from '../contentTypes/Guests/Guests'
import InviteLink from '../contentTypes/InviteLink/InviteLink'
import OptionsDropDown from './OptionsDropDown'
import './MasterComponent.css'

const MasterComponent = (props) => {
    const components = {
        TEXT: Text,
        LOCATION: Location,
        GUESTS: Guests,
        INVITE_LINK: InviteLink
    }

    const TagName = components[props.component.type || 'TEXT']

    return (
        <div className="Component">
            {props.creator ?
                <div className="OptionsRow">
                    <OptionsDropDown
                        order={props.component.order}
                    />
                </div>
                : null
            }
            <TagName data={props.component.data} />
        </div>
    )
}
export default MasterComponent