import React, { Component } from 'react'
import '../ComponentEditor.css'


class GuestsOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
        }
    }

    componentDidMount() {
        if (this.props.component.data.title){
            this.setState({
                title: this.props.component.data.title,
            })
        }
    }

    changeTitle = async (event) => {
        await this.setState({ title: event.target.value })
        this.sendData()
    }

    sendData = () => {
        const data = {
            title: this.state.title,
        }
        this.props.updateData(data)
    }
    render() {
        return (
            <div className="DataSettings">
                <div className="headerRow">
                    <h4>Guests</h4>
                </div>
                <div className="SettingInput">
                    <label>title</label>
                    <input value={this.state.title} onChange={this.changeTitle}></input>
                </div>
            </div>
        )
    }
}
export default GuestsOptions