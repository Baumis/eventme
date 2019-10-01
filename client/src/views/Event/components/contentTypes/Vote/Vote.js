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
            checked: null
        }
    }

    changeSubject = (event) => {
        const dataObject = {
            subject: event.target.value,
            options: this.props.data.options,
        }
        this.props.changeData(dataObject)
    }

    changeOption = (optionIndex, event) => {
        const editedOptions = this.props.data.options
        editedOptions[optionIndex].content = event.target.value

        const dataObject = {
            subject: this.props.data.subject,
            options: editedOptions,
        }
        this.props.changeData(dataObject)
    }

    newOptions = () => {
        const editedOptions = this.props.data.options
        editedOptions.push({ content: 'new option', votes: [] })

        const dataObject = {
            subject: this.props.data.subject,
            options: this.props.data.options,
        }
        this.props.changeData(dataObject)
    }

    submit = () => {
        const editedOptions = this.props.data.options
        editedOptions[this.state.checked].votes.push(this.props.UserStore.currentUser._id)

        const dataObject = {
            subject: this.props.data.subject,
            options: editedOptions,
        }
        this.props.changeData(dataObject)
    }

    setChecked = (index) => {
        this.setState({ checked: index })
    }

    hasVoted = () => {
        let voted = false
        const userId = this.props.UserStore.currentUser._id
        this.props.data.options.forEach(options => {
            if (options.votes.find(vote => vote === userId)) {
                voted = true
            }
        })
        return voted
    }

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        const hasVoted = this.hasVoted()
        console.log(hasVoted)
        return (
            <div className="vote-component">
                <div className={"vote-component-subject " + borderStyle}>
                    <EditableWrapper
                        html={this.props.data.subject}
                        editable={!this.props.edit}
                        onChange={this.changeSubject}
                    />
                </div>
                {hasVoted ?
                    <VoteResults
                        options={this.props.data.options}
                    />
                    :
                    <VoteOptions
                        edit={this.props.edit}
                        options={this.props.data.options}
                        setChecked={this.setChecked}
                        checked={this.state.checked}
                        newOptions={this.newOptions}
                        submit={this.submit}
                        changeOption={this.changeOption}
                    />
                }
            </div>
        )
    }
}

export default inject('UserStore')(observer(Vote))