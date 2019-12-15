import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Vote.css'
import VoteingOptions from './VoteingOptions/VoteingOptions'
import VoteResults from './VoteResults/VoteResults'

class Vote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: null,
            showResults: false,
            loading: false
        }
    }

    componentDidMount() {
        const checked = this.getVotedOptionIndex()
        const showResults = checked === null ? false : true
        this.setState({
            showResults,
            checked
        })
    }

    getVotedOptionIndex = () => {
        if (!this.props.UserStore.currentUser) {
            return null
        }
        const userId = this.props.UserStore.currentUser._id
        for (let [index, option] of this.props.component.data.options.entries()) {
            const voted = option.votes.some(vote => vote._id === userId)
            if (voted) {
                return index
            }
        }
        return null
    }

    toggleResults = (boolean) => {
        this.setState({ showResults: boolean })
    }

    submit = async () => {
        if (this.state.checked === null || this.state.checked >= this.props.component.data.options.length) {
            alert('Select an option before submitting!')
            return
        }

        if (!this.props.UserStore.currentUser) {
            alert('Sign In to vote!')
            return
        }

        if (!this.props.isGuest()) {
            alert('Join the event before voting!')
            return
        }

        if (!this.props.EventStore.saved) {
            alert('Save changes before voting!')
            return
        }

        const optionId = this.props.component.data.options[this.state.checked]._id

        this.setState({ loading: true })

        const response = await this.props.EventStore.addVoteToVoteComponent(this.props.component._id, optionId)

        if (response) {
            this.setState({ showResults: true, loading: false })
        } else {
            this.setState({ loading: false })
            alert('Could not submit, try again.')
        }
    }

    setChecked = (optionIndex) => {
        this.setState({ checked: optionIndex })
    }

    render() {
        return (
            <div className="vote-component">
                <div className={"vote-component-subject "}>
                    {this.props.component.data.subject}
                </div>
                {this.state.showResults ?
                    <VoteResults
                        options={this.props.component.data.options}
                        toggleResults={this.toggleResults}
                        openModal={this.props.openModal}
                        closeModal={this.props.closeModal}
                    />
                    :
                    <VoteingOptions
                        options={this.props.component.data.options}
                        setChecked={this.setChecked}
                        checked={this.state.checked}
                        submit={this.submit}
                        toggleResults={this.toggleResults}
                        loading={this.state.loading}
                    />
                }
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Vote))