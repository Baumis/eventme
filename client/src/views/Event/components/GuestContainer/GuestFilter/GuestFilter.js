import React, { Component } from 'react'
import './GuestFilter.css'
import { FaChevronDown } from 'react-icons/fa'

class GuestFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showOptions: true
        }
    }

    openOptions = () => {
        this.setState({ showOptions: true }, () => {
            document.addEventListener('click', this.hideOptions)
        })
    }

    hideOptions = () => {
        this.setState({ showOptions: false }, () => {
            document.removeEventListener('click', this.hideOptions)
        })
    }

    styleFilter = (status) => {
        const color = status === 'GOING' ? 'rgba(46, 184, 46, 1)'
            : status === 'PENDING' ? 'orange'
                : status === 'DECLINED' ? 'red'
                    : 'black'
        status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        return <div style={{ color: color }}>{status}</div>
    }

    render() {
        return (
            <div className="filter-buttons-container">
                <div className="filter-buttons-picker" onClick={() => this.openOptions()}>
                    {this.styleFilter(this.props.currentFilter)}
                    <div className="filter-button-icon"><FaChevronDown /></div>
                </div>
                {this.state.showOptions ?
                    <div className="filter-button-options">
                        <div className="filter-button-options-item" onClick={() => this.props.changeFilter('ALL')}>All</div>
                        <div className="filter-button-options-item" onClick={() => this.props.changeFilter('GOING')}>Going</div>
                        <div className="filter-button-options-item" onClick={() => this.props.changeFilter('PENDING')}>Pending</div>
                        <div className="filter-button-options-item" onClick={() => this.props.changeFilter('DECLINED')}>Declined</div>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default GuestFilter