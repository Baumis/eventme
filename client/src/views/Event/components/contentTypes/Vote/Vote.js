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
            showResults: false
        }
    }

    componentDidMount() {
        const checked = this.getVotedOption()
        const showResults = !!checked
        this.setState({
            showResults,
            checked
        })
    }

    getVotedOption = () => {
        if (!this.props.UserStore.currentUser) {
            return null
        }
        const userId = this.props.UserStore.currentUser._id
        for (let option of this.props.component.data.options) {
            const voted = option.votes.some(vote => vote === userId)
            if (voted) {
                return option._id
            }
        }

        return null
    }

    toggleResults = (boolean) => {
        this.setState({showResults: boolean})
    }

    changeSubject = (event) => {
        this.props.changeData({ ... this.props.component.data, subject: event.target.value})
    }

    changeOption = (optionId, event) => {
        this.props.component.data.options = this.props.component.data.options.map(option => ({
            ...option,
            label: option._id === optionId ? event.target.value : option.label
        }))
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

    removeOption = (optionId) => {
        this.props.component.data.options = this.props.component.data.options.filter(option => option._id !== optionId)
        this.props.changeData({ ... this.props.component.data })
    }

    submit = async () => {
        if (this.state.checked === null) {
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

        await this.props.EventStore.addVoteToVoteComponent(this.props.component._id, this.state.checked)

        this.setState({showResults: true})
    }

    setChecked = (optionId) => {
        this.setState({ checked: optionId })
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
                    />
                }
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Vote))