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
        this.setState({showResults: this.hasVoted()})
    }

    toggleResults = (boolean) => {
        this.setState({showResults: boolean})
    }

    changeSubject = (event) => {
        this.props.changeData({ ... this.props.component.data, subject: event.target.value})
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
        if (this.state.checked === null) {
            return
        }

        if (!this.props.UserStore.currentUser) {
            alert('Sign In to vote!')
            return
        }

        const optionId = this.props.component.data.options[this.state.checked]._id

        await this.props.EventStore.addVoteToVoteComponent(this.props.component._id, optionId)

        this.setState({showResults: true})
    }

    setChecked = (index) => {
        this.setState({ checked: index })
    }

    hasVoted = () => {
        const userId = this.props.UserStore.currentUser._id
        for (let option of this.props.component.data.options) {
            const hasVoted = option.votes.some(vote => vote === userId)
            if (hasVoted) {
                return true
            }
        }
        return false
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
                {this.state.showResults ?
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