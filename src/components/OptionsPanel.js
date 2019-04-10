import React, { Component } from 'react'
import '../styles/Options.css'
import { FaCog } from 'react-icons/fa';

class OptionsPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            left: 0,
            background: props.headerData.url
        }
    }

    slidePanel = () => {
        if (this.state.display) {
            this.setState({ display: false, left: '-255px' })
        } else {
            this.setState({ display: true, left: '0px' })
        }
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
                        <input></input>
                    </div>
                </div>
                <div className="OptionsContent">
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Header background</label>
                        </div>
                        <input value={this.state.background}></input>
                    </div>
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Color</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OptionsPanel