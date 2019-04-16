import React, { Component } from 'react'
import '../styles/Options.css'
import { FaCog } from 'react-icons/fa'

class OptionsPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            left: 0,
            background: props.background,
            label: props.label,
            slug: props.slug
        }
    }

    slidePanel = () => {
        if (this.state.display) {
            this.setState({ display: false, left: '-255px' })
        } else {
            this.setState({ display: true, left: '0px' })
        }
    }

    changeBackground = (event) => {
        this.setState({ background: event.target.value })
        this.props.changeBackground(event)
    }

    changeLabel = (event) => {
        this.setState({ label: event.target.value })
        this.props.changeLabel(event)
    }

    changeSlug = (event) => {
        this.setState({ slug: event.target.value })
        this.props.changeSlug(event)
    }

    render() {
        return (
            <div style={{ left: this.state.left }} className="OptionsContainer">
                <div className="OptionsHeader">
                    <p>Options</p>
                    <button onClick={this.slidePanel}><FaCog /></button>
                </div>
                <div className="OptionsContent">
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Slug</label>
                        </div>
                        <input value={this.state.slug} onChange={this.changeSlug}></input>
                    </div>
                </div>
                <div className="OptionsContent">
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Header</label>
                        </div>
                        <input value={this.state.label} onChange={this.changeLabel}></input>
                    </div>
                </div>
                <div className="OptionsContent">
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Header background</label>
                        </div>
                        <input value={this.state.background} onChange={this.changeBackground}></input>
                    </div>
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Theme</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OptionsPanel