import React, { Component } from 'react'
import '../ComponentEditor.css'


class LocationOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            longitude: '',
            latitude: ''
        }
    }

    componentDidMount() {
        if (this.props.component.type === 'LOCATION') {
            this.setState({
                title: this.props.component.data.title,
                longitude: this.props.component.data.longitude,
                latitude: this.props.component.data.latitude
            })
        }
    }

    changeTitle = async (event) => {
        await this.setState({ title: event.target.value })
        this.sendData()
    }

    changeLongitude = async (event) => {
        await this.setState({ longitude: event.target.value })
        this.sendData()
    }

    changeLatitude = async (event) => {
        await this.setState({ latitude: event.target.value })
        this.sendData()
    }

    sendData = () => {
        const data = {
            title: this.state.title,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        }
        this.props.updateData(data)
    }
    render() {
        return (
            <div className="DataSettings">
                <div className="headerRow">
                    <h4>Location</h4>
                </div>
                <div className="SettingInput">
                    <label>title</label>
                    <input value={this.state.title} onChange={this.changeTitle}></input>
                </div>
                <div className="SettingInput">
                    <label>longitude</label>
                    <input value={this.state.longitude} onChange={this.changeLongitude}></input>
                </div>
                <div className="SettingInput">
                    <label>latitude</label>
                    <input value={this.state.latitude} onChange={this.changeLatitude}></input>
                </div>
            </div>
        )
    }
}
export default LocationOptions