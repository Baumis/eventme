import React, { Component } from 'react'
import '../ComponentEditor.css'


class TextOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        if (this.props.component.type === 'TEXT') {
            this.setState({
                title: this.props.component.data.title,
                content: this.props.component.data.content
            })
        }
    }

    changeTitle = async (event) => {
        await this.setState({ title: event.target.value })
        this.sendData()
    }

    changeContent = async (event) => {
        await this.setState({ content: event.target.value })
        this.sendData()
    }

    sendData = () => {
        const data = {
            title: this.state.title,
            content: this.state.content
        }
        this.props.updateData(data)
    }

    render() {
        return (
            <div className="DataSettings" >
                <div className="headerRow">
                    <h4>Text</h4>
                </div>
                <div className="SettingInput">
                    <label>Title</label>
                    <input value={this.state.title} onChange={this.changeTitle}></input>
                </div>
                <div className="SettingInput">
                    <label>Content</label>
                    <textarea value={this.state.content} rows={6} onChange={this.changeContent}></textarea>
                </div>
            </div>
        )
    }
}

export default TextOptions