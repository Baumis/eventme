import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GeneralContainer.css'
import Discussion from './Discussion/EventDiscussion'
import About from './About/About'
import AboutEditor from './AboutEditor/AboutEditor'
import UniversalModal from '../../../../commonComponents/UniversalModal/UniversalModal'
import { FaEdit } from 'react-icons/fa'

class GeneralContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            aboutEditor: false
        }
    }

    toggleAboutEditor = () => {
        this.setState({ aboutEditor: !this.state.aboutEditor })
    }

    render() {
        return (
            <div className="general-content">
                <div>
                    <div className="general-content-columns">
                        <div>
                            <div className="general-title">
                                <div>About</div>
                                {this.props.isCreator() ?
                                    <div className="general-title-icon" onClick={() => this.toggleAboutEditor()}>
                                        <FaEdit />
                                    </div>
                                    : null}
                            </div>
                            <About
                                description={this.props.EventStore.event.description}
                            />
                        </div>
                    </div>
                    <div className="general-title">
                        Discussion
                    </div>
                    <Discussion isCreator={this.props.isCreator} />
                </div>
                {this.state.aboutEditor ?
                    <UniversalModal
                        content={<AboutEditor
                            close={this.toggleAboutEditor}
                        />}
                    />
                    : null}
            </div>
        )
    }
}

export default inject('EventStore')(observer(GeneralContainer))