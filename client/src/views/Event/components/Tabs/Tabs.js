import React, { Component } from 'react'
import './Tabs.css'

class Tabs extends Component {

    render() {

        return (
            <div className="tabs-row">
                <div className="tabs-container">
                    <div className="tabs-tab"
                        id={this.props.active === 'Event' ?  'active-tab' : 'normal-cathegory'}
                        onClick={() => this.props.changeActive('Event')}>
                        Event
                    </div>
                    <div className="tabs-tab"
                        id={this.props.active === 'Discussion' ? 'active-tab' : 'normal-cathegory'}
                        onClick={() => this.props.changeActive('Discussion')}>
                        Discussion
                    </div>
                    <div className="tabs-tab"
                        id={this.props.active === 'Guests' ? 'active-tab' : 'normal-cathegory'}
                        onClick={() => this.props.changeActive('Guests')}>
                        Guests
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs