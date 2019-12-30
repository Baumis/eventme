import React, { Component } from 'react'
import './Tabs.css'
import { FaCommentAlt, FaUsers } from 'react-icons/fa'

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
                        <div className="tabs-icon-comment"><FaCommentAlt /> </div>
                        Discussion
                    </div>
                    <div className={'tabs-tab' + getActivityClass('Guests')}
                        onClick={() => this.props.changeActive('Guests')}>
                        <div className="tabs-icon-users"><FaUsers /></div>
                        Guests
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs