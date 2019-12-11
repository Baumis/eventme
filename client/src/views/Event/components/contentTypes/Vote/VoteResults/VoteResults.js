import React, { Component } from 'react'
import './VoteResults.css'
import UniversalModal from '../../../../../../commonComponents/UniversalModal/UniversalModal'
import VoteUsers from '../VoteUsers/VoteUsers'

class VoteResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showVoters: false,
            displayedOption: this.props.options[0]
        }
    }

    showVoters = (option) => {
        this.setState({
            showVoters: true,
            displayedOption: option
        })
    }

    hideVoters = () => {
        this.setState({ showVoters: false })
    }

    votePercentage = (id) => {
        let allVotes = 0
        for (let option of this.props.options) {
            allVotes += option.votes.length
        }
        const targetVoteCount = this.voteCount(id)
        return (targetVoteCount / allVotes) * 100
    }

    voteCount = (optionId) => {
        const option = this.props.options.find(option => option._id === optionId)
        return option.votes.length
    }

    render() {
        return (
            <div className="vote-component-results">
                {this.state.showVoters ?
                    <UniversalModal
                        content={<VoteUsers
                            option={this.state.displayedOption}
                            close={this.hideVoters}
                        />}
                    />
                    : null}
                {this.props.options.map((option, i) =>
                    <div key={i} className="vote-component-option-container">
                        <div className="vote-component-title-row">
                            <div className={"vote-component-title"}>
                                <div>{option.label}</div>
                                <div className="vote-component-vote-count" onClick={() => this.showVoters(option)}>
                                    {option.votes.length + ' votes'}
                                </div>
                            </div>
                        </div>
                        <div className="vote-component-status-bar">
                            <div style={{ width: this.votePercentage(option._id) + '%' }} className="vote-component-status-filler" />
                        </div>
                    </div>
                )}
                <div className="vote-component-button-row">
                    <div className="vote-component-back-button" onClick={() => this.props.toggleResults(false)}>
                        {'Vote'}
                    </div>
                </div>
            </div>
        )
    }
}

export default VoteResults 