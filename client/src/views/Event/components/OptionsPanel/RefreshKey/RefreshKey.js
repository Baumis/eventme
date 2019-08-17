import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './RefreshKey.css'
import { FaSyncAlt } from 'react-icons/fa'
import Spinner from '../../../../.././commonComponents/Spinner/Spinner'

class RefreshKey extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    refreshKey = async () => {
        const confirmation = window.confirm('The current invite-link will not work after this operation. Do you still want to get a new one?')
        if (confirmation) {
            this.setState({ loading: true })
            const success = await this.props.EventStore.updateKey()
            this.setState({ loading: false })

            if (!success) {
                alert('Key could not be changed.')
            }
        }
    }

    render() {
        return (
            <div className="refresh-key" onClick={() => this.refreshKey()}>
                {this.state.loading ?
                    <Spinner />
                    :
                    <div className="refresh-key-content">
                        <p>Renew key</p>
                        <FaSyncAlt />
                    </div>
                }
            </div>
        )
    }
}
export default inject('EventStore')(observer(RefreshKey))