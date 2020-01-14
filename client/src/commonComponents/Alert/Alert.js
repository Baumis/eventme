import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Alert.css'
import DefaultButtons from '../UniversalModal/DefaultButtons/DefaultButtons'

class Alert extends Component {

    render() {
        return (
            <div className="alert-bg">
                <div className="alert">
                    <div className="alert-title">
                        {this.props.VisibilityStore.alertTitle}
                    </div>
                    <div className="alert-message">
                        {this.props.VisibilityStore.alertMessage}
                    </div>
                        <DefaultButtons 
                            positiveLabel={this.props.VisibilityStore.alertPositiveLabel}
                            negativeLabel={this.props.VisibilityStore.alertNegativeLabel}
                            positiveAction={this.props.VisibilityStore.alertPositiveAction}
                            negativeAction={this.props.VisibilityStore.alertNegativeAction}
                        />
                </div>
            </div>
        )
    }
}

export default inject('VisibilityStore')(observer(Alert))