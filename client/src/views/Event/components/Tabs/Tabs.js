import React, { Component } from 'react'
import './Tabs.css'

class Tabs extends Component {

    render() {

        const getActivityClass = (tabName) => {
            return this.props.active === tabName ? ' active-tab' : ' normal-cathegory'
        }

        return (
            <div className="tabs-row">
                <div className="tabs-container">
                    <div className={'tabs-tab' + getActivityClass('Event')}
                        onClick={() => this.props.changeActive('Event')}>
                        Event
                    </div>
                    <div className={'tabs-tab' + getActivityClass('Discussion')}
                        onClick={() => this.props.changeActive('Discussion')}>
                        Discussion
                    </div>
                    <div className={'tabs-tab' + getActivityClass('Guests')}
                        onClick={() => this.props.changeActive('Guests')}>
                        Guests
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs