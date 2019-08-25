import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Text from '../contentTypes/Text/Text'
import Location from '../contentTypes/Location/Location'
import Guests from '../contentTypes/Guests/Guests'
import InviteLink from '../contentTypes/InviteLink/InviteLink'
import OptionsDropDown from './OptionsDropDown'
import './MasterComponent.css'

class MasterComponent extends Component {

    render() {
        const components = {
            TEXT: Text,
            LOCATION: Location,
            GUESTS: Guests,
            INVITE_LINK: InviteLink
        }
        const TagName = components[this.props.component.type || 'TEXT']
        return (
            <div className="master-component">
                {this.props.isCreator() ?
                    <div className="master-options-row">
                        <OptionsDropDown
                            order={this.props.component.order}
                        />
                    </div>
                    : null
                }
                <TagName data={this.props.component.data} />
            </div>
        )
    }
}
export default inject('VisibilityStore')(observer(MasterComponent))