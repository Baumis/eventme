import React, { Component } from 'react'
import './Tabs.css'
import { FaHome, FaUsers } from 'react-icons/fa'

class Tabs extends Component {

    render() {

        const getActivityClass = (tabName) => {
            return this.props.active === tabName ? ' active-tab' : ''
        }

        return (
            <div className="tabs-row">
                <div className="tabs-container">
                    <div className={'tabs-tab' + getActivityClass('Discussion')}
                        onClick={() => this.props.changeActive('Discussion')}>
                        <div className="tabs-icon-comment"><FaHome /> </div>
                        EVENT
                    </div>
                    <div className={'tabs-tab' + getActivityClass('Guests')}
                        onClick={() => this.props.changeActive('Guests')}>
                        <div className="tabs-icon-users"><FaUsers /></div>
                        GUESTS
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs