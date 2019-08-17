import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './RefreshKey.css'
import { FaKey } from 'react-icons/fa'
import Spinner from '../../../../.././commonComponents/Spinner/Spinner'

class RefreshKey extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    refreshKey = async () => {
        this.setState({ loading: true })
        const key = await this.props.EventStore.updateKey()
        this.setState({ loading: false })

        if (!key) {
            alert('Key could not be changed.')
        }
    }

    render() {
        return (
            <div className="refresh-key" onClick={() => this.refreshKey()}>
                {this.state.loading ?
                    <Spinner />
                    :
                    <div>
                        <p>Get new Key</p>
                        <FaKey />
                    </div>
                }
            </div>
        )
    }
}
export default inject('EventStore')(observer(RefreshKey))