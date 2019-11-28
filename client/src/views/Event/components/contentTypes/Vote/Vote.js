import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Vote.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'
import VoteOptions from './VoteOptions/VoteOptions'
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

    changeSubject = (event) => {
        this.props.changeData({ ... this.props.component.data, subject: event.target.value })
    }

    changeOption = (optionIndex, event) => {
        this.props.component.data.options[optionIndex].label = event.target.value
        this.props.changeData({ ... this.props.component.data })
    }

    newOptions = () => {
        const option = {
            label: 'new option',
            votes: []
        }
        this.props.component.data.options.push(option)
        this.props.changeData({ ... this.props.component.data })
    }

    removeOption = (optionIndex) => {
        this.props.component.data.options.splice(optionIndex, 1)
        this.props.changeData({ ... this.props.component.data })
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
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        return (
            <div className="vote-component">
                <div className={"vote-component-subject " + borderStyle}>
                    <EditableWrapper
                        html={this.props.component.data.subject}
                        editable={!this.props.edit}
                        onChange={this.changeSubject}
                    />
                </div>
                {this.state.showResults && !this.props.edit ?
                    <VoteResults
                        options={this.props.component.data.options}
                        toggleResults={this.toggleResults}
                    />
                    :
                    <VoteOptions
                        edit={this.props.edit}
                        options={this.props.component.data.options}
                        setChecked={this.setChecked}
                        checked={this.state.checked}
                        newOptions={this.newOptions}
                        submit={this.submit}
                        changeOption={this.changeOption}
                        removeOption={this.removeOption}
                        toggleResults={this.toggleResults}
                        loading={this.state.loading}
                    />
                }
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Vote))