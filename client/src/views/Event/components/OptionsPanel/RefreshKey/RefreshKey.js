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

    refreshKey = () => {
        this.setState({ loading: true })
        const key = await this.props.EventStore.getNewKey()
        this.setState({ loading: false })

        if (!key) {
            alert('Key could not be changed.')
        }
    }

    render() {
        const Icon = this.state.icons[this.props.icon]
        return (
            <div className="refresh-key" onClick={() => this.refreshKey()}>
                {this.state.loading ?
                    <Spinner />
                    :
                    <div>
                        Get new Key
                        <FaKey />
                    </div>
                }
            </div>
        )
    }
}
export default inject('EventStore')(observer(RefreshKey))